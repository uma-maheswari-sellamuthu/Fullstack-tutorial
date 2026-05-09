import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';
import './App.css'; // Optional, you can remove this if you don't need default styling

function App() {
  // State to store all feedback entries
  const [feedbackList, setFeedbackList] = useState([]);

  // Function to receive new feedback from the form and add it to the state
  const handleAddFeedback = (newFeedback) => {
    setFeedbackList([...feedbackList, newFeedback]);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Student Feedback</h1>
        <p className="app-subtitle">We value your opinion to improve our courses</p>
      </header>
      
      <main className="main-content">
        {/* Render the Form and pass the function to add data */}
        <FeedbackForm addFeedback={handleAddFeedback} />
        
        <hr className="divider" />
        
        {/* Render the List and pass the stored data */}
        <FeedbackList feedbacks={feedbackList} />
      </main>
    </div>
  );
}

export default App;