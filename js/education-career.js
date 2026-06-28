import { auth, db } from "../firebase.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const form = document.getElementById("educationForm");
const continueBtn = document.getElementById("continueBtn");
const errorBox = document.getElementById("errorBox");

const fields = [
    "education",
    "occupation",
    "company",
    "income",
    "workLocation",
    "employmentType",
    "summary"
];

const inputs = fields.map(id => document.getElementById(id));

let uid = null;

/* ---------------------------
   Authentication
---------------------------- */

auth.onAuthStateChanged(async (user) => {

    if (!user) {
        window.location.href = "../login.html";
        return;
    }

    uid = user.uid;

    await loadExistingData();

    validateForm();

});

/* ---------------------------
   Load Existing Firestore Data
---------------------------- */

async function loadExistingData() {

    try {

        const snap = await getDoc(doc(db, "users", uid));

        if (!snap.exists()) return;

        const data = snap.data();

        if (!data.educationCareer) return;

        const edu = data.educationCareer;

        document.getElementById("education").value = edu.education || "";
        document.getElementById("occupation").value = edu.occupation || "";
        document.getElementById("company").value = edu.company || "";
        document.getElementById("income").value = edu.income || "";
        document.getElementById("workLocation").value = edu.workLocation || "";
        document.getElementById("employmentType").value = edu.employmentType || "";
        document.getElementById("summary").value = edu.summary || "";

    } catch (e) {

        console.error(e);

    }

}

/* ---------------------------
   Validation
---------------------------- */

inputs.forEach(input => {

    input.addEventListener("input", validateForm);
    input.addEventListener("change", validateForm);

});

function validateForm() {

    errorBox.innerHTML = "";

    let valid = true;

    fields.forEach(id => {

        if (document.getElementById(id).value.trim() === "") {

            valid = false;

        }

    });

    continueBtn.disabled = !valid;

}

/* ---------------------------
   Submit
---------------------------- */

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (continueBtn.disabled) return;

    continueBtn.disabled = true;
    continueBtn.innerHTML = "Saving...";

    try {

        await setDoc(

            doc(db, "users", uid),

            {

                educationCareer: {

                    education: document.getElementById("education").value,
                    occupation: document.getElementById("occupation").value,
                    company: document.getElementById("company").value,
                    income: document.getElementById("income").value,
                    workLocation: document.getElementById("workLocation").value,
                    employmentType: document.getElementById("employmentType").value,
                    summary: document.getElementById("summary").value

                },

                onboardingStep: 3,

                updatedAt: new Date().toISOString()

            },

            {

                merge: true

            }

        );

        window.location.href = "family-lifestyle.html";

    } catch (err) {

        console.error(err);

        errorBox.innerHTML = "Unable to save your details.";

        continueBtn.disabled = false;

        continueBtn.innerHTML = "Continue";

    }

});

/* ---------------------------
   Auto Save Draft
---------------------------- */

let timer;

inputs.forEach(input => {

    input.addEventListener("input", () => {

        clearTimeout(timer);

        timer = setTimeout(saveDraft, 1500);

    });

});

async function saveDraft() {

    if (!uid) return;

    try {

        await setDoc(

            doc(db, "users", uid),

            {

                educationCareer: {

                    education: document.getElementById("education").value,
                    occupation: document.getElementById("occupation").value,
                    company: document.getElementById("company").value,
                    income: document.getElementById("income").value,
                    workLocation: document.getElementById("workLocation").value,
                    employmentType: document.getElementById("employmentType").value,
                    summary: document.getElementById("summary").value

                }

            },

            {

                merge: true

            }

        );

    } catch (e) {

        console.error(e);

    }

}
