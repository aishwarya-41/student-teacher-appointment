// auth.js
document.addEventListener('DOMContentLoaded', () => {
  // Login form handling
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log('User logged in:', userCredential.user);
          // Fetch user role from Firestore
          return db.collection('users').doc(userCredential.user.uid).get();
        })
        .then((doc) => {
          if (doc.exists) {
            const userRole = doc.data().role;
            // Redirect based on user role
            if (userRole === 'student') {
              window.location.href = 'studentDashboard.html';
            } else if (userRole === 'teacher') {
              window.location.href = 'teacherDashboard.html';
            } else if (userRole === 'admin') {
              window.location.href = 'adminDashboard.html';
            }
          } else {
            console.error('No such document!');
          }
        })
        .catch((error) => {
          console.error('Error logging in:', error.message);
          alert('Login failed: ' + error.message);
        });
    });
  }

  // Register form handling
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;

      auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log('User registered:', userCredential.user);
          return db.collection('users').doc(userCredential.user.uid).set({
            email: email,
            role: 'student' // Default role
          });
        })
        .then(() => {
          console.log('User data saved to Firestore');
          // Redirect to student dashboard
          window.location.href = 'studentDashboard.html';
        })
        .catch((error) => {
          console.error('Error registering:', error.message);
          alert('Registration failed: ' + error.message);
        });
    });
  }
});
