
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './Home.css'; 

export default function Home() {
  const navigate = useNavigate();

  // --- NEW CHATBOT STATE ---
  const [chatMessage, setChatMessage] = useState(""); // Holds the user's current typed message
  const [chatHistory, setChatHistory] = useState([]); // Holds the array of chat messages
  const [isLoading, setIsLoading] = useState(false); // For a simple loading indicator
  const [userName, setUserName] = useState("User"); // To store the user's name
  // -------------------------

  // --- NEW: Fetch User's Profile (for Context) ---
  // We'll use this to get the user's name for the welcome message
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Not logged in, kick to login
          return;
        }

        // Call the 'getProfile' endpoint we already built
        const response = await axios.get('http://localhost:5000/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUserName(response.data.data.name); // Store the user's name

      } catch (error) {
        console.error("Failed to fetch profile", error);
        localStorage.removeItem('token'); // Bad token, clear it
        navigate('/login');
      }
    };
    fetchProfile();
  }, [navigate]);
  // ----------------------------------------------

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // --- NEW: Handle Chat Submit ---
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (chatMessage.trim() === "") return; // Don't send empty messages

    const token = localStorage.getItem('token');
    if (!token) {
      alert("You are not logged in.");
      navigate('/login');
      return;
    }

    // 1. Add user's message to chat history immediately
    const newUserMessage = { sender: 'user', text: chatMessage };
    setChatHistory(prev => [...prev, newUserMessage]);
    setChatMessage(""); // Clear the input box
    setIsLoading(true);

    try {
      // 2. Send the message to the new backend endpoint
      const response = await axios.post(
        'http://localhost:5000/user/chat',
        { message: chatMessage,
          history: chatHistory
         }, // The message from our state
        { headers: { Authorization: `Bearer ${token}` } } // The "key"
      );

      // 3. Add the AI's response to chat history
      const aiMessage = { sender: 'ai', text: response.data.message };
      setChatHistory(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage = { sender: 'ai', text: "Sorry, I'm having trouble connecting. Please try again." };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false); // Stop the loading indicator
    }
  };
  // -------------------------------

  // Dummy data
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
        
        <section className="integrated-dashboard card">
          <h2>Welcome, {userName}!</h2> {/* <-- We now use the user's real name */}
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

        {/* --- THIS IS THE NEW CHATBOT UI --- */}
        <section className="chatbot-section card">
          <h2>AI Emotional Support Chatbot</h2>
          <p>Feeling overwhelmed? Talk to our AI assistant for immediate, private support.</p>
          
          <div className="chat-window">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message ai loading">
                <p>...</p> {/* Simple loading dots */}
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
        {/* ---------------------------------- */}

        <section className="features-grid">
          <div className="feature-card card">
            <h3>Mood Tracker</h3>
            <p>Log your daily mood and see your trends over time.</p>
            <button>Log Today's Mood</button>
          </div>
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