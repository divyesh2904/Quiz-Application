const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

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
const db = getFirestore(app);

const programmingQuestions = [
  {
    question: "What is the correct way to declare a variable in JavaScript?",
    options: ["var x = 5;", "variable x = 5;", "v x = 5;", "x := 5;"],
    correctAnswer: "var x = 5;",
    category: "programming"
  },
  {
    question: "Which programming language is known as the 'mother of all languages'?",
    options: ["Java", "C", "Python", "Assembly"],
    correctAnswer: "C",
    category: "programming"
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    correctAnswer: "Hyper Text Markup Language",
    category: "programming"
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["//", "/*", "#", "--"],
    correctAnswer: "//",
    category: "programming"
  },
  {
    question: "What is the purpose of CSS?",
    options: [
      "To style and format web pages",
      "To create database queries",
      "To handle server-side logic",
      "To manage user authentication"
    ],
    correctAnswer: "To style and format web pages",
    category: "programming"
  }
];

async function addProgrammingQuestions() {
  try {
    const quizCollection = collection(db, 'quizzes');
    
    for (const question of programmingQuestions) {
      await addDoc(quizCollection, question);
      console.log('Added question:', question.question);
    }
    
    console.log('Successfully added all programming questions!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding questions:', error);
    process.exit(1);
  }
}

addProgrammingQuestions();
