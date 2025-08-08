import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeDatabase } from './utils/defaultQuestions';

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
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize the database with default questions and categories
initializeDatabase().catch(console.error);

export default app;
