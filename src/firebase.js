


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5zfayIJS6aIjw3pStKQoZ5SK95LH4iJ4",
  authDomain: "cashier-deef6.firebaseapp.com",
  projectId: "cashier-deef6",
  storageBucket: "cashier-deef6.appspot.com",
  messagingSenderId: "419729793177",
  appId: "1:419729793177:web:cc043e9b92a5f090f55808",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

var db = getFirestore(app);

export { db };
