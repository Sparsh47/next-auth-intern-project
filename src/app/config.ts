import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBS5YYxLDiqgSUTHEx4dG0wn-wtFZ-hh5w",
  authDomain: "phone-auth-2412c.firebaseapp.com",
  projectId: "phone-auth-2412c",
  storageBucket: "phone-auth-2412c.appspot.com",
  messagingSenderId: "165548445446",
  appId: "1:165548445446:web:1c3da46f3b1fd3e62a1887",
  measurementId: "G-S4V6SEKEHR",
};

const app = initializeApp(firebaseConfig);

export { app };
