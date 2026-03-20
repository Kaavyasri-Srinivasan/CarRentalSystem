import React, { useState, useEffect } from 'react';
import './Feedback.css';

const FeedbackForm = ({ onSubmit }) => {
  const [star, setStar] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carReg, setCarReg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clamp star rating between 1 and 5
    let safeStar = parseInt(star, 10);
    if (isNaN(safeStar) || safeStar < 1) safeStar = 1;
    if (safeStar > 5) safeStar = 5;
    onSubmit({
      car_model: carModel,
      car_reg_number: carReg,
      star_rating: safeStar,
      feedback,
      name
    });
    setStar(0);
    setHover(0);
    setFeedback('');
    setName('');
    setCarModel('');
    setCarReg('');
  };

  return (
    <form className="feedback-form-modern" onSubmit={handleSubmit}>
      <div className="feedback-field">
        <label htmlFor="carModel">Car Model</label>
        <input
          id="carModel"
          className="feedback-input-modern"
          type="text"
          placeholder="Enter car model"
          value={carModel}
          onChange={e => setCarModel(e.target.value)}
          required
        />
      </div>
      <div className="feedback-field">
        <label htmlFor="carReg">Car Registration Number</label>
        <input
          id="carReg"
          className="feedback-input-modern"
          type="text"
          placeholder="Enter registration number"
          value={carReg}
          onChange={e => setCarReg(e.target.value)}
          required
        />
      </div>
      <div className="feedback-field">
        <label>Star Rating</label>
        <div className="star-row-modern">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`star-modern ${i <= (hover || star) ? 'filled' : ''}`}
              onClick={() => setStar(i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="feedback-field">
        <label htmlFor="feedback">Your Feedback</label>
        <textarea
          id="feedback"
          className="feedback-textarea-modern"
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          required
        />
      </div>
      <div className="feedback-field">
        <label htmlFor="name">Your Name (optional)</label>
        <input
          id="name"
          className="feedback-input-modern"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <button className="feedback-submit-modern" type="submit">Submit</button>
    </form>
  );
};

const FeedbackCard = ({ feedback }) => (
  <div className="feedback-display-card">
    <div className="feedback-display-header">
      <span className="feedback-display-title">{feedback.car_model} ({feedback.car_reg_number})</span>
      <span className="feedback-display-stars">
        {[1,2,3,4,5].map(i => (
          <span key={i} className={`star-modern ${i <= feedback.star_rating ? 'filled' : ''}`}>★</span>
        ))}
      </span>
    </div>
    <div className="feedback-display-body">
      <div className="feedback-display-text">{feedback.feedback}</div>
      {feedback.name && <div className="feedback-display-name">- {feedback.name}</div>}
    </div>
  </div>
);

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3002/feedback')
      .then(res => res.json())
      .then(data => {
        setFeedbacks(Array.isArray(data) ? data : []);
      })
      .catch(() => setFeedbacks([]));
  }, []);
  const [showForm, setShowForm] = useState(false);

  // Optionally, you can POST new feedback to the backend here
  const handleAddFeedback = async (data) => {
    try {
      await fetch('http://localhost:3002/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      // Re-fetch feedbacks after successful post
      const res = await fetch('http://localhost:3002/feedback');
      const updated = await res.json();
      setFeedbacks(Array.isArray(updated) ? updated : []);
    } catch {
      // handle error (optional)
    }
    setShowForm(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <div className="feedback-bg">
      <div className="feedback-card-modern">
        <div className="feedback-header">
          <span className="feedback-icon">📝</span>
          <h2>Feedbacks</h2>
        </div>
        <div className="feedback-list">
          {feedbacks.length === 0 ? (
            <div className="feedback-success">No feedbacks yet. Be the first to add!</div>
          ) : (
            feedbacks.map((fb, idx) => (
              <FeedbackCard key={idx} feedback={fb} />
            ))
          )}
        </div>
        {showForm ? (
          <FeedbackForm onSubmit={handleAddFeedback} />
        ) : (
          <button className="feedback-plus-btn" onClick={handleShowForm} title="Add another feedback">
            ＋
          </button>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;