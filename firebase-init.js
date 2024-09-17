// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPrnIf-vF2_JOf-E8hgtEVOyCq8s1AviY",
  authDomain: "gknm-b263e.firebaseapp.com",
  projectId: "gknm-b263e",
  storageBucket: "gknm-b263e.appspot.com",
  messagingSenderId: "366058775183",
  appId: "1:366058775183:web:3f33135f4b1325d542c6fa",
  measurementId: "G-TWXGN6PJ32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
