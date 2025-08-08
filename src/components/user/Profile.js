import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import "./Profile.css";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        console.log("Current user in Profile:", user);

        if (!user) {
          setError("No user logged in");
          setLoading(false);
          return;
        }

        // Fetch user details
        setUserDetails({
          name: user.displayName,
          email: user.email,
        });

        // Fetch quiz history
        console.log("Fetching quiz history for user:", user.uid);
        const quizHistoryRef = collection(db, "quizHistory");

        // First try without ordering
        const baseQuery = query(
          quizHistoryRef,
          where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(baseQuery);
        console.log("Query snapshot size:", querySnapshot.size);

        const history = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Quiz history document:", data);
          history.push({
            id: doc.id,
            quizName: data.quizName,
            score: `${data.score}/${data.totalQuestions}`,
            percentage: Math.round(data.percentage),
            date: data.date?.toDate().toLocaleDateString() || "N/A",
          });
        });

        // Sort the history by date manually
        history.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });

        console.log("Processed quiz history:", history);
        setQuizHistory(history);
        setError(null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error loading quiz history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <p>
          If you just completed a quiz, please wait a moment and refresh the
          page.
        </p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="user-details">
        <h2>Profile Details</h2>
        <div className="detail-item">
          <span className="label">Name:</span>
          <span className="value">{userDetails?.name}</span>
        </div>
        <div className="detail-item">
          <span className="label">Email:</span>
          <span className="value">{userDetails?.email}</span>
        </div>
      </div>

      <div className="quiz-history">
        <h2>Quiz History</h2>
        {quizHistory.length === 0 ? (
          <p>No quiz history available</p>
        ) : (
          <div className="history-table">
            <table>
              <thead>
                <tr>
                  <th>Quiz Name</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {quizHistory.map((quiz) => (
                  <tr key={quiz.id}>
                    <td>{quiz.quizName}</td>
                    <td>{quiz.score}</td>
                    <td>{quiz.percentage}%</td>
                    <td>{quiz.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
