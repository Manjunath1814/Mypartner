import {

auth,

db,

provider

} from "./firebase.js";

import {

signInWithPopup

} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {

doc,

getDoc,

setDoc,

serverTimestamp

} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const loginButton = document.getElementById("googleLogin");

loginButton.addEventListener("click", async () => {

try{

const result = await signInWithPopup(auth, provider);

const user = result.user;

const userRef = doc(db,"users",user.uid);

const snapshot = await getDoc(userRef);

if(!snapshot.exists()){

await setDoc(userRef,{

uid:user.uid,

name:user.displayName,

email:user.email,

photo:user.photoURL,

plan:"Free",

verified:false,

onboardingComplete:false,

createdAt:serverTimestamp()

});

window.location.href="onboarding.html";

}else{

const data=snapshot.data();

if(data.onboardingComplete){

window.location.href="dashboard/home.html";

}else{

window.location.href="onboarding.html";

}

}

}catch(error){

console.log(error);

alert(error.message);

}

});
