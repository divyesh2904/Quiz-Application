import React, { useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, category } = location.state || {};

  useEffect(() => {
    const saveQuizHistory = async () => {
      try {
        const user = auth.currentUser;
        console.log("Current user:", user);
        console.log("Quiz data:", { score, total, category });

        if (user) {
          const quizData = {
            userId: user.uid,
            quizName: category.charAt(0).toUpperCase() + category.slice(1),
            score: score,
            totalQuestions: total,
            percentage: (score / total) * 100,
            date: serverTimestamp(),
          };

          console.log("Saving quiz data:", quizData);
          const docRef = await addDoc(collection(db, "quizHistory"), quizData);
          console.log("Quiz history saved with ID:", docRef.id);
        } else {
          console.log("No user logged in");
        }
      } catch (error) {
        console.error("Error saving quiz history:", error);
      }
    };

    if (score !== undefined && total !== undefined && category) {
      console.log("Saving quiz history...");
      saveQuizHistory();
    } else {
      console.log("Missing quiz data:", { score, total, category });
    }
  }, [score, total, category]);

  const percentage = (score / total) * 100;

  const getResultMessage = () => {
    if (percentage >= 80) return "Excellent! You're a master!";
    if (percentage >= 60) return "Good job! Keep it up!";
    if (percentage >= 40) return "Not bad, but there's room for improvement.";
    return "Keep practicing, you'll get better!";
  };

  const getResultColor = () => {
    if (percentage >= 80) return "#4caf50";
    if (percentage >= 60) return "#2196f3";
    if (percentage >= 40) return "#ff9800";
    return "#f44336";
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Quiz Results
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Category: {category.charAt(0).toUpperCase() + category.slice(1)}
        </Typography>
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            my: 3,
          }}
        >
          <CircularProgress
            variant="determinate"
            value={percentage}
            size={120}
            thickness={4}
            sx={{ color: getResultColor() }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" component="div" color="textPrimary">
              {Math.round(percentage)}%
            </Typography>
          </Box>
        </Box>
        <Typography variant="h5" gutterBottom>
          Score: {score}/{total}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: getResultColor(),
            my: 2,
          }}
        >
          {getResultMessage()}
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            onClick={() => navigate("/user")}
            sx={{ mr: 2 }}
          >
            Try Another Quiz
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(`/quiz/${category}`)}
          >
            Retry This Quiz
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Results;
