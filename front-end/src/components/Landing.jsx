import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'; 

export default function Landing() {
  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1 className="landing-title">Student Wellbeing Hub</h1>
        <p className="landing-subtitle">
          Your integrated space for tracking mental wellbeing and academic progress.
        </p>
        <p className="landing-description">
          Log your mood, manage study plans, and chat with our context-aware AI 
          assistant, all in one place.
        </p>
        <div className="landing-buttons">
          <Link to="/login" className="landing-btn login">Login</Link>
          <Link to="/signup" className="landing-btn signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}