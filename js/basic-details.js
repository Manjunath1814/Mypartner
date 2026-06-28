import { auth, db } from "../firebase.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const form = document.getElementById("basicForm");
const continueBtn = document.getElementById("continueBtn");
const errorBox = document.getElementById("errorBox");

const fields = [
    "lookingFor",
    "gender",
    "dob",
    "mobile",
    "district",
    "city",
    "language"
];

const inputs = fields.map(id => document.getElementById(id));

let uid = null;

/* -----------------------------
   Wait for Login
----------------------------- */
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "../login.html";
        return;
    }

    uid = user.uid;

    await loadExistingData();

    validateForm();

});

/* -----------------------------
   Load Previous Saved Data
----------------------------- */

async function loadExistingData() {

    try {

        const ref = doc(db, "users", uid);

        const snap = await getDoc(ref);

        if (!snap.exists()) return;

        const data = snap.data();

        if (!data.basicDetails) return;

        const basic = data.basicDetails;

        document.getElementById("lookingFor").value = basic.lookingFor || "";

        document.getElementById("gender").value = basic.gender || "";

        document.getElementById("dob").value = basic.dob || "";

        document.getElementById("mobile").value = basic.mobile || "";

        document.getElementById("district").value = basic.district || "";

        document.getElementById("city").value = basic.city || "";

        document.getElementById("language").value = basic.language || "";

    }

    catch (e) {

        console.error(e);

    }

}

/* -----------------------------
   Validation
----------------------------- */

inputs.forEach(input => {

    input.addEventListener("input", validateForm);

    input.addEventListener("change", validateForm);

});

function validateForm() {

    errorBox.innerHTML = "";

    let valid = true;

    fields.forEach(id => {

        const value = document.getElementById(id).value.trim();

        if (value === "") valid = false;

    });

    const mobile = document.getElementById("mobile").value.trim();

    if (mobile.length !== 10) valid = false;

    continueBtn.disabled = !valid;

}

/* -----------------------------
   Continue Button
----------------------------- */

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (continueBtn.disabled) return;

    const mobile = document.getElementById("mobile").value.trim();

    if (!/^[0-9]{10}$/.test(mobile)) {

        errorBox.innerHTML = "Enter a valid 10 digit mobile number.";

        return;

    }

    continueBtn.disabled = true;

    continueBtn.innerHTML = "Saving...";

    try {

        await setDoc(

            doc(db, "users", uid),

            {

                basicDetails: {

                    lookingFor: document.getElementById("lookingFor").value,

                    gender: document.getElementById("gender").value,

                    dob: document.getElementById("dob").value,

                    mobile: mobile,

                    district: document.getElementById("district").value,

                    city: document.getElementById("city").value,

                    language: document.getElementById("language").value

                },

                onboardingStep: 2,

                updatedAt: new Date().toISOString()

            },

            {

                merge: true

            }

        );

        window.location.href = "education-career.html";

    }

    catch (err) {

        console.error(err);

        errorBox.innerHTML = "Something went wrong. Please try again.";

        continueBtn.disabled = false;

        continueBtn.innerHTML = "Continue";

    }

});

/* -----------------------------
   Auto Save Every 2 Seconds
----------------------------- */

let autoSave;

inputs.forEach(input => {

    input.addEventListener("input", () => {

        clearTimeout(autoSave);

        autoSave = setTimeout(saveDraft, 2000);

    });

});

async function saveDraft() {

    if (!uid) return;

    try {

        await setDoc(

            doc(db, "users", uid),

            {

                basicDetails: {

                    lookingFor: document.getElementById("lookingFor").value,

                    gender: document.getElementById("gender").value,

                    dob: document.getElementById("dob").value,

                    mobile: document.getElementById("mobile").value,

                    district: document.getElementById("district").value,

                    city: document.getElementById("city").value,

                    language: document.getElementById("language").value

                }

            },

            {

                merge: true

            }

        );

    }

    catch (e) {

        console.log(e);

    }

}
