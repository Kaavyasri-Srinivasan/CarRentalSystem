import React from 'react';
import { useNavigate } from 'react-router-dom';
import './welcomepage.css';

const WelcomePage = ({ userName }) => {
  const navigate = useNavigate();

  const handleBrowseVehicles = () => {
    navigate("/cars");          // goes to CarListPage
  };

  const handleViewBookings = () => {
    navigate("/bookings");      // 👈 navigate to bookings page
  };

  const handleFeedback = () => {
    navigate("/feedback");      // 👈 navigate to feedback page
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="welcome-header">
          <h1>
            Welcome Back, <span className="user-name">{userName}</span>!
          </h1>
          <p>Ready for your next adventure?</p>
        </div>
        
        <div className="action-section">
          {/* ✅ Navigate to car list page */}
          <button className="primary-btn" onClick={handleBrowseVehicles}>
            Browse Vehicles
          </button>

          {/* ✅ Navigate to bookings page */}
          <button className="secondary-btn" onClick={handleViewBookings}>
            View My Bookings
          </button>

          {/* ✅ Navigate to feedback page */}
          <button className="secondary-btn" onClick={handleFeedback}>
            Feedback
          </button>
        </div>
        
        <div className="testimonial">
          <p>"The best car rental experience I've ever had!"</p>
          <p className="author">- Sarah J.</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
