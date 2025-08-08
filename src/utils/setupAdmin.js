const { auth, db } = require('../firebase');
const { createUserWithEmailAndPassword } = require('firebase/auth');
const { doc, setDoc } = require('firebase/firestore');

const setupAdmin = async () => {
  try {
    // Create admin user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      'admin@quizapp.com',
      'Admin@123'
    );

    // Set admin role in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: 'admin@quizapp.com',
      role: 'admin',
      createdAt: new Date().toISOString()
    });

    console.log('Admin account created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  }
};

module.exports = setupAdmin;
