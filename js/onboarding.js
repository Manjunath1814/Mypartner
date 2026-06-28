import { auth, db, storage } from "../firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

let currentUser = null;

let selectedLookingFor = "";
let selectedGender = "";
let profilePhotoURL = "";

const fullName = document.getElementById("fullName");
const dob = document.getElementById("dob");
const age = document.getElementById("age");
const district = document.getElementById("district");
const education = document.getElementById("education");
const occupation = document.getElementById("occupation");
const income = document.getElementById("income");
const familyIncome = document.getElementById("familyIncome");

const uploadBox = document.getElementById("uploadBox");
const profilePhoto = document.getElementById("profilePhoto");
const previewImage = document.getElementById("previewImage");

const continueBtn = document.getElementById("continueBtn");

const loadingOverlay = document.getElementById("loadingOverlay");
const toast = document.getElementById("toast");

const progressFill = document.getElementById("progressFill");

progressFill.style.width = "100%";

onAuthStateChanged(auth, async (user)=>{

    if(!user){

        window.location.href="../login.html";
        return;

    }

    currentUser=user;

    await loadExistingData();

});

document.querySelectorAll("[data-looking]").forEach(btn=>{

    btn.addEventListener("click",()=>{

        document.querySelectorAll("[data-looking]").forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

        selectedLookingFor=btn.dataset.looking;

    });

});

document.querySelectorAll("[data-gender]").forEach(btn=>{

    btn.addEventListener("click",()=>{

        document.querySelectorAll("[data-gender]").forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

        selectedGender=btn.dataset.gender;

    });

});

dob.addEventListener("change",()=>{

    if(!dob.value){

        age.value="";
        return;

    }

    const birth=new Date(dob.value);

    const today=new Date();

    let years=today.getFullYear()-birth.getFullYear();

    const month=today.getMonth()-birth.getMonth();

    if(month<0 || (month===0 && today.getDate()<birth.getDate())){

        years--;

    }

    age.value=years;

});

uploadBox.addEventListener("click",()=>{

    profilePhoto.click();

});

profilePhoto.addEventListener("change",()=>{

    const file=profilePhoto.files[0];

    if(!file) return;

    const reader=new FileReader();

    reader.onload=(e)=>{

        previewImage.src=e.target.result;

        previewImage.style.display="block";

        uploadBox.querySelector(".upload-text").style.display="none";

    };

    reader.readAsDataURL(file);

});

function showToast(message){

    toast.textContent=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}

function showLoading(){

    loadingOverlay.classList.add("show");

}

function hideLoading(){

    loadingOverlay.classList.remove("show");

}
async function uploadProfilePhoto() {

    if (!profilePhoto.files.length) {

        return profilePhotoURL;

    }

    const file = profilePhoto.files[0];

    const storageRef = ref(
        storage,
        `profilePhotos/${currentUser.uid}/${Date.now()}_${file.name}`
    );

    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);

    profilePhotoURL = url;

    return url;

}



function validateForm() {

    if (fullName.value.trim() === "") {

        showToast("Enter your full name");

        fullName.focus();

        return false;

    }

    if (!selectedLookingFor) {

        showToast("Select whom you are looking for");

        return false;

    }

    if (!selectedGender) {

        showToast("Select your gender");

        return false;

    }

    if (!dob.value) {

        showToast("Select your date of birth");

        return false;

    }

    if (!district.value) {

        showToast("Select your district");

        district.focus();

        return false;

    }

    if (!education.value) {

        showToast("Select education");

        education.focus();

        return false;

    }

    if (occupation.value.trim() === "") {

        showToast("Enter occupation");

        occupation.focus();

        return false;

    }

    if (!income.value) {

        showToast("Select annual income");

        income.focus();

        return false;

    }

    if (!familyIncome.value) {

        showToast("Select family annual income");

        familyIncome.focus();

        return false;

    }

    return true;

}



continueBtn.addEventListener("click", async () => {

    if (!validateForm()) return;

    try {

        showLoading();

        await uploadProfilePhoto();

        await setDoc(

            doc(db, "users", currentUser.uid),

            {

                fullName: fullName.value.trim(),

                lookingFor: selectedLookingFor,

                gender: selectedGender,

                dob: dob.value,

                age: Number(age.value),

                district: district.value,

                education: education.value,

                occupation: occupation.value.trim(),

                annualIncome: income.value,

                familyAnnualIncome: familyIncome.value,

                profilePhoto: profilePhotoURL,

                onboardingComplete: true,

                updatedAt: serverTimestamp()

            },

            {

                merge: true

            }

        );

        hideLoading();

        showToast("Profile Created Successfully");

        setTimeout(() => {

            window.location.href = "../dashboard/home.html";

        }, 1200);

    }

    catch (error) {

        console.error(error);

        hideLoading();

        showToast("Something went wrong");

    }

});
async function loadExistingData() {

    try {

        const docRef = doc(db, "users", currentUser.uid);

        const snap = await getDoc(docRef);

        if (!snap.exists()) return;

        const data = snap.data();

        if (data.fullName) {

            fullName.value = data.fullName;

        }

        if (data.dob) {

            dob.value = data.dob;

            const birth = new Date(data.dob);
            const today = new Date();

            let years = today.getFullYear() - birth.getFullYear();

            const month = today.getMonth() - birth.getMonth();

            if (
                month < 0 ||
                (month === 0 && today.getDate() < birth.getDate())
            ) {

                years--;

            }

            age.value = years;

        }

        if (data.district) {

            district.value = data.district;

        }

        if (data.education) {

            education.value = data.education;

        }

        if (data.occupation) {

            occupation.value = data.occupation;

        }

        if (data.annualIncome) {

            income.value = data.annualIncome;

        }

        if (data.familyAnnualIncome) {

            familyIncome.value = data.familyAnnualIncome;

        }

        if (data.lookingFor) {

            selectedLookingFor = data.lookingFor;

            document
                .querySelectorAll("[data-looking]")
                .forEach(btn => {

                    if (btn.dataset.looking === data.lookingFor) {

                        btn.classList.add("active");

                    }

                });

        }

        if (data.gender) {

            selectedGender = data.gender;

            document
                .querySelectorAll("[data-gender]")
                .forEach(btn => {

                    if (btn.dataset.gender === data.gender) {

                        btn.classList.add("active");

                    }

                });

        }

        if (data.profilePhoto) {

            profilePhotoURL = data.profilePhoto;

            previewImage.src = data.profilePhoto;

            previewImage.style.display = "block";

            const text = uploadBox.querySelector(".upload-text");

            if (text) {

                text.style.display = "none";

            }

        }

    }

    catch (error) {

        console.error("Error loading user profile:", error);

    }

}

window.addEventListener("beforeunload", () => {

    console.log("Vivaha Onboarding Closed");

});

console.log("Vivaha Onboarding Loaded Successfully");
