// // Mock messages and profile photos for different users
// const messagesData = {
//     "Sourav Singh": {
//         photo: "profile.jpg",
//         status: "online",
//         about: "B.Tech student, passionate about technology.",
//         messages: [
//             { type: 'received', text: "Hey, how's it going?", time: "12:45 PM" },
//             { type: 'sent', text: "All good, how about you?", time: "12:46 PM" }
//         ]
//     },
//     "Tushar": {
//         photo: "profile2.jpg",
//         status: "offline",
//         about: "Aspiring engineer and tech enthusiast.",
//         messages: [ 
//             { type: 'received', text: "Let's catch up soon!", time: "11:30 AM" },
//             { type: 'sent', text: "Yes, let's plan something!", time: "11:32 AM" }
//         ]
//     }
// };

// // Select elements
// const chatList = document.getElementById('chatList');
// const chatHeaderName = document.getElementById('chatHeaderName');
// const chatStatus = document.getElementById('chatStatus');
// const messagesContainer = document.getElementById('messagesContainer');
// const messageInput = document.getElementById('messageInput');
// const sendButton = document.getElementById('sendButton');
// const chatHeaderPhoto = document.getElementById('chatHeaderPhoto');
// const profileAbout = document.getElementById('profileAbout');
// const searchInput = document.getElementById('searchInput');

// let currentUser = null; // Track the currently selected user

// // Populate chat list
// function populateChatList() {
//     chatList.innerHTML = '';
//     for (let user in messagesData) {
//         const chatItem = document.createElement('div');
//         chatItem.classList.add('chat');
//         chatItem.innerHTML = `
//             <img src="${messagesData[user].photo}" alt="Chat Pic" class="chat-pic">
//             <div class="chat-info">
//                 <h3>${user}</h3>
//                 <p>${messagesData[user].messages[0].text}</p>
//             </div>
//             <span class="time">${messagesData[user].messages[0].time}</span>
//         `;
//         chatItem.addEventListener('click', () => loadUserProfile(user));
//         chatList.appendChild(chatItem);
//     }
// }

// // Function to load messages and profile details for a selected user
// function loadUserProfile(userName) {
//     currentUser = userName;
//     messagesContainer.innerHTML = ''; // Clear previous messages

//     // Update chat header with selected user name, profile photo, status, and about
//     chatHeaderName.textContent = userName;
//     chatStatus.textContent = messagesData[userName].status;
//     chatHeaderPhoto.src = messagesData[userName].photo;
//     profileAbout.textContent = messagesData[userName].about;

//     // Load and display messages for the selected user
//     const userMessages = messagesData[userName].messages;
//     if (userMessages) {
//         userMessages.forEach(msg => {
//             displayMessage(msg.type, msg.text, msg.time);
//         });
//         messagesContainer.scrollTop = messagesContainer.scrollHeight;
//     }
// }

// // Function to display a message in the chat area
// function displayMessage(type, text, time) {
//     const messageDiv = document.createElement('div');
//     messageDiv.classList.add('message', type);

//     const messageText = document.createElement('p');
//     messageText.textContent = text;
//     messageDiv.appendChild(messageText);

//     const messageTime = document.createElement('span');
//     messageTime.classList.add('time');
//     messageTime.textContent = time;
//     messageDiv.appendChild(messageTime);

//     messagesContainer.appendChild(messageDiv);
// }

// // Function to send a new message
// function sendMessage() {
//     const messageText = messageInput.value.trim();
//     if (messageText !== "" && currentUser) {
//         const currentTime = new Date();
//         const hours = currentTime.getHours().toString().padStart(2, '0');
//         const minutes = currentTime.getMinutes().toString().padStart(2, '0');
//         const messageTime = `${hours}:${minutes}`;

//         // Display the message in the chat area
//         displayMessage('sent', messageText, messageTime);

//         // Add the message to the messagesData for the current user
//         if (!messagesData[currentUser].messages) {
//             messagesData[currentUser].messages = [];
//         }
//         messagesData[currentUser].messages.push({ type: 'sent', text: messageText, time: messageTime });

//         // Clear the input field
//         messageInput.value = '';
        
//         // Scroll to the latest message
//         messagesContainer.scrollTop = messagesContainer.scrollHeight;
//     }
// }

// // Event listener for the send button
// sendButton.addEventListener('click', sendMessage);

// // Event listener for pressing "Enter" to send the message
// messageInput.addEventListener('keypress', function (event) {
//     if (event.key === 'Enter') {
//         sendMessage();
//     }
// });

// // Search functionality
// searchInput.addEventListener('input', function () {
//     const searchValue = searchInput.value.toLowerCase();

//     Array.from(chatList.children).forEach(chat => {
//         const chatName = chat.querySelector('.chat-info h3').textContent.toLowerCase();
        
//         // Show only the chats that match the search term
//         if (chatName.includes(searchValue)) {
//             chat.style.display = 'flex';
//         } else {
//             chat.style.display = 'none';
//         }
//     });
// });

// // Initialize the chat list on load
// populateChatList();

// Initialize chat data
let messagesData = {}; // Dynamically fetched from the server

// Select elements
const chatList = document.getElementById('chatList');
const chatHeaderName = document.getElementById('chatHeaderName');
const chatStatus = document.getElementById('chatStatus');
const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const chatHeaderPhoto = document.getElementById('chatHeaderPhoto');
const profileAbout = document.getElementById('profileAbout');
const searchInput = document.getElementById('searchInput');

let currentUser = null; // Track the currently selected user

// Fetch chat data from the server
async function fetchChatData() {
    try {
        const response = await fetch('/api/messages');
        const data = await response.json();
        messagesData = {};

        console.log(data)
        // Group messages by user for easier handling
        data.forEach(message => {
            if (!messagesData[message.username]) {
                messagesData[message.username] = {
                    photo: "profile.jpg", // Replace with user's profile photo if available
                    status: "online", // Replace with user's actual status if available
                    about: "About this user", // Replace with user's actual info if available
                    messages: [],
                };
            }

            messagesData[message.username].messages.push({
                type: message.type,
                text: message.message,
                time: new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });
        });
        populateChatList();
    } catch (error) {
        console.error("Error fetching chat data:", error);
    }
}

// Populate chat list
function populateChatList() {
    chatList.innerHTML = '';
    for (let user in messagesData) {
        const chatItem = document.createElement('div');
        chatItem.classList.add('chat');
        chatItem.innerHTML = `
            <img src="${messagesData[user].photo}" alt="Chat Pic" class="chat-pic">
            <div class="chat-info">
                <h3>${user}</h3>
                <p>${messagesData[user].messages.at(-1).text}</p>
            </div>
            <span class="time">${messagesData[user].messages.at(-1).time}</span>
        `;
        chatItem.addEventListener('click', () => loadUserProfile(user));
        chatList.appendChild(chatItem);
    }
}

// Function to load messages and profile details for a selected user
function loadUserProfile(userName) {
    currentUser = userName;
    messagesContainer.innerHTML = ''; // Clear previous messages

    // Update chat header with selected user details
    chatHeaderName.textContent = userName;
    chatStatus.textContent = messagesData[userName].status;
    chatHeaderPhoto.src = messagesData[userName].photo;
    profileAbout.textContent = messagesData[userName].about;

    // Load and display messages for the selected user
    let userMessages = messagesData[userName].messages;
    if (userMessages) {
        userMessages = userMessages.reverse()
        userMessages.forEach(msg => {
            displayMessage(msg.type, msg.text, msg.time);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Function to display a message in the chat area
function displayMessage(type, text, time) {
    console.log(type, text, time)
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type || "received");

    const messageText = document.createElement('p');
    messageText.textContent = text;
    messageDiv.appendChild(messageText);

    const messageTime = document.createElement('span');
    messageTime.classList.add('time');
    messageTime.textContent = time;
    messageDiv.appendChild(messageTime);

    messagesContainer.appendChild(messageDiv);
}

// Function to send a new message
async function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText !== "" && currentUser) {
        const currentTime = new Date().toISOString();

        // Update UI
        displayMessage('sent', messageText, new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

        // Save message to the server
        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: currentUser,
                    message: messageText,
                    type: "sent",
                    timestamp: currentTime,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            // Add message to local data
            if (!messagesData[currentUser].messages) {
                messagesData[currentUser].messages = [];
            }
            messagesData[currentUser].messages.push({
                type: 'sent',
                text: messageText,
                time: new Date(currentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });

            messageInput.value = ''; // Clear input field
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
}

// Event listener for the send button
sendButton.addEventListener('click', sendMessage);

// Event listener for pressing "Enter" to send the message
messageInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Search functionality
searchInput.addEventListener('input', function () {
    const searchValue = searchInput.value.toLowerCase();

    Array.from(chatList.children).forEach(chat => {
        const chatName = chat.querySelector('.chat-info h3').textContent.toLowerCase();
        
        // Show only the chats that match the search term
        if (chatName.includes(searchValue)) {
            chat.style.display = 'flex';
        } else {
            chat.style.display = 'none';
        }
    });
});

// Initialize the chat list on load
fetchChatData();
