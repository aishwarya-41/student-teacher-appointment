import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import app from "./firebaseConfig.js";

const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById('appointment-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const teacherName = document.getElementById('teacher-name').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const message = document.getElementById('message').value;

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          await addDoc(collection(db, 'appointments'), {
            studentName: userData.name,
            studentGrade: userData.grade,
            teacherName,
            message,
            date,
            time
          });
          document.getElementById('appointment-message').textContent = "Appointment booked successfully!";
        }
      } catch (error) {
        document.getElementById('appointment-message').textContent = `Error: ${error.message}`;
      }
    }
  });
});
