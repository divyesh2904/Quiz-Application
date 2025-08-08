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

const defaultCategories = [
  {
    id: 'gk',
    name: 'General Knowledge',
    description: 'Test your knowledge about various general topics'
  },
  {
    id: 'maths',
    name: 'Mathematics',
    description: 'Challenge yourself with mathematical problems'
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Explore scientific concepts and theories'
  }
];

const defaultQuestions = {
  gk: [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris",
      category: "gk"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
      category: "gk"
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: "Leonardo da Vinci",
      category: "gk"
    }
  ],
  maths: [
    {
      question: "What is 15% of 200?",
      options: ["20", "30", "25", "35"],
      correctAnswer: "30",
      category: "maths"
    },
    {
      question: "If x + 5 = 12, what is x?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "7",
      category: "maths"
    },
    {
      question: "What is the square root of 144?",
      options: ["10", "11", "12", "13"],
      correctAnswer: "12",
      category: "maths"
    }
  ],
  science: [
    {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Fe", "Cu"],
      correctAnswer: "Au",
      category: "science"
    },
    {
      question: "Which gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correctAnswer: "Carbon Dioxide",
      category: "science"
    },
    {
      question: "What is the largest organ in the human body?",
      options: ["Heart", "Brain", "Liver", "Skin"],
      correctAnswer: "Skin",
      category: "science"
    }
  ]
};

async function setupDefaultCategories() {
  try {
    console.log('Adding default categories...');
    // Add categories
    for (const category of defaultCategories) {
      await addDoc(collection(db, 'categories'), category);
      console.log(`Added category: ${category.name}`);
    }

    console.log('\nAdding default questions...');
    // Add questions for each category
    for (const categoryId in defaultQuestions) {
      const questions = defaultQuestions[categoryId];
      for (const question of questions) {
        await addDoc(collection(db, 'questions'), question);
        console.log(`Added question for ${categoryId}: ${question.question}`);
      }
    }

    console.log('\nSetup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during setup:', error);
    process.exit(1);
  }
}

setupDefaultCategories();
