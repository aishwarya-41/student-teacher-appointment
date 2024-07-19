import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { app } from "../js/firebaseConfig.js";

const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const q = query(collection(db, 'appointments'), where("teacherName", "==", userData.name));
      const querySnapshot = await getDocs(q);
      const appointmentsContainer = document.getElementById('appointments');
      appointmentsContainer.innerHTML = '';

      querySnapshot.forEach((doc) => {
        const appointment = doc.data();
        const appointmentElement = document.createElement('div');
        appointmentElement.textContent = `${appointment.date} ${appointment.time} - ${appointment.studentName} (Grade: ${appointment.studentGrade}) - ${appointment.message}`;
        appointmentsContainer.appendChild(appointmentElement);
      });
    }
  }
});
