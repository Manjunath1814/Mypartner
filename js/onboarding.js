// ======================================================
// Vivaha Premium Onboarding
// onboarding.js
// Part 1
// Imports • Firebase • DOM • Step Navigation
// ======================================================

import { auth, db, storage } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import {
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ======================================================
// DOM
// ======================================================

const steps = document.querySelectorAll(".step");

const nextButtons = document.querySelectorAll(".next-btn");

const prevButtons = document.querySelectorAll(".prev-btn");

const progressFill = document.getElementById("progressFill");

const progressText = document.getElementById("progressText");

const finishBtn = document.getElementById("finishBtn");

const uploadBtn = document.getElementById("uploadBtn");

const profilePhotoInput = document.getElementById("profilePhoto");

const previewImage = document.getElementById("previewImage");

const skipPhoto = document.getElementById("skipPhoto");


// ======================================================
// Variables
// ======================================================

let currentStep = 1;

const TOTAL_STEPS = 6;

let currentUser = null;

let uploadedPhotoURL = "";


// ======================================================
// User Data Object
// ======================================================

let userData = {

    name: "",

    gender: "",

    dob: "",

    lookingFor: "",

    country: "",

    state: "",

    district: "",

    motherTongue: "",

    education: "",

    occupation: "",

    income: "",

    profilePhoto: "",

    onboardingComplete: false

};


// ======================================================
// Auth Check
// ======================================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;

    }

    currentUser = user;

    await loadExistingData();

    updateProgress();

});


// ======================================================
// Show Step
// ======================================================

function showStep(step) {

    steps.forEach(stepElement => {
        stepElement.classList.remove("active");
    });

    const activeStep = document.querySelector(`.step[data-step="${step}"]`);

    if (activeStep) {
        activeStep.classList.add("active");
    }

    currentStep = step;

    updateProgress();

}


// ======================================================
// Next
// ======================================================

function nextStep() {

    if (currentStep >= TOTAL_STEPS) return;

    currentStep++;

    showStep(currentStep);

}


// ======================================================
// Previous
// ======================================================

function previousStep() {

    if (currentStep <= 1) return;

    currentStep--;

    showStep(currentStep);

}


// ======================================================
// Progress
// ======================================================

function updateProgress() {

    const percent =

        (currentStep / TOTAL_STEPS) * 100;

    progressFill.style.width = `${percent}%`;

    progressText.innerText =
        `Step ${currentStep} of ${TOTAL_STEPS}`;

}


// ======================================================
// Navigation Events
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    nextButtons.forEach(button => {

        button.addEventListener("click", async () => {

            const valid = validateCurrentStep();

            if (!valid) return;

            collectStepData();

            await saveStep();

            nextStep();

        });

    });

    prevButtons.forEach(button => {

        button.addEventListener("click", previousStep);

    });

});


// ======================================================
// Upload Button
// ======================================================

uploadBtn?.addEventListener("click", () => {

    profilePhotoInput.click();

});


// ======================================================
// Preview Image
// ======================================================

profilePhotoInput?.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        previewImage.src = e.target.result;

    };

    reader.readAsDataURL(file);

});


// ======================================================
// Skip Photo
// ======================================================

skipPhoto?.addEventListener("click", () => {

    nextStep();

});


// ======================================================
// Finish
// ======================================================

finishBtn?.addEventListener("click", async () => {

    await finishOnboarding();

});

// ======================================================
// Vivaha Premium Onboarding
// onboarding.js
// Part 2A
// Validation • Collect Data • Auto Fill
// ======================================================


// ======================================================
// Validate Current Step
// ======================================================

function validateCurrentStep() {

    clearErrors();

    switch (currentStep) {

        // --------------------------------------------
        // Step 1
        // --------------------------------------------

        case 1:
            return true;

        // --------------------------------------------
        // Step 2
        // --------------------------------------------

        case 2:

            if (!validateRequired("fullName")) return false;

            if (!validateRequired("gender")) return false;

            if (!validateRequired("dob")) return false;

            if (!validateRequired("lookingFor")) return false;

            return true;

        // --------------------------------------------
        // Step 3
        // --------------------------------------------

        case 3:

            if (!validateRequired("country")) return false;

            if (!validateRequired("state")) return false;

            if (!validateRequired("district")) return false;

            if (!validateRequired("motherTongue")) return false;

            return true;

        // --------------------------------------------
        // Step 4
        // --------------------------------------------

        case 4:

            if (!validateRequired("education")) return false;

            if (!validateRequired("occupation")) return false;

            if (!validateRequired("income")) return false;

            return true;

        // --------------------------------------------
        // Step 5
        // --------------------------------------------

        case 5:

            return true;

        // --------------------------------------------

        default:

            return true;

    }

}



// ======================================================
// Required Validation
// ======================================================

function validateRequired(id) {

    const input = document.getElementById(id);

    if (!input) return true;

    if (input.value.trim() === "") {

        input.classList.add("error");

        input.focus();

        return false;

    }

    input.classList.remove("error");

    return true;

}



// ======================================================
// Clear Errors
// ======================================================

function clearErrors() {

    document
        .querySelectorAll(".error")
        .forEach(element => {

            element.classList.remove("error");

        });

}



// ======================================================
// Collect Current Form Values
// ======================================================

function collectStepData() {

    const getValue = (id) => {

        const element = document.getElementById(id);

        return element ? element.value.trim() : "";

    };

    userData.name = getValue("fullName");

    userData.gender = getValue("gender");

    userData.dob = getValue("dob");

    userData.lookingFor = getValue("lookingFor");

    userData.country = getValue("country");

    userData.state = getValue("state");

    userData.district = getValue("district");

    userData.motherTongue = getValue("motherTongue");

    userData.education = getValue("education");

    userData.occupation = getValue("occupation");

    userData.income = getValue("income");

}



// ======================================================
// Auto Fill Form
// ======================================================

function fillForm() {

    setValue("fullName", userData.name);

    setValue("gender", userData.gender);

    setValue("dob", userData.dob);

    setValue("lookingFor", userData.lookingFor);

    setValue("country", userData.country);

    setValue("state", userData.state);

    setValue("district", userData.district);

    setValue("motherTongue", userData.motherTongue);

    setValue("education", userData.education);

    setValue("occupation", userData.occupation);

    setValue("income", userData.income);

    if (
        userData.profilePhoto &&
        previewImage
    ) {

        previewImage.src = userData.profilePhoto;

    }

}



// ======================================================
// Helper
// ======================================================

function setValue(id, value) {

    const element = document.getElementById(id);

    if (!element) return;

    element.value = value || "";

}



// ======================================================
// Resume Last Step
// ======================================================

function detectLastCompletedStep() {

    if (!userData.name) {

        showStep(1);

        return;

    }

    if (!userData.country) {

        showStep(2);

        return;

    }

    if (!userData.education) {

        showStep(3);

        return;

    }

    if (
        !userData.profilePhoto &&
        !uploadedPhotoURL
    ) {

        showStep(5);

        return;

    }

    if (userData.onboardingComplete) {

        window.location.href =
            "dashboard/home.html";

        return;

    }

    showStep(6);

}



// ======================================================
// Live Auto Save
// ======================================================

const autoSaveFields = [

    "fullName",

    "gender",

    "dob",

    "lookingFor",

    "country",

    "state",

    "district",

    "motherTongue",

    "education",

    "occupation",

    "income"

];

autoSaveFields.forEach((id) => {

    const input = document.getElementById(id);

    if (!input) return;

    input.addEventListener("change", async () => {

        collectStepData();

        await saveStep();

    });

});
// ======================================================
// Vivaha Premium Onboarding
// onboarding.js
// Part 2B
// Firestore Save • Resume Onboarding
// ======================================================


// ======================================================
// Save Current Step To Firestore
// ======================================================

async function saveStep() {

    try {

        if (!currentUser) return;

        await setDoc(

            doc(db, "users", currentUser.uid),

            {

                name: userData.name,

                gender: userData.gender,

                dob: userData.dob,

                lookingFor: userData.lookingFor,

                country: userData.country,

                state: userData.state,

                district: userData.district,

                motherTongue: userData.motherTongue,

                education: userData.education,

                occupation: userData.occupation,

                income: userData.income,

                profilePhoto: userData.profilePhoto,

                onboardingComplete: userData.onboardingComplete,

                lastStep: currentStep,

                updatedAt: new Date()

            },

            {

                merge: true

            }

        );

        console.log("Step saved.");

    }

    catch (error) {

        console.error("Firestore Save Error:", error);

    }

}



// ======================================================
// Load Existing User Data
// ======================================================

async function loadExistingData() {

    try {

        if (!currentUser) return;

        const userRef = doc(db, "users", currentUser.uid);

        const snapshot = await getDoc(userRef);

        if (!snapshot.exists()) {

            showStep(1);

            return;

        }

        const data = snapshot.data();

        // -----------------------------------------

        userData = {

            ...userData,

            ...data

        };

        if (data.profilePhoto) {

            uploadedPhotoURL = data.profilePhoto;

        }

        fillForm();

        // -----------------------------------------
        // Resume Previous Step
        // -----------------------------------------

        if (data.onboardingComplete) {

            window.location.href = "dashboard/home.html";

            return;

        }

        if (data.lastStep) {

            showStep(data.lastStep);

        }

        else {

            detectLastCompletedStep();

        }

    }

    catch (error) {

        console.error("Load User Error:", error);

        showStep(1);

    }

}



// ======================================================
// Manual Save Shortcut
// ======================================================

window.addEventListener("beforeunload", async () => {

    collectStepData();

    await saveStep();

});



// ======================================================
// Optional Auto Save Every 20 Seconds
// ======================================================

setInterval(async () => {

    if (!currentUser) return;

    collectStepData();

    await saveStep();

}, 20000);



// ======================================================
// Network Status (Optional)
// ======================================================

window.addEventListener("offline", () => {

    console.warn("You are offline.");

});

window.addEventListener("online", async () => {

    console.log("Back online. Syncing...");

    collectStepData();

    await saveStep();

});



// ======================================================
// Debug (Remove in Production)
// ======================================================

console.log("Vivaha Onboarding Part 2B Loaded");
// ======================================================
// Vivaha Premium Onboarding
// onboarding.js
// Part 3
// Firebase Storage • Finish • Dashboard Redirect
// ======================================================


// ======================================================
// Upload Profile Photo
// ======================================================

profilePhotoInput?.addEventListener("change", async (event) => {

    const file = event.target.files[0];

    if (!file) return;

    try {

        // Preview

        const reader = new FileReader();

        reader.onload = (e) => {

            previewImage.src = e.target.result;

        };

        reader.readAsDataURL(file);

        // Upload

        const storageRef = ref(

            storage,

            `profilePhotos/${currentUser.uid}/${Date.now()}_${file.name}`

        );

        await uploadBytes(storageRef, file);

        uploadedPhotoURL = await getDownloadURL(storageRef);

        userData.profilePhoto = uploadedPhotoURL;

        await saveStep();

        console.log("Photo uploaded successfully.");

    }

    catch (error) {

        console.error("Photo Upload Error:", error);

        alert("Unable to upload profile photo. Please try again.");

    }

});



// ======================================================
// Finish Onboarding
// ======================================================

async function finishOnboarding() {

    try {

        collectStepData();

        if (uploadedPhotoURL) {

            userData.profilePhoto = uploadedPhotoURL;

        }

        userData.onboardingComplete = true;

        await saveStep();

        finishBtn.disabled = true;

        finishBtn.innerHTML = "Redirecting...";

        setTimeout(() => {

            window.location.href = "dashboard/home.html";

        }, 700);

    }

    catch (error) {

        console.error(error);

        finishBtn.disabled = false;

        finishBtn.innerHTML = "Go to Dashboard";

        alert("Something went wrong. Please try again.");

    }

}



// ======================================================
// Skip Photo
// ======================================================

skipPhoto?.addEventListener("click", async () => {

    await saveStep();

    nextStep();

});



// ======================================================
// Keyboard Navigation
// ======================================================

document.addEventListener("keydown", async (event) => {

    if (event.key === "Enter") {

        const activeElement = document.activeElement;

        // Don't trigger on buttons

        if (activeElement.tagName === "BUTTON") return;

        event.preventDefault();

        if (currentStep < TOTAL_STEPS) {

            const valid = validateCurrentStep();

            if (!valid) return;

            collectStepData();

            await saveStep();

            nextStep();

        }
        else {

            await finishOnboarding();

        }

    }

});



// ======================================================
// Keep Progress Correct
// ======================================================

updateProgress();



// ======================================================
// Startup Log
// ======================================================

console.log("Vivaha Premium Onboarding Loaded Successfully");
