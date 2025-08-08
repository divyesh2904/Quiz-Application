import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HistoryIcon from "@mui/icons-material/History";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const adminFeatures = [
    {
      title: "Add New Quiz",
      description: "Create new quizzes and questions for different categories",
      icon: <AddCircleOutlineIcon sx={{ fontSize: 40 }} />,
      path: "/admin/add-quiz",
      color: "#2196f3",
    },
    {
      title: "User History",
      description: "View quiz results and performance of all users",
      icon: <HistoryIcon sx={{ fontSize: 40 }} />,
      path: "/admin/history",
      color: "#4caf50",
    },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Admin Dashboard
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {adminFeatures.map((feature, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              sx={{
                height: "100%",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.02)",
                  transition: "transform 0.2s ease-in-out",
                },
              }}
              onClick={() => navigate(feature.path)}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      color: feature.color,
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    sx={{ color: feature.color }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography>{feature.description}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
