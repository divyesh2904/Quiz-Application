import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
  Button,
} from '@mui/material';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Get all results, ordered by timestamp (newest first)
        const resultsQuery = query(
          collection(db, 'results'),
          orderBy('timestamp', 'desc')
        );
        const resultsSnapshot = await getDocs(resultsQuery);
        const fetchedResults = [];
        
        resultsSnapshot.forEach(doc => {
          const data = doc.data();
          try {
            // Parse the completedAt date
            const completedAt = data.completedAt ? new Date(data.completedAt) : new Date(data.timestamp);
            
            fetchedResults.push({
              id: doc.id,
              ...data,
              formattedDate: completedAt.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })
            });
          } catch (error) {
            console.error('Error parsing date for result:', doc.id, error);
            // Still add the result even if date parsing fails
            fetchedResults.push({
              id: doc.id,
              ...data,
              formattedDate: 'Date not available'
            });
          }
        });
        
        console.log('Fetched results:', fetchedResults); // Debug log
        setResults(fetchedResults);
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">Quiz Results History</Typography>
          <Button variant="outlined" onClick={() => navigate('/admin')}>
            Back to Dashboard
          </Button>
        </Box>

        {results.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6">No quiz results found</Typography>
            <Typography variant="body1" color="textSecondary">
              There are no quiz results in the database yet.
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="center">Score</TableCell>
                  <TableCell align="center">Total Questions</TableCell>
                  <TableCell align="center">Percentage</TableCell>
                  <TableCell>Date & Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((result) => {
                  const percentage = ((result.score / result.totalQuestions) * 100).toFixed(1);
                  
                  return (
                    <TableRow key={result.id}>
                      <TableCell>{result.userName || 'Unknown User'}</TableCell>
                      <TableCell>{result.email || 'No Email'}</TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>
                        {result.category}
                      </TableCell>
                      <TableCell align="center">{result.score}</TableCell>
                      <TableCell align="center">{result.totalQuestions}</TableCell>
                      <TableCell align="center">{percentage}%</TableCell>
                      <TableCell>{result.formattedDate}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};

export default History;
