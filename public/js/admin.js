// admin.js
document.addEventListener('DOMContentLoaded', () => {
  const roleForm = document.getElementById('role-form');
  if (roleForm) {
    roleForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('user-email').value;
      const newRole = document.getElementById('user-role').value;

      // Find user by email
      db.collection('users').where('email', '==', email).get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            throw new Error('User not found');
          }
          const userDoc = querySnapshot.docs[0];
          // Update user role
          return db.collection('users').doc(userDoc.id).update({ role: newRole });
        })
        .then(() => {
          console.log('User role updated');
          alert('User role updated successfully');
        })
        .catch((error) => {
          console.error('Error updating user role:', error.message);
          alert('Failed to update user role: ' + error.message);
        });
    });
  }
});
