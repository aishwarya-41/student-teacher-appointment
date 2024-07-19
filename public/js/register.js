// register.js
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { auth } from "../js/firebaseConfig.js";

document.getElementById('register-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value; // Include role in form

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await db.collection("users").doc(user.uid).set({
      email,
      role,
      name: "Your Name", // Capture from form or other source
      grade: "Your Grade", // Capture from form or other source
    });

    document.getElementById('register-message').textContent = "Registration successful!";
  } catch (error) {
    document.getElementById('register-message').textContent = `Error: ${error.message}`;
  }
});
