// ==========================================
// VIVAHA EXPLORE
// Dummy UI Version
// ==========================================

console.log("Vivaha Explore Loaded");

// ==========================================
// Search
// ==========================================

const searchInput=document.querySelector(".search-box input");

searchInput.addEventListener("keyup",function(){

    const value=this.value.toLowerCase();

    const cards=document.querySelectorAll(".profile-card");

    cards.forEach(card=>{

        const text=card.innerText.toLowerCase();

        if(text.includes(value)){

            card.style.display="block";

        }

        else{

            card.style.display="none";

        }

    });

});

// ==========================================
// Filter Buttons
// ==========================================

const filters=document.querySelectorAll(".filters button");

filters.forEach(button=>{

    button.addEventListener("click",()=>{

        filters.forEach(item=>{

            item.classList.remove("active");

        });

        button.classList.add("active");

    });

});

// ==========================================
// Express Interest
// ==========================================

const interestButtons=document.querySelectorAll(".interest-btn");

interestButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        button.innerHTML="❤️ Sent";

        button.style.background="#2E7D32";

        button.style.color="#FFFFFF";

        showToast("Interest Sent Successfully");

    });

});

// ==========================================
// View Profile
// ==========================================

const viewButtons=document.querySelectorAll(".view-btn");

viewButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        console.log("Opening Profile");

    });

});

// ==========================================
// Floating AI
// ==========================================

const aiButton=document.querySelector(".floating-ai");

if(aiButton){

    aiButton.addEventListener("click",()=>{

        console.log("Opening AI Interview");

    });

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
// Profile Hover Effect
// ==========================================

const cards=document.querySelectorAll(".profile-card");

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-6px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0px)";

    });

});

// ==========================================
// Featured Card Animation
// ==========================================

const featured=document.querySelector(".featured-card");

if(featured){

    featured.addEventListener("mouseenter",()=>{

        featured.style.transform="translateY(-5px)";

    });

    featured.addEventListener("mouseleave",()=>{

        featured.style.transform="translateY(0px)";

    });

}

// ==========================================
// Menu
// ==========================================

const menu=document.querySelector(".menu-btn");

if(menu){

    menu.addEventListener("click",()=>{

        window.location="home.html";

    });

}

// ==========================================
// Welcome
// ==========================================

console.log("Explore Ready");
