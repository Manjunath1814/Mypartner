/*=========================================
        VIVAHA - CHAT
==========================================*/

const chats = [
    {
        id: 1,
        name: "Priya Sharma",
        photo: "../assets/images/profile1.jpg",
        message: "Hi! Hope you're having a wonderful day 😊",
        time: "09:42 AM",
        unread: 2,
        online: true,
        read: false
    },
    {
        id: 2,
        name: "Ananya Rao",
        photo: "../assets/images/profile2.jpg",
        message: "It was nice talking to you yesterday.",
        time: "Yesterday",
        unread: 0,
        online: false,
        read: true
    },
    {
        id: 3,
        name: "Sneha Patil",
        photo: "../assets/images/profile3.jpg",
        message: "Thank you for expressing interest.",
        time: "08:15 AM",
        unread: 1,
        online: true,
        read: false
    },
    {
        id: 4,
        name: "Meghana",
        photo: "../assets/images/profile4.jpg",
        message: "Would you like to schedule a call?",
        time: "Monday",
        unread: 0,
        online: false,
        read: true
    },
    {
        id: 5,
        name: "Pooja N",
        photo: "../assets/images/profile5.jpg",
        message: "Looking forward to knowing you better.",
        time: "Sunday",
        unread: 4,
        online: true,
        read: false
    },
    {
        id: 6,
        name: "Aishwarya",
        photo: "../assets/images/profile6.jpg",
        message: "Thank you 😊",
        time: "Saturday",
        unread: 0,
        online: false,
        read: true
    }
];

/*=========================================
RENDER CHAT LIST
==========================================*/

const chatList = document.getElementById("chatList");

function renderChats(data){

    chatList.innerHTML = "";

    if(data.length === 0){

        chatList.innerHTML = `
            <div class="empty-chat">
                <i class="ri-chat-3-line"></i>
                <h3>No Conversations Found</h3>
                <p>Try searching with another name.</p>
            </div>
        `;

        return;
    }

    data.forEach(chat=>{

        const unreadBadge = chat.unread > 0
            ? `<div class="unread-badge">${chat.unread}</div>`
            : `<i class="ri-check-double-line read-status ${chat.read ? "double-tick" : ""}"></i>`;

        const onlineDot = chat.online
            ? `<div class="online-dot"></div>`
            : "";

        const card = document.createElement("div");

        card.className = "chat-card";

        card.innerHTML = `

            <div class="chat-avatar">

                <img src="${chat.photo}" alt="${chat.name}">

                ${onlineDot}

            </div>

            <div class="chat-content">

                <div class="chat-top">

                    <div class="chat-name">${chat.name}</div>

                    <div class="chat-time">${chat.time}</div>

                </div>

                <div class="chat-bottom">

                    <div class="last-message">
                        ${chat.message}
                    </div>

                    ${unreadBadge}

                </div>

            </div>

        `;

        card.addEventListener("click",()=>{

            // Later pass Firebase Chat ID
            window.location.href = "chat-room.html";

        });

        chatList.appendChild(card);

    });

}

renderChats(chats);

/*=========================================
SEARCH
==========================================*/

const searchInput = document.getElementById("searchChat");

searchInput.addEventListener("keyup",()=>{

    const value = searchInput.value.toLowerCase();

    const filtered = chats.filter(chat=>{

        return (
            chat.name.toLowerCase().includes(value) ||
            chat.message.toLowerCase().includes(value)
        );

    });

    renderChats(filtered);

});

/*=========================================
FILTER BUTTON
==========================================*/

document.querySelector(".filter-btn").addEventListener("click",()=>{

    alert("Filter options will be available soon.");

});

/*=========================================
FLOATING BUTTON
==========================================*/

document.querySelector(".floating-btn").addEventListener("click",()=>{

    window.location.href="matches.html";

});

/*=========================================
MENU BUTTON
==========================================*/

document.querySelector(".icon-btn").addEventListener("click",()=>{

    alert("Sidebar menu coming soon.");

});

/*=========================================
AUTO REFRESH (Dummy)
==========================================*/

setInterval(()=>{

    console.log("Checking for new messages...");

},10000);
