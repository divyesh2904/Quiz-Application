import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import defaultQuestions from "../../utils/defaultQuestions";
import Timer from "../Timer";
import "./QuizPage.css";

const QuizPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        // Try to fetch questions from Firestore first
        const questionsQuery = query(
          collection(db, "questions"),
          where("category", "==", category)
        );
        const snapshot = await getDocs(questionsQuery);

        let loadedQuestions = [];
        if (!snapshot.empty) {
          loadedQuestions = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        } else {
          // If no questions in Firestore, use default questions
          loadedQuestions = defaultQuestions[category] || [];
        }

        // Limit to 5 questions
        loadedQuestions = loadedQuestions.slice(0, 5);
        setQuestions(loadedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Failed to load questions. Please try again later.");
        // Fallback to default questions on error
        const defaultCategoryQuestions = defaultQuestions[category] || [];
        setQuestions(defaultCategoryQuestions.slice(0, 5));
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category]);

  const handleTimeUp = () => {
    setTimeUp(true);
    handleAnswerSubmit(null);
  };

  const handleAnswerSubmit = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion,
        selectedAnswer: answer,
        isCorrect,
        timeUp: timeUp,
      },
    ]);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeUp(false);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeUp(false);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const handleFinishQuiz = () => {
    navigate("/results", {
      state: {
        score,
        total: questions.length,
        category,
        userAnswers,
      },
    });
  };

  if (loading) {
    return (
      <div className="quiz-container">
        <div className="loading">Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="error-message">
          No questions available for this category.
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="quiz-container">
        <h2>Quiz Results</h2>
        <div className="results-summary">
          <p>
            Your score: {score}/{questions.length}
          </p>
          <p>Percentage: {Math.round((score / questions.length) * 100)}%</p>
        </div>

        <div className="answers-review">
          {userAnswers.map((item, index) => (
            <div
              key={index}
              className={`answer-item ${
                item.isCorrect ? "correct" : "incorrect"
              }`}
            >
              <h3>
                Question {index + 1}: {item.question.question}
              </h3>
              <p>Your answer: {item.selectedAnswer || "No answer selected"}</p>
              {item.timeUp && <p className="time-up">Time's up!</p>}
              {!item.isCorrect && (
                <p className="correct-answer">
                  Correct answer: {item.question.correctAnswer}
                </p>
              )}
            </div>
          ))}
        </div>

        <button onClick={handleFinishQuiz} className="finish-button">
          Finish Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Quiz</h2>
        <p>
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
      </div>

      <Timer onTimeUp={handleTimeUp} questionIndex={currentQuestionIndex} />

      <div className="question-container">
        <h3>{currentQuestion.question}</h3>
        <div className="answers-container">
          {currentQuestion.options &&
            currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`answer-button ${
                  selectedAnswer === option ? "selected" : ""
                }`}
                onClick={() => setSelectedAnswer(option)}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            ))}
        </div>
      </div>

      <div className="quiz-controls">
        <button
          onClick={() => handleAnswerSubmit(selectedAnswer)}
          disabled={!selectedAnswer}
          className="submit-button"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
