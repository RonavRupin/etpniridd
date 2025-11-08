import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Home.css'; // We will create this file next

export default function Home() {
  const navigate = useNavigate(); // Initialize useNavigate

  // This function will handle logging out
  const handleLogout = () => {
    // 1. Remove the user's "key" (token) from storage
    localStorage.removeItem('token');

    // 2. Redirect the user back to the /login page
    navigate('/login');
  };

  return (
    <div className="home-container">

      <header className="home-header">
        <h1>Student Wellbeing Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <main className="dashboard-content">
        <div className="welcome-message">
          <h2>Welcome!</h2>
          <p>This is your personal dashboard. Track your mood or chat with our AI assistant.</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Mood Tracker</h3>
            <p>Go to your tracker</p>
          </div>

          <div className="feature-card">
            <h3>AI Chatbot</h3>
            <p>Chat with our AI assistant</p>
          </div>
        </div>
      </main>
    </div>
  );
}