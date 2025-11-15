import React, { useState, useEffect } from 'react';

import { useNavigate,Link } from 'react-router-dom';
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
  // new study task state
  const [studyTasks, setStudyTasks] = useState([]); // Holds all study tasks
  const [newTask, setNewTask] = useState("");
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
    // === 3. NEW: Fetch Study Tasks ===
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/study', authHeaders);
        setStudyTasks(response.data.data); // Save tasks to state
      } catch (error) {
        console.error("Failed to fetch study tasks", error);
      }
    };
    // ==================================

    fetchProfile();
    fetchMoods(); // Call the new function
    fetchTasks(); // <-- ADD THIS
    
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
  // === NEW: STUDY TASK HANDLERS ===

  // Creates a new task
  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.post(
        'http://localhost:5000/api/study',
        { task: newTask },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setStudyTasks(prev => [...prev, response.data.data]); // Add new task to state
      setNewTask(""); // Clear input
      
    } catch (error) {
      console.error("Failed to create task", error);
      alert("Failed to add task: " + error.response.data.message);
    }
  };

  // Toggles a task's "isCompleted" status
  const handleTaskToggle = async (id, currentStatus) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://localhost:5000/api/study/${id}`,
        { isCompleted: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update the task in our local state
      setStudyTasks(prev => 
        prev.map(task => 
          task._id === id ? response.data.data : task
        )
      );
      
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  // Deletes a task
  const handleTaskDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    const token = localStorage.getItem('token');
    
    try {
      await axios.delete(
        `http://localhost:5000/api/study/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Remove the task from our local state
      setStudyTasks(prev => prev.filter(task => task._id !== id));
      
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

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
  <span 
    className={
      !lastMood ? 'mood-none' :
      lastMood.mood <= 2 ? 'mood-low' :
      lastMood.mood === 3 ? 'mood-mid' :
      'mood-high'
    }
  >
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
            <h3>📊Mood Tracker</h3>
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

          
          {/* === UPDATED: Study Plans Feature === */}
          <div className="feature-card card">
            <h3>📝Study Plans (To-Do)</h3>
            <p>Add study tasks to stay organized.</p>
            
            {/* 1. The Form to Add New Tasks */}
            <form onSubmit={handleTaskSubmit} className="task-input-form">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="New study task..."
              />
              <button type="submit">+</button>
            </form>
            
            {/* 2. The List of Tasks */}
            <div className="task-list">
              {studyTasks.length === 0 ? (
                <p className="no-tasks">No tasks yet. Add one!</p>
              ) : (
                studyTasks.map(task => (
                  <div key={task._id} className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
                    <input 
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => handleTaskToggle(task._id, task.isCompleted)}
                    />
                    <span className="task-text">{task.task}</span>
                    <button 
                      onClick={() => handleTaskDelete(task._id)} 
                      className="delete-btn"
                    >
                      &times;
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* =================================== */}

          <div className="feature-card card">
            <h3>🧘Calmness & Breaks</h3>
            <p>Take a guided meditation or a short break exercise.</p>
            <Link to="/calm" className="feature-btn">
          Take a Break
        </Link>
          </div>
        </section>
      </main>
    </div>
  );
}