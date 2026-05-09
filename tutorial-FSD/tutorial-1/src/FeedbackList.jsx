import React from 'react';

function FeedbackList({ feedbacks }) {
  return (
    <div className="list-container">
      <h2 className="list-title">Recent Submissions</h2>
      
      {feedbacks.length === 0 ? (
        <div className="empty-state">
          <p>No feedback submitted yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <ul className="feedback-grid">
          {feedbacks.map((feedback, index) => (
            <li key={index} className="feedback-card" style={{ animationDelay: `${index * 0.1 + 0.3}s` }}>
              <p className="feedback-field"><strong>Name:</strong> {feedback.name}</p>
              <p className="feedback-field"><strong>Email:</strong> {feedback.email}</p>
              <p className="feedback-field"><strong>Contact:</strong> {feedback.contact}</p>
              <div className="feedback-message">
                "{feedback.message}"
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FeedbackList;