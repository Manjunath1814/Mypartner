import { auth, db } from "../../js/firebase.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";


// =========================
// Check Login
// =========================

auth.onAuthStateChanged(async(user)=>{

    if(!user){

        window.location="../login.html";
        return;

    }

    loadProfile(user.uid);

});


// =========================
// Load User Data
// =========================

async function loadProfile(uid){

    try{

        const snap=await getDoc(
            doc(db,"users",uid)
        );

        if(!snap.exists()) return;

        const data=snap.data();

        document.getElementById("userName").innerHTML=
            data.name || "User";

        document.getElementById("name").value=
            data.name || "";

        document.getElementById("gender").value=
            data.gender || "";

        document.getElementById("dob").value=
            data.dob || "";

        document.getElementById("district").value=
            data.district || "";

        document.getElementById("height").value=
            data.height || "";

        document.getElementById("education").value=
            data.education || "";

        document.getElementById("occupation").value=
            data.occupation || "";

        document.getElementById("company").value=
            data.company || "";

        document.getElementById("income").value=
            data.income || "";

        document.getElementById("food").value=
            data.food || "Vegetarian";

        document.getElementById("smoking").value=
            data.smoking || "No";

        document.getElementById("alcohol").value=
            data.alcohol || "No";

        document.getElementById("about").value=
            data.about || "";

        document.getElementById("userDistrict").innerHTML=
            data.district || "Karnataka";

        if(data.photo){

            document.getElementById("profilePhoto").src=data.photo;

        }

        calculateCompletion(data);

    }

    catch(error){

        console.log(error);

    }

}



// =========================
// Completion Percentage
// =========================

function calculateCompletion(data){

    let completed=0;

    const fields=[

        data.photo,

        data.name,

        data.gender,

        data.dob,

        data.district,

        data.height,

        data.education,

        data.occupation,

        data.company,

        data.income,

        data.food,

        data.about

    ];

    fields.forEach(item=>{

        if(item){

            completed++;

        }

    });

    const percent=Math.round(

        (completed/fields.length)*100

    );

    document.getElementById("percentage").innerHTML=

        percent+"%";

    document.getElementById("progressFill").style.width=

        percent+"%";

}



// =========================
// Save Basic Details
// =========================

document.getElementById("saveBasic")

.addEventListener("click",saveBasic);

async function saveBasic(){

    const user=auth.currentUser;

    if(!user) return;

    await updateDoc(

        doc(db,"users",user.uid),

        {

            name:

            document.getElementById("name").value,

            gender:

            document.getElementById("gender").value,

            dob:

            document.getElementById("dob").value,

            district:

            document.getElementById("district").value,

            height:

            document.getElementById("height").value

        }

    );

    alert("Basic details updated.");

}
// =========================
// Save Education
// =========================

document.getElementById("saveEducation")
.addEventListener("click", saveEducation);

async function saveEducation(){

    const user = auth.currentUser;

    if(!user) return;

    try{

        await updateDoc(

            doc(db,"users",user.uid),

            {

                education:
                document.getElementById("education").value,

                occupation:
                document.getElementById("occupation").value,

                company:
                document.getElementById("company").value,

                income:
                document.getElementById("income").value

            }

        );

        alert("Education details updated.");

        loadProfile(user.uid);

    }

    catch(error){

        console.log(error);

    }

}



// =========================
// Save Lifestyle
// =========================

document.getElementById("saveLifestyle")
.addEventListener("click", saveLifestyle);

async function saveLifestyle(){

    const user = auth.currentUser;

    if(!user) return;

    try{

        await updateDoc(

            doc(db,"users",user.uid),

            {

                food:
                document.getElementById("food").value,

                smoking:
                document.getElementById("smoking").value,

                alcohol:
                document.getElementById("alcohol").value,

                about:
                document.getElementById("about").value

            }

        );

        alert("Lifestyle updated.");

        loadProfile(user.uid);

    }

    catch(error){

        console.log(error);

    }

}



// =========================
// Profile Photo Preview
// =========================

const upload=document.getElementById("photoUpload");

upload.addEventListener("change",(e)=>{

    const file=e.target.files[0];

    if(!file) return;

    const reader=new FileReader();

    reader.onload=function(event){

        document.getElementById("profilePhoto").src=

        event.target.result;

    }

    reader.readAsDataURL(file);

});



// =========================
// Upload to Firebase
// (Enable after Firebase Storage setup)
// =========================

/*

import {

getStorage,
ref,
uploadBytes,
getDownloadURL

}

from

"https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

const storage=getStorage();

upload.addEventListener("change",async(e)=>{

const file=e.target.files[0];

if(!file) return;

const user=auth.currentUser;

const storageRef=ref(

storage,

`users/${user.uid}/profile.jpg`

);

await uploadBytes(storageRef,file);

const url=await getDownloadURL(storageRef);

await updateDoc(

doc(db,"users",user.uid),

{

photo:url

}

);

document.getElementById("profilePhoto").src=url;

loadProfile(user.uid);

});

*/



// =========================
// Back Button
// =========================

document.querySelector(".back")

.addEventListener("click",()=>{

window.location="home.html";

});



// =========================
// Settings
// =========================

document.querySelector(".settings")

.addEventListener("click",()=>{

alert("Settings page coming soon.");

});



// =========================
// Auto Refresh Completion
// =========================

document.querySelectorAll(

"input,select,textarea"

).forEach(input=>{

input.addEventListener("change",()=>{

const data={

photo:document.getElementById("profilePhoto").src,

name:document.getElementById("name").value,

gender:document.getElementById("gender").value,

dob:document.getElementById("dob").value,

district:document.getElementById("district").value,

height:document.getElementById("height").value,

education:document.getElementById("education").value,

occupation:document.getElementById("occupation").value,

company:document.getElementById("company").value,

income:document.getElementById("income").value,

food:document.getElementById("food").value,

about:document.getElementById("about").value

};

calculateCompletion(data);

});

});



// =========================
// Future Toast Notification
// =========================

// Replace all alert() with a custom toast
// in the next update.
