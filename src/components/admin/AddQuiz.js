import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { db } from '../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Default categories that should always be available
const defaultCategories = [
  { id: 'gk', name: 'General Knowledge' },
  { id: 'maths', name: 'Mathematics' },
  { id: 'science', name: 'Science' }
];

const AddQuiz = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([...defaultCategories]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newCategory, setNewCategory] = useState({ id: '', name: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Load categories from Firestore
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'categories'));
      const loadedCategories = snapshot.docs.map(doc => ({
        id: doc.data().id || doc.id, // Use the stored ID or document ID
        name: doc.data().name
      }));

      // Combine default categories with loaded categories
      // Filter out any loaded categories that match default category IDs
      const additionalCategories = loadedCategories.filter(
        loaded => !defaultCategories.some(def => def.id === loaded.id)
      );

      setCategories([...defaultCategories, ...additionalCategories]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading categories:', error);
      setSnackbar({
        open: true,
        message: 'Error loading categories',
        severity: 'error'
      });
      setLoading(false);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add question to Firestore
      await addDoc(collection(db, 'questions'), {
        question,
        options,
        correctAnswer,
        category: category.toLowerCase() // Ensure category ID is lowercase
      });

      // Reset form
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswer('');
      setSnackbar({
        open: true,
        message: 'Question added successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error adding question:', error);
      setSnackbar({
        open: true,
        message: 'Error adding question. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleAddCategory = async () => {
    try {
      const categoryId = newCategory.id.toLowerCase(); // Ensure ID is lowercase
      
      // Add new category to Firestore
      await addDoc(collection(db, 'categories'), {
        id: categoryId,
        name: newCategory.name
      });

      // Reload categories to get the updated list
      await loadCategories();
      
      setOpenDialog(false);
      setNewCategory({ id: '', name: '' });
      setSnackbar({
        open: true,
        message: 'Category added successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error adding category:', error);
      setSnackbar({
        open: true,
        message: 'Error adding category. Please try again.',
        severity: 'error'
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Quiz Question
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            sx={{ mb: 3 }}
          />

          {options.map((option, index) => (
            <TextField
              key={index}
              fullWidth
              label={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
              sx={{ mb: 2 }}
            />
          ))}

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Correct Answer</InputLabel>
            <Select
              value={correctAnswer}
              label="Correct Answer"
              onChange={(e) => setCorrectAnswer(e.target.value)}
              required
            >
              {options.map((option, index) => (
                <MenuItem key={index} value={option} disabled={!option}>
                  {option || `Option ${index + 1}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setOpenDialog(true)}
            >
              Add New Category
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!question || options.some(opt => !opt) || !correctAnswer || !category}
            >
              Add Question
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Dialog for adding new category */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Category ID"
            value={newCategory.id}
            onChange={(e) => setNewCategory({ ...newCategory, id: e.target.value })}
            sx={{ mt: 2, mb: 2 }}
            helperText="Unique identifier (e.g., 'html', 'css')"
            required
          />
          <TextField
            fullWidth
            label="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            helperText="Display name (e.g., 'HTML', 'CSS')"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleAddCategory}
            disabled={!newCategory.id || !newCategory.name}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddQuiz;
