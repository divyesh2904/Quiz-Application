import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import UserDashboard from "./components/user/UserDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import QuizPage from "./components/user/QuizPage";
import Results from "./components/user/Results";
import AddQuiz from "./components/admin/AddQuiz";
import History from "./components/admin/History";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb", // Vibrant blue
      light: "#60a5fa",
      dark: "#1e40af",
    },
    secondary: {
      main: "#7c3aed", // Rich purple
      light: "#a78bfa",
      dark: "#5b21b6",
    },
    background: {
      default: "#f8fafc", // Light gray background
      paper: "#ffffff", // White for cards
    },
    text: {
      primary: "#1e293b", // Dark gray for main text
      secondary: "#64748b", // Medium gray for secondary text
    },
    success: {
      main: "#10b981", // Green for success states
    },
    error: {
      main: "#ef4444", // Red for errors
    },
    warning: {
      main: "#f59e0b", // Amber for warnings
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "8px 16px",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        },
      },
    },
  },
});

function App() {
  const [user, loading] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar isAuthenticated={!!user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/user/*"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/quiz/:category" element={<QuizPage />} />
          <Route path="/results" element={<Results />} />
          <Route path="/admin/add-quiz" element={<AddQuiz />} />
          <Route path="/admin/history" element={<History />} />
          <Route
            path="/user/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
