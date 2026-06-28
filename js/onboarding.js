import { auth, db } from "./firebase.js";

import {
doc,
updateDoc
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const form = document.getElementById("basicForm");

form.addEventListener("submit", async(e)=>{

e.preventDefault();

const user = auth.currentUser;

if(!user){

alert("Please Login Again");

window.location="login.html";

return;

}

const lookingFor=document.getElementById("lookingFor").value;

const gender=document.getElementById("gender").value;

const dob=document.getElementById("dob").value;

const mobile=document.getElementById("mobile").value;

try{

await updateDoc(

doc(db,"users",user.uid),

{

lookingFor,

gender,

dob,

mobile

}

);

window.location="education.html";

}

catch(error){

console.log(error);

alert(error.message);

}

});
