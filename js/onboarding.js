import { auth, db } from "./firebase.js";

import {
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// --------------------
// Elements
// --------------------

const form = document.getElementById("onboardingForm");

const gender = document.getElementById("gender");

const lookingFor = document.getElementById("lookingFor");

// --------------------
// Auto Select Looking For
// --------------------

gender.addEventListener("change", () => {

    if (gender.value === "Male") {

        lookingFor.value = "Bride";

    } else if (gender.value === "Female") {

        lookingFor.value = "Groom";

    } else {

        lookingFor.value = "";

    }

});

// --------------------
// Submit
// --------------------

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {

        alert("Please login again.");

        window.location.href = "login.html";

        return;

    }

    const fullName = document.getElementById("name").value.trim();

    const userGender = gender.value;

    const looking = lookingFor.value;

    const education = document.getElementById("education").value;

    const district = document.getElementById("district").value;

    // Validation

    if (
        fullName === "" ||
        userGender === "" ||
        education === "" ||
        district === ""
    ) {

        alert("Please fill all fields.");

        return;

    }

    try {

        await updateDoc(

            doc(db, "users", user.uid),

            {

                name: fullName,

                gender: userGender,

                lookingFor: looking,

                education: education,

                district: district,

                onboardingComplete: true,

                updatedAt: new Date()

            }

        );

        // Redirect

        window.location.href = "dashboard/home.html";

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

});
