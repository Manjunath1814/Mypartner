import { auth, db } from "../js/firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";


// ==========================
// Check Login
// ==========================

auth.onAuthStateChanged(async(user)=>{

    if(!user){

        window.location="../login.html";
        return;

    }

    loadUser(user.uid);

});


// ==========================
// Load User
// ==========================

async function loadUser(uid){

    try{

        const snap=await getDoc(
            doc(db,"users",uid)
        );

        if(!snap.exists()) return;

        const data=snap.data();

        // User Name

        document.getElementById("userName").innerHTML=

            data.name || "User";


        // User Photo

        if(data.photo){

            document.getElementById("userPhoto").src=data.photo;

        }


        calculateProfile(data);

    }

    catch(error){

        console.log(error);

    }

}



// ==========================
// Profile Completion
// ==========================

function calculateProfile(data){

    let completed=0;

    const fields=[

        data.name,

        data.gender,

        data.education,

        data.district,

        data.photo

    ];

    fields.forEach(field=>{

        if(field){

            completed++;

        }

    });

    const percentage=Math.round(

        (completed/fields.length)*100

    );

    document.querySelector(

        ".progress-circle"

    ).innerHTML=percentage+"%";

}



// ==========================
// Bottom Navigation
// ==========================

const navItems = document.querySelectorAll(".bottom-nav a");

navItems.forEach(item => {

    item.addEventListener("click", () => {

        navItems.forEach(nav => {

            nav.classList.remove("active");

        });

        item.classList.add("active");

    });

});

// Home
navItems[0].onclick = () => {

    window.location.href = "home.html";

};

// Explore
navItems[1].onclick = () => {

    window.location.href = "../explore/explore.html";

};

// Matches
navItems[2].onclick = () => {

    window.location.href = "../matches/matches.html";

};

// Chat
navItems[3].onclick = () => {

    window.location.href = "../chat/chat.html";

};

// Profile
navItems[4].onclick = () => {

    window.location.href = "../profile/profile.html";

};


// ==========================
// Quick Action Cards
// ==========================

const actions=document.querySelectorAll(".action-card");

actions[0].onclick=()=>{

    window.location="../profile/profile.html";

};

actions[1].onclick=()=>{

    window.location="../verification/verify.html";

};

actions[2].onclick=()=>{

    window.location="../ai/ai-interview.html";

};



// ==========================
// Complete Profile Button
// ==========================

document.querySelector(".profile-card button")

.onclick=()=>{

    window.location="../profile/profile.html";

};



// ==========================
// Premium Button
// ==========================

document.querySelector(".premium button")

.onclick=()=>{

    window.location="../premium/plans.html";

};



// ==========================
// AI Match Cards
// ==========================

document.querySelectorAll(".match-card")

.forEach(card=>{

    card.onclick=()=>{

        window.location="../profile/view-profile.html";

    };

});



// ==========================
// Notification
// ==========================

document.querySelector(".notification")

.onclick=()=>{

    window.location="../notifications.html";

};



// ==========================
// Menu
// ==========================

document.querySelector(".menu")

.onclick=()=>{

    alert("Sidebar Coming Soon");

};
