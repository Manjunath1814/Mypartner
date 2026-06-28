import { auth, db } from "./firebase.js";

import {

doc,

updateDoc

}

from

"https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const form=document.getElementById("familyForm");

form.addEventListener("submit",async(e)=>{

e.preventDefault();

await updateDoc(

doc(db,"users",auth.currentUser.uid),

{

father:document.getElementById("father").value,

mother:document.getElementById("mother").value,

familyType:document.getElementById("familyType").value,

fatherOccupation:document.getElementById("fatherOccupation").value,

motherOccupation:document.getElementById("motherOccupation").value,

brothers:document.getElementById("brothers").value,

sisters:document.getElementById("sisters").value

}

);

window.location="lifestyle.html";

});
