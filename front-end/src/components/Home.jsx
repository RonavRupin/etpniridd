
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Dummy data for the "Integrated Dashboard"
  const academicStatus = "Good Standing";
  const moodLevel = "4/5 (Feeling Good)";

  return (
    <div className="home-container">
      
      <header className="home-header">
        <h1>Student Wellbeing Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        
        {/* This is your "Integrated Dashboard" POC */}
        <section className="integrated-dashboard card">
          <h2>Welcome, Ronav!</h2>
          <p>This is your central hub for academic and mental wellbeing.</p>
          <div className="status-grid">
            <div className="status-item">
              <strong>Academic Status:</strong>
              <span>{academicStatus}</span>
            </div>
            <div className="status-item">
              <strong>Last Mood Log:</strong>
              <span>{moodLevel}</span>
            </div>
          </div>
        </section>

        {/* This is your AI Chatbot Requirement */}
        <section className="chatbot-section card">
          <h2>AI Emotional Support Chatbot</h2>
          <p>Feeling overwhelmed? Talk to our AI assistant for immediate, private support.</p>
          <div className="chatbot-placeholder">[Chatbot UI will go here]</div>
          <button className="chat-btn">Start Chatting</button>
        </section>

        <section className="features-grid">
          {/* This is your "Tracker" feature */}
          <div className="feature-card card">
            <h3>Mood Tracker</h3>
            <p>Log your daily mood and see your trends over time.</p>
            <button>Log Today's Mood</button>
          </div>

          {/* These are your other features */}
          <div className="feature-card card">
            <h3>Study Plans</h3>
            <p>Get study plans based on your wellbeing and academic data.</p>
            <button>View Plans</button>
          </div>

          <div className="feature-card card">
            <h3>Calmness & Breaks</h3>
            <p>Take a guided meditation or a short break exercise.</p>
            <button>Take a Break</button>
          </div>
        </section>

      </main>
    </div>
  );
}