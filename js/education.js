import { auth, db } from "./firebase.js";

import {

doc,

updateDoc

}

from

"https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const form=document.getElementById("educationForm");

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const education=document.getElementById("education").value;

const occupation=document.getElementById("occupation").value;

const company=document.getElementById("company").value;

const income=document.getElementById("income").value;

const location=document.getElementById("location").value;

try{

await updateDoc(

doc(db,"users",auth.currentUser.uid),

{

education,

occupation,

company,

income,

location

}

);

window.location="family.html";

}

catch(err){

alert(err.message);

}

});
