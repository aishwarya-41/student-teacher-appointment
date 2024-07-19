import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDcRXCUIRuODy_NK9LHRcu9HtiQcCuCmlI",
  authDomain: "student-teacher-appointm-d130e.firebaseapp.com",
  projectId: "student-teacher-appointm-d130e",
  storageBucket: "student-teacher-appointm-d130e.appspot.com",
  messagingSenderId: "138490773111",
  appId: "1:138490773111:web:5484c85e5f1180d21f5072",
  measurementId: "G-V6T3RVCPGX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
