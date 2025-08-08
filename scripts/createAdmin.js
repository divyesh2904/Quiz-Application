const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyC-JSvlDOikCUGYrLW1nKhHgZohW1aiOMk",
  authDomain: "quiz-application-fd8d5.firebaseapp.com",
  projectId: "quiz-application-fd8d5",
  storageBucket: "quiz-application-fd8d5.firebasestorage.app",
  messagingSenderId: "128605692820",
  appId: "1:128605692820:web:d1edc9eb47862d9571a581",
  measurementId: "G-CY1K2BRWDC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function createAdmin() {
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
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
