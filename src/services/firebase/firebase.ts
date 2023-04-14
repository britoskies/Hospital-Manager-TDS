import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDG-3uDpMn0x-Ic7A5zg8y5b9vOU5iar0U",
    authDomain: "hospital-management-system-001.firebaseapp.com",
    projectId: "hospital-management-system-001",
    storageBucket: "hospital-management-system-001.appspot.com",
    messagingSenderId: "145221305188",
    appId: "1:145221305188:web:5ab140a4bf25818a5fb071",
    measurementId: "G-84PKE0LNQ7"
};

const app = initializeApp(firebaseConfig);

export default app;