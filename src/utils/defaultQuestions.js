import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const defaultQuestions = {
  gk: [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris",
      category: "gk",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
      category: "gk",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: [
        "Vincent van Gogh",
        "Pablo Picasso",
        "Leonardo da Vinci",
        "Michelangelo",
      ],
      correctAnswer: "Leonardo da Vinci",
      category: "gk",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      correctAnswer: "Pacific Ocean",
      category: "gk",
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "Korea", "Japan", "Thailand"],
      correctAnswer: "Japan",
      category: "gk",
    },
  ],
  maths: [
    {
      question: "What is 15% of 200?",
      options: ["20", "30", "25", "35"],
      correctAnswer: "30",
      category: "maths",
    },
    {
      question: "If x + 5 = 12, what is x?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "7",
      category: "maths",
    },
    {
      question: "What is the square root of 144?",
      options: ["10", "11", "12", "13"],
      correctAnswer: "12",
      category: "maths",
    },
    {
      question: "What is the area of a rectangle with length 8 and width 5?",
      options: ["35", "40", "45", "50"],
      correctAnswer: "40",
      category: "maths",
    },
    {
      question: "What is 3² + 4²?",
      options: ["25", "24", "23", "22"],
      correctAnswer: "25",
      category: "maths",
    },
  ],
  science: [
    {
      question: "What is the chemical symbol for gold?",
      options: ["Ag", "Fe", "Au", "Cu"],
      correctAnswer: "Au",
      category: "science",
    },
    {
      question: "What is the process by which plants make their food?",
      options: ["Photosynthesis", "Respiration", "Digestion", "Absorption"],
      correctAnswer: "Photosynthesis",
      category: "science",
    },
    {
      question: "What is the smallest unit of matter?",
      options: ["Cell", "Atom", "Molecule", "Electron"],
      correctAnswer: "Atom",
      category: "science",
    },
    {
      question: "Which gas do plants absorb from the air?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correctAnswer: "Carbon Dioxide",
      category: "science",
    },
    {
      question: "What is the normal body temperature in Celsius?",
      options: ["35.5°C", "36.5°C", "37.5°C", "38.5°C"],
      correctAnswer: "37.5°C",
      category: "science",
    },
  ],
};

export const initializeDatabase = async () => {
  try {
    // Check if questions already exist for any category
    for (const categoryId in defaultQuestions) {
      const q = query(
        collection(db, "questions"),
        where("category", "==", categoryId)
      );
      const querySnapshot = await getDocs(q);

      // If no questions exist for this category, add them
      if (querySnapshot.empty) {
        const questions = defaultQuestions[categoryId];
        for (const question of questions) {
          await addDoc(collection(db, "questions"), question);
          console.log(`Added question for ${categoryId}: ${question.question}`);
        }
      }
    }
    console.log("Database initialization completed");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

export default defaultQuestions;
