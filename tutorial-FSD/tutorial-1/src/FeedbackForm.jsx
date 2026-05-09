import React, { useState } from 'react';

function FeedbackForm({ addFeedback }) {
  // Utilizing state for the controlled form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: ''
  });

  // Updates state as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handles the submission of the form
  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    // Send the data up to the App component
    addFeedback(formData);
    
    // Clear the form fields after submission
    setFormData({
      name: '',
      email: '',
      contact: '',
      message: ''
    });
  };

  return (
    <div className="form-container">
      <div className="glass-panel">
        <h2 className="form-title">Submit Feedback</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label className="form-label">Student Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" placeholder="John Doe" />
          </div>

          <div className="form-group">
            <label className="form-label">Email ID</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" placeholder="john@example.com" />
          </div>

          <div className="form-group">
            <label className="form-label">Contact No.</label>
            <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required className="form-input" placeholder="+1 234 567 8900" />
          </div>

          <div className="form-group">
            <label className="form-label">Feedback Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} rows="4" required className="form-input" placeholder="Your feedback helps us improve..." />
          </div>

          <button type="submit" className="submit-btn">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;