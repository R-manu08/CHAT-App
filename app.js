// Aura Chat 2.0 - Core Application Logic

// DOM Elements - Auth
const authScreen = document.getElementById('auth-screen');
const mainApp = document.getElementById('main-app');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');

// DOM Elements - Chat & Profile
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const logoutBtn = document.getElementById('logout-btn');
const myNameDisplay = document.getElementById('my-name');
const myAvatarDisplay = document.getElementById('my-avatar');
const activeUsersList = document.getElementById('active-users');

// 1. Authentication State Logic
auth.onAuthStateChanged(user => {
    if (user) {
        showApp(user);
    } else {
        showAuth();
    }
});

function showAuth() {
    authScreen.style.display = 'flex';
    mainApp.style.display = 'none';
}

function showApp(user) {
    authScreen.style.display = 'none';
    mainApp.style.display = 'grid';

    myNameDisplay.innerText = user.displayName || 'Anonymous';
    myAvatarDisplay.innerText = (user.displayName || 'U').charAt(0).toUpperCase();

    initRealtime(user);
}

// 2. Auth Actions
showSignup.onclick = () => { loginForm.style.display = 'none'; signupForm.style.display = 'block'; };
showLogin.onclick = () => { signupForm.style.display = 'none'; loginForm.style.display = 'block'; };

document.getElementById('signup-btn').onclick = async () => {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const pass = document.getElementById('signup-password').value;

    try {
        const cred = await auth.createUserWithEmailAndPassword(email, pass);
        await cred.user.updateProfile({ displayName: name });
        // Sync user to database
        db.ref('users/' + cred.user.uid).set({
            name: name,
            status: 'online',
            lastSeen: Date.now()
        });
    } catch (err) { alert(err.message); }
};

document.getElementById('login-btn').onclick = async () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    try { await auth.signInWithEmailAndPassword(email, pass); }
    catch (err) { alert(err.message); }
};

logoutBtn.onclick = () => auth.signOut();

// 3. Real-time Messaging & Presence
function initRealtime(user) {
    // Messaging
    const messagesRef = db.ref('messages');
    messagesRef.limitToLast(50).off(); // Reset listeners
    messagesContainer.innerHTML = '';

    messagesRef.limitToLast(50).on('child_added', (snapshot) => {
        const msg = snapshot.val();
        renderMessage(msg, user.uid);
    });

    // Theme logic
    document.querySelectorAll('.theme-dot').forEach(dot => {
        dot.onclick = () => {
            const theme = dot.getAttribute('data-theme');
            document.body.className = 'theme-' + theme;
            document.querySelectorAll('.theme-dot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        };
    });

    // Presence
    const userStatusRef = db.ref('users/' + user.uid);
    userStatusRef.onDisconnect().set({ name: user.displayName, status: 'offline', lastSeen: Date.now() });

    db.ref('users').on('value', snapshot => {
        activeUsersList.innerHTML = '';
        const users = snapshot.val();
        for (let uid in users) {
            if (uid === user.uid) continue;
            const u = users[uid];
            renderUserItem(u);
        }
    });
}

function renderMessage(msg, myUid) {
    const div = document.createElement('div');
    const isSent = msg.senderId === myUid;
    div.className = `message ${isSent ? 'sent' : 'received'}`;
    div.innerHTML = `
        <div class="message-info">${msg.senderName} • ${new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        ${msg.text}
    `;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function renderUserItem(user) {
    const div = document.createElement('div');
    div.className = 'user-item';
    div.innerHTML = `
        <div class="user-avatar">${user.name.charAt(0)}</div>
        <div class="user-details">
            <div style="font-weight: 600;">${user.name}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${user.status}</div>
        </div>
        <div class="status-indicator" style="margin-left: auto; background: ${user.status === 'online' ? '#10b981' : '#6b7280'};"></div>
    `;
    activeUsersList.appendChild(div);
}

// Global Send logic
function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || !auth.currentUser) return;

    db.ref('messages').push({
        senderId: auth.currentUser.uid,
        senderName: auth.currentUser.displayName,
        text: text,
        timestamp: Date.now()
    });
    messageInput.value = '';
}

sendBtn.onclick = sendMessage;
messageInput.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
