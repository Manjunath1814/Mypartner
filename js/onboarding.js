import { auth, db } from "./firebase.js";

import {

doc,

updateDoc

}

from

"https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";


// ----------------------------
// Variables
// ----------------------------

const steps=document.querySelectorAll(".step");

const nextBtns=document.querySelectorAll(".nextBtn");

const backBtns=document.querySelectorAll(".backBtn");

const progressFill=document.getElementById("progressFill");

const stepText=document.getElementById("stepText");

let currentStep=0;


// ----------------------------
// Show Step
// ----------------------------

function showStep(index){

steps.forEach(step=>{

step.classList.remove("active");

});

steps[index].classList.add("active");

const percent=((index+1)/8)*100;

progressFill.style.width=percent+"%";

stepText.innerHTML=`Step ${index+1} of 8`;

}


// ----------------------------
// Next Button
// ----------------------------

nextBtns.forEach(btn=>{

btn.addEventListener("click",async()=>{

const success=await saveStep(currentStep);

if(!success) return;

if(currentStep<steps.length-1){

currentStep++;

showStep(currentStep);

window.scrollTo({

top:0,

behavior:"smooth"

});

}

});

});


// ----------------------------
// Back Button
// ----------------------------

backBtns.forEach(btn=>{

btn.addEventListener("click",()=>{

if(currentStep>0){

currentStep--;

showStep(currentStep);

window.scrollTo({

top:0,

behavior:"smooth"

});

}

});

});


// ----------------------------
// Save Step
// ----------------------------

async function saveStep(step){

const user=auth.currentUser;

if(!user){

alert("Login expired");

window.location="login.html";

return false;

}

try{

switch(step){

case 0:

await saveBasic(user.uid);

break;

case 1:

await saveEducation(user.uid);

break;

case 2:

await saveFamily(user.uid);

break;

case 3:

await savePartner(user.uid);

break;

case 4:

await saveUploads(user.uid);

break;

case 5:

break;

case 6:

break;

case 7:

break;

}

return true;

}

catch(error){

console.log(error);

alert(error.message);

return false;

}

}


// ----------------------------
// Save Basic Details
// ----------------------------

async function saveBasic(uid){

await updateDoc(

doc(db,"users",uid),

{

lookingFor:

document.getElementById("lookingFor").value,

gender:

document.getElementById("gender").value,

dob:

document.getElementById("dob").value,

mobile:

document.getElementById("mobile").value

}

);

}


// ----------------------------
// Save Education
// ----------------------------

async function saveEducation(uid){

await updateDoc(

doc(db,"users",uid),

{

education:

document.getElementById("education").value,

occupation:

document.getElementById("occupation").value,

company:

document.getElementById("company").value,

income:

document.getElementById("income").value,

city:

document.getElementById("city").value

}

);

}


// ----------------------------
// Save Family
// ----------------------------

async function saveFamily(uid){

await updateDoc(

doc(db,"users",uid),

{

familyType:

document.getElementById("familyType").value,

familyValues:

document.getElementById("familyValues").value,

motherTongue:

document.getElementById("motherTongue").value,

religion:

document.getElementById("religion").value,

caste:

document.getElementById("caste").value,

food:

document.getElementById("food").value

}

);

}


// ----------------------------
// Save Partner Preference
// ----------------------------

async function savePartner(uid){

await updateDoc(

doc(db,"users",uid),

{

preferredAge:

document.getElementById("preferredAge").value,

preferredEducation:

document.getElementById("preferredEducation").value,

preferredOccupation:

document.getElementById("preferredOccupation").value,

preferredCity:

document.getElementById("preferredCity").value,

preferredState:

document.getElementById("preferredState").value,

partnerDescription:

document.getElementById("partnerDescription").value

}

);

}


// ----------------------------
// Upload Placeholder
// ----------------------------

async function saveUploads(uid){

console.log("Upload will be added next.");

}


// ----------------------------
// Finish Button
// ----------------------------

const finish=document.getElementById("finishProfile");

if(finish){

finish.addEventListener("click",async()=>{

await updateDoc(

doc(db,"users",auth.currentUser.uid),

{

onboardingComplete:true

}

);

window.location="dashboard/home.html";

});

}


// ----------------------------
// Start
// ----------------------------

showStep(currentStep);

