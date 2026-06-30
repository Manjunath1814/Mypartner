/*=========================================
        VIVAHA - CHAT ROOM
==========================================*/

//=========================================
// Elements
//=========================================

const chatContainer = document.getElementById("chatContainer");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const typingIndicator = document.getElementById("typingIndicator");

//=========================================
// Initial Scroll
//=========================================

window.addEventListener("load", () => {
    scrollToBottom();
});

//=========================================
// Scroll Function
//=========================================

function scrollToBottom() {

    chatContainer.scrollTop = chatContainer.scrollHeight;

}

//=========================================
// Send Message
//=========================================

function sendMessage() {

    const text = messageInput.value.trim();

    if (text === "") return;

    const message = document.createElement("div");

    message.className = "message sent";

    message.innerHTML = `

        <div class="bubble">

            <p>${text}</p>

            <span>

                ${currentTime()}

                <i class="ri-check-line"></i>

            </span>

        </div>

    `;

    chatContainer.insertBefore(message, typingIndicator);

    messageInput.value = "";

    scrollToBottom();

    showTyping();

}

//=========================================
// Typing Animation
//=========================================

function showTyping() {

    typingIndicator.style.display = "flex";

    scrollToBottom();

    setTimeout(() => {

        receiveReply();

    }, 1800);

}

//=========================================
// Dummy AI Replies
//=========================================

const replies = [

    "That's wonderful 😊",

    "I'm happy to know that.",

    "Can you tell me more about yourself?",

    "Your profile looks really impressive.",

    "Family values are very important to me.",

    "Nice to meet you here on Vivaha.",

    "What are your hobbies?",

    "I enjoy travelling and reading books.",

    "Hope we can know each other better.",

    "Thank you for your message."

];

//=========================================
// Receive Message
//=========================================

function receiveReply() {

    typingIndicator.style.display = "none";

    const randomReply =
        replies[Math.floor(Math.random() * replies.length)];

    const message = document.createElement("div");

    message.className = "message received";

    message.innerHTML = `

        <img src="../assets/images/profile1.jpg"
             class="message-avatar">

        <div class="bubble">

            <p>${randomReply}</p>

            <span>${currentTime()}</span>

        </div>

    `;

    chatContainer.appendChild(message);

    scrollToBottom();

}

//=========================================
// Current Time
//=========================================

function currentTime() {

    const now = new Date();

    return now.toLocaleTimeString([], {

        hour: '2-digit',
        minute: '2-digit'

    });

}

//=========================================
// Send Button
//=========================================

sendBtn.addEventListener("click", sendMessage);

//=========================================
// Enter Key
//=========================================

messageInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        e.preventDefault();

        sendMessage();

    }

});

//=========================================
// Header Buttons
//=========================================

document.querySelector(".back-btn").onclick = () => {

    window.location.href = "chat.html";

};

document.querySelector(".user-info").onclick = () => {

    window.location.href = "view-profile.html";

};

document.querySelectorAll(".header-actions button")[0].onclick = () => {

    alert("Voice calling will be available soon.");

};

document.querySelectorAll(".header-actions button")[1].onclick = () => {

    alert("Video calling will be available soon.");

};

document.querySelectorAll(".header-actions button")[2].onclick = () => {

    window.location.href = "view-profile.html";

};

//=========================================
// Auto Scroll on Resize
//=========================================

window.addEventListener("resize", scrollToBottom);

//=========================================
// Input Focus
//=========================================

messageInput.addEventListener("focus", () => {

    setTimeout(scrollToBottom, 300);

});
