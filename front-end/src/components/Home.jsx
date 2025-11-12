import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; 

export default function Home() {
  const navigate = useNavigate();

  // --- EXISTING STATE ---
  const [chatMessage, setChatMessage] = useState(""); 
  const [chatHistory, setChatHistory] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const [userName, setUserName] = useState("User"); 
  
  // === NEW MOOD TRACKER STATE ===
  const [mood, setMood] = useState(3); // Default mood rating (1-5)
  const [moodNote, setMoodNote] = useState(""); // Optional note
  const [moodHistory, setMoodHistory] = useState([]); // To store all mood logs
  const [lastMood, setLastMood] = useState(null); // To display on the dashboard
  // ==============================

  // --- FETCH USER DATA ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

    // 1. Fetch User's Profile
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/profile', authHeaders);
        setUserName(response.data.data.name); 
      } catch (error) {
        console.error("Failed to fetch profile", error);
        localStorage.removeItem('token'); 
        navigate('/login');
      }
    };

    // === 2. NEW: Fetch Mood History ===
    const fetchMoods = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/moods', authHeaders);
        setMoodHistory(response.data.data);
        if (response.data.data.length > 0) {
          // Save the most recent mood to state
          setLastMood(response.data.data[0]); 
        }
      } catch (error) {
        console.error("Failed to fetch moods", error);
      }
    };
    // ==================================

    fetchProfile();
    fetchMoods(); // Call the new function
    
  }, [navigate]);
  // ----------------------------------------------

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // --- CHATBOT SUBMIT ---
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (chatMessage.trim() === "") return; 
    const token = localStorage.getItem('token');
    // ... (rest of your chat submit code) ...
    const newUserMessage = { sender: 'user', text: chatMessage };
    setChatHistory(prev => [...prev, newUserMessage]);
    setChatMessage(""); 
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/user/chat',
        { message: chatMessage, history: chatHistory }, 
        { headers: { Authorization: `Bearer ${token}` } } 
      );
      const aiMessage = { sender: 'ai', text: response.data.message };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage = { sender: 'ai', text: "Sorry, I'm having trouble connecting. Please try again." };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  // -------------------------------

  // === NEW: MOOD LOG SUBMIT ===
  const handleMoodSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert("You are not logged in.");
      navigate('/login');
      return;
    }

    try {
      // 1. Send the new mood to the backend
      const response = await axios.post(
        'http://localhost:5000/api/moods',
        { 
          mood: mood,
          note: moodNote
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // 2. Update the UI immediately
      alert("Mood logged successfully!");
      setMoodNote(""); // Clear the note
      
      // 3. Add the new mood to the top of our lists
      const newMoodLog = response.data.data;
      setMoodHistory(prev => [newMoodLog, ...prev]);
      setLastMood(newMoodLog);

    } catch (error) {
      console.error("Mood logging failed:", error);
      alert("Failed to log mood: " + error.response.data.message);
    }
  };
  // ============================

  // Dummy data
  const academicStatus = "Good Standing";
  // We don't need the old 'moodLevel' dummy data

  return (
    <div className="home-container">
      
      <header className="home-header">
        <h1>Student Wellbeing Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        
        {/* === UPDATED: Integrated Dashboard === */}
        <section className="integrated-dashboard card">
          <h2>Welcome, {userName}!</h2>
          <p>This is your central hub for academic and mental wellbeing.</p>
          <div className="status-grid">
            <div className="status-item">
              <strong>Academic Status:</strong>
              <span>{academicStatus}</span>
            </div>
            <div className="status-item">
              <strong>Last Mood Log:</strong>
              {/* This now shows REAL data from our 'lastMood' state */}
              <span>
                {lastMood ? `${lastMood.mood}/5` : 'No logs yet'}
              </span>
            </div>
          </div>
        </section>
        {/* =================================== */}

        <section className="chatbot-section card">
          {/* Your chatbot UI goes here - no changes needed */}
          <h2>AI Emotional Support Chatbot</h2>
          <div className="chat-window">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message ai loading">
                <p>...</p> 
              </div>
            )}
          </div>
          <form className="chat-input-form" onSubmit={handleChatSubmit}>
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button type="submit" className="chat-btn" disabled={isLoading}>
              Send
            </button>
          </form>
        </section>

        <section className="features-grid">
          
          {/* === UPDATED: Mood Tracker Feature === */}
          <div className="feature-card card">
            <h3>Mood Tracker</h3>
            <p>Log your daily mood and see your trends over time.</p>
            
            {/* This is the new form that logs the mood */}
            <form onSubmit={handleMoodSubmit} className="mood-form">
              <div className="mood-input-group">
                <label>How are you feeling? (1-5)</label>
                <select 
                  value={mood} 
                  onChange={(e) => setMood(Number(e.target.value))}
                >
                  <option value={1}>1 (Awful)</option>
                  <option value={2}>2 (Bad)</option>
                  <option value={3}>3 (Okay)</option>
                  <option value={4}>4 (Good)</option>
                  <option value={5}>5 (Great)</option>
                </select>
              </div>
              
              <div className="mood-input-group">
                <label>Add a short note (optional)</label>
                <input 
                  type="text"
                  placeholder="e.g., Finished my assignment!"
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                />
              </div>
              
              <button type="submit" className="mood-log-btn">Log Today's Mood</button>
            </form>
          </div>
          {/* =================================== */}

          <div className="feature-card card">
            <h3>Study Plans</h3>
            <p>Get study plans based on your wellbeing and academic data.</p>
            <button disabled>View Plans</button> {/* Disabled for now */}
          </div>

          <div className="feature-card card">
            <h3>Calmness & Breaks</h3>
            <p>Take a guided meditation or a short break exercise.</p>
            <button disabled>Take a Break</button> {/* Disabled for now */}
          </div>
        </section>
      </main>
    </div>
  );
}