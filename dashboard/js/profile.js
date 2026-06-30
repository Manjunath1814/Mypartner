// ==========================================
// VIVAHA PROFILE
// Dummy Version (UI Only)
// ==========================================

// Dummy User

const user = {

    name: "Manjunath Manu",

    district: "Ballari, Karnataka",

    completion: 72,

    education: "BCA Graduate",

    occupation: "Founder",

    company: "Vivaha Technologies",

    income: "₹12,00,000",

    about:
    "Entrepreneur passionate about technology, education and building meaningful relationships.",

    food: "Vegetarian",

    smoking: "No",

    alcohol: "No"

};

// ==========================================
// Load Profile
// ==========================================

window.onload = () => {

    loadProfile();

};

// ==========================================

function loadProfile(){

    document.getElementById("userName").innerHTML=user.name;

    document.getElementById("completion").innerHTML=

    user.completion+"%";

    document.getElementById("name").value=user.name;

    document.getElementById("district").value=

    user.district;

    document.getElementById("education").value=

    user.education;

    document.getElementById("occupation").value=

    user.occupation;

    document.getElementById("company").value=

    user.company;

    document.getElementById("income").value=

    user.income;

    document.getElementById("about").value=

    user.about;

    document.getElementById("food").value=

    user.food;

    document.getElementById("smoking").value=

    user.smoking;

    document.getElementById("alcohol").value=

    user.alcohol;

}

// ==========================================
// Profile Image Preview
// ==========================================

const upload=document.getElementById("photoUpload");

upload.addEventListener("change",(e)=>{

    const file=e.target.files[0];

    if(!file) return;

    const reader=new FileReader();

    reader.onload=(event)=>{

        document.getElementById("profilePhoto").src=

        event.target.result;

    }

    reader.readAsDataURL(file);

});

// ==========================================
// Save Buttons
// ==========================================

document.querySelectorAll("button")

.forEach(button=>{

button.onclick=()=>{

showToast("Profile Updated Successfully");

};

});

// ==========================================
// Completion
// ==========================================

document.querySelectorAll(

"input,textarea,select"

)

.forEach(input=>{

input.addEventListener("change",updateCompletion);

});

function updateCompletion(){

let fields=document.querySelectorAll(

"input,textarea,select"

);

let completed=0;

fields.forEach(field=>{

if(field.value!=""){

completed++;

}

});

let percent=Math.round(

(completed/fields.length)*100

);

document.getElementById("completion")

.innerHTML=

percent+"%";

document.querySelector(".progress-fill")

.style.width=

percent+"%";

}

// ==========================================
// Toast
// ==========================================

function showToast(message){

let toast=document.createElement("div");

toast.className="toast";

toast.innerHTML=message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.classList.remove("show");

setTimeout(()=>{

toast.remove();

},300);

},2500);

}

// ==========================================
// Navigation
// ==========================================

document.querySelector(".menu-btn")

.onclick=()=>{

window.location="home.html";

};

document.querySelectorAll(".settings-list a")

.forEach(item=>{

item.addEventListener("click",(e)=>{

console.log(

"Navigate :",

e.currentTarget.href

);

});

});

console.log(

"Vivaha Profile Loaded"

);
