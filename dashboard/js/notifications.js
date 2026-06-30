/*=========================================
        VIVAHA NOTIFICATIONS
==========================================*/

//=========================================
// DUMMY NOTIFICATIONS
//=========================================

const notifications = [

{
    id:1,
    type:"message",
    unread:true,
    title:"New Message",
    description:"Priya Sharma sent you a new message.",
    time:"2 min ago",
    icon:"ri-chat-3-line",
    iconClass:"icon-message",
    image:"../assets/images/profile1.jpg",
    button:"Open Chat",
    page:"chat-room.html"
},

{
    id:2,
    type:"match",
    unread:true,
    title:"New AI Match",
    description:"You and Ananya Rao have 96% compatibility.",
    time:"15 min ago",
    icon:"ri-heart-3-fill",
    iconClass:"icon-match",
    image:"",
    button:"View Match",
    page:"matches.html"
},

{
    id:3,
    type:"ai",
    unread:false,
    title:"AI Relationship Report Ready",
    description:"Your complete compatibility report is available.",
    time:"1 hour ago",
    icon:"ri-robot-2-line",
    iconClass:"icon-ai",
    image:"",
    button:"View Report",
    page:"ai-report.html"
},

{
    id:4,
    type:"premium",
    unread:true,
    title:"Upgrade to Gold",
    description:"Unlock unlimited interests and advanced AI insights.",
    time:"Today",
    icon:"ri-vip-crown-2-line",
    iconClass:"icon-premium",
    image:"",
    button:"Upgrade",
    page:"premium.html"
},

{
    id:5,
    type:"message",
    unread:false,
    title:"Profile Viewed",
    description:"Sneha Patil viewed your profile.",
    time:"Yesterday",
    icon:"ri-eye-line",
    iconClass:"icon-profile",
    image:"../assets/images/profile2.jpg",
    button:"View Profile",
    page:"view-profile.html"
},

{
    id:6,
    type:"verify",
    unread:false,
    title:"Verification Approved",
    description:"Your profile has been successfully verified.",
    time:"Yesterday",
    icon:"ri-verified-badge-fill",
    iconClass:"icon-verify",
    image:"",
    button:"View",
    page:"verify.html"
},

{
    id:7,
    type:"ai",
    unread:true,
    title:"Complete AI Interview",
    description:"Increase your profile score by completing the interview.",
    time:"2 days ago",
    icon:"ri-user-star-line",
    iconClass:"icon-ai",
    image:"",
    button:"Start",
    page:"ai-interview.html"
}

];

//=========================================
// ELEMENTS
//=========================================

const notificationList =
document.getElementById("notificationList");

const emptyState =
document.getElementById("emptyState");

const totalNotifications =
document.getElementById("totalNotifications");

const unreadNotifications =
document.getElementById("unreadNotifications");

//=========================================
// RENDER
//=========================================

function renderNotifications(data){

    notificationList.innerHTML="";

    if(data.length===0){

        emptyState.style.display="block";

        return;

    }

    emptyState.style.display="none";

    data.forEach(item=>{

        const card=document.createElement("div");

        card.className=item.unread
        ? "notification-card unread"
        : "notification-card";

        let imageHTML="";

        if(item.image){

            imageHTML=`
            <img
                src="${item.image}"
                class="notification-avatar">
            `;

        }else{

            imageHTML=`
            <div class="notification-icon ${item.iconClass}">
                <i class="${item.icon}"></i>
            </div>
            `;

        }

        card.innerHTML=`

            ${imageHTML}

            <div class="notification-content">

                <h3>${item.title}</h3>

                <p>${item.description}</p>

                <div class="notification-time">

                    <i class="ri-time-line"></i>

                    ${item.time}

                </div>

                <div class="notification-action">

                    <button>

                        ${item.button}

                    </button>

                </div>

            </div>

        `;

        card.addEventListener("click",()=>{

            window.location=item.page;

        });

        notificationList.appendChild(card);

    });

}

renderNotifications(notifications);

//=========================================
// COUNTS
//=========================================

function updateCounts(){

    totalNotifications.textContent=
    notifications.length;

    const unread=
    notifications.filter(n=>n.unread).length;

    unreadNotifications.textContent=
    unread;

}

updateCounts();

//=========================================
// FILTER
//=========================================

const filterButtons=
document.querySelectorAll(".filter-btn");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>
            btn.classList.remove("active"));

        button.classList.add("active");

        const filter=
        button.dataset.filter;

        if(filter==="all"){

            renderNotifications(notifications);

        }else{

            const filtered=
            notifications.filter(n=>
                n.type===filter);

            renderNotifications(filtered);

        }

    });

});

//=========================================
// MARK ALL READ
//=========================================

document
.getElementById("markAllBtn")
.addEventListener("click",()=>{

    notifications.forEach(n=>{

        n.unread=false;

    });

    renderNotifications(notifications);

    updateCounts();

});

//=========================================
// MENU
//=========================================

document
.getElementById("menuBtn")
.addEventListener("click",()=>{

    alert("Sidebar menu coming soon.");

});

//=========================================
// FLOATING BUTTON
//=========================================

document
.querySelector(".floating-btn")
.addEventListener("click",()=>{

    window.location="explore.html";

});

//=========================================
// SMALL ENTRY ANIMATION
//=========================================

window.addEventListener("load",()=>{

    document
    .querySelectorAll(".notification-card")
    .forEach((card,index)=>{

        card.style.opacity="0";

        card.style.transform="translateY(20px)";

        setTimeout(()=>{

            card.style.transition=".35s";

            card.style.opacity="1";

            card.style.transform="translateY(0)";

        },index*80);

    });

});
