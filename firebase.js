// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeApp, getApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCCdHMOupKbi0yHXU_qPrn4qdj8I2TewxE",
	authDomain: "tipping-point-app.firebaseapp.com",
	projectId: "tipping-point-app",
	storageBucket: "tipping-point-app.appspot.com",
	messagingSenderId: "757555138137",
	appId: "1:757555138137:web:36f0a2b969382dfa36eb48",
	measurementId: "G-0P2MJJJKDG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = initializeFirestore(app, { experimentalForceLongPolling: true });

export { db, auth };
