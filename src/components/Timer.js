import React, { useState, useEffect } from "react";
import "./Timer.css";

const Timer = ({ onTimeUp, questionIndex }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(30);
  }, [questionIndex]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  // Calculate the percentage for the circular progress
  const percentage = (timeLeft / 30) * 100;

  return (
    <div className="timer-container">
      <div className={`timer-circle ${timeLeft <= 5 ? "timer-warning" : ""}`}>
        <svg className="timer-svg" viewBox="0 0 100 100">
          <circle className="timer-background" cx="50" cy="50" r="45" />
          <circle
            className="timer-progress"
            cx="50"
            cy="50"
            r="45"
            style={{
              strokeDasharray: `${percentage} 100`,
            }}
          />
        </svg>
        <span className="timer-text">{timeLeft}s</span>
      </div>
    </div>
  );
};

export default Timer;
