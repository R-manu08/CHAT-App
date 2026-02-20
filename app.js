// Aura Chat - Real-time Messaging Logic

// Firebase Configuration (Using a demo database for testing)
// In a real scenario, the user would provide these credentials.
const firebaseConfig = {
    databaseURL: "https://aura-chat-demo-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const messagesRef = db.ref('messages');

// DOM Elements
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const messagesContainer = document.getElementById('messages');

// Mock User Identity (For demo purposes)
const userId = 'user_' + Math.floor(Math.random() * 1000);
const userName = 'Guest ' + userId.split('_')[1];

// Function to add message to UI
function addMessageToUI(msg, id) {
    const messageDiv = document.createElement('div');
    const isSent = msg.senderId === userId;
    
    messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;
    
    messageDiv.innerHTML = `
        <div class="message-info">${msg.senderName} • ${new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        ${msg.text}
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Send Message Logic
function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    const newMessage = {
        senderId: userId,
        senderName: userName,
        text: text,
        timestamp: Date.now()
    };

    messagesRef.push(newMessage);
    messageInput.value = '';
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Listen for Messages in Real-time
messagesRef.limitToLast(50).on('child_added', (snapshot) => {
    const msg = snapshot.val();
    addMessageToUI(msg, snapshot.key);
});

console.log('Aura Chat Initialized as', userName);
