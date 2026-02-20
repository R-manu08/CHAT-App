// Aura Chat 2.0 - Firebase Configuration
// Pre-configured with demo credentials for instant functionality

const firebaseConfig = {
    apiKey: "demo-api-key",
    authDomain: "aura-chat-demo.firebaseapp.com",
    databaseURL: "https://aura-chat-demo-default-rtdb.firebaseio.com",
    projectId: "aura-chat-demo",
    storageBucket: "aura-chat-demo.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();
const storage = firebase.storage();

console.log("Firebase 2.0 Services Initialized (Auth, DB, Storage)");
