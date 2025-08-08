import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

// Default categories that should always be available
const defaultCategories = [
  {
    id: "gk",
    name: "General Knowledge",
    description: "Test your knowledge about various general topics",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQr7Pt_0smqCDaTJuO0nBTgPfgvh0DrdwmiA&s",
  },
  {
    id: "maths",
    name: "Mathematics",
    description: "Challenge yourself with mathematical problems",
    image: "https://img.jagranjosh.com/imported/images/E/Articles/maths2.webp",
  },
  {
    id: "science",
    name: "Science",
    description: "Explore scientific concepts and theories",
    image:
      "https://www.eurokidsindia.com/blog/wp-content/uploads/2024/02/science-exhibitions.jpg",
  },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([...defaultCategories]);

  // Load additional categories from Firestore
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesCollection = collection(db, "categories");
        const snapshot = await getDocs(categoriesCollection);
        const loadedCategories = snapshot.docs.map((doc) => ({
          ...doc.data(),
          image:
            "https://img.freepik.com/free-vector/quiz-background-design_23-2147500018.jpg",
        }));

        // Combine default categories with loaded categories
        // Filter out any loaded categories that match default category IDs
        const additionalCategories = loadedCategories.filter(
          (loaded) => !defaultCategories.some((def) => def.id === loaded.id)
        );

        setCategories([...defaultCategories, ...additionalCategories]);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleStartQuiz = (categoryId) => {
    navigate(`/quiz/${categoryId}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 8 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 6,
          textAlign: "center",
          fontWeight: "bold",
          color: "text.primary",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "4px",
            backgroundColor: "primary.main",
            borderRadius: "2px",
          },
        }}
      >
        Choose a Quiz Category
      </Typography>

      <Grid
        container
        spacing={4}
        sx={{
          justifyContent: "center",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {categories.map((category) => (
          <Grid
            item
            xs={12}
            sm={6}
            key={category.id}
            sx={{
              display: "flex",
              maxWidth: "450px",
              width: "100%",
            }}
          >
            <Card
              sx={{
                width: "100%",
                height: "400px",
                display: "flex",
                flexDirection: "column",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={category.image}
                alt={category.name}
                sx={{
                  objectFit: "cover",
                  filter: "brightness(0.7)",
                  minHeight: "200px",
                  width: "100%",
                }}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  background:
                    "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",
                  color: "white",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: "bold",
                      mb: 2,
                      textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    {category.name}
                  </Typography>
                  <Typography
                    sx={{
                      opacity: 0.9,
                      lineHeight: 1.6,
                    }}
                  >
                    {category.description || `Take a quiz in ${category.name}`}
                  </Typography>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleStartQuiz(category.id)}
                  sx={{
                    bgcolor: "white",
                    color: "#2196f3",
                    py: 1.5,
                    mt: 2,
                    borderRadius: "8px",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.9)",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserDashboard;
