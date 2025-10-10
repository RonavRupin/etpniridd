// --- Import libraries ---
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// --- Middleware ---
app.use(cors()); // allows frontend to talk to backend
app.use(express.json()); // allows JSON body in POST requests

// --- Temporary mock database ---
let users = [
  { username: 'pooja', password: '1234' },
];

// --- Routes ---

// Test route
app.get('/', (req, res) => {
  res.send('Backend connected successfully!');
});

// Register route
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const existing = users.find(u => u.username === username);
  if (existing) {
    return res.json({ success: false, message: 'Username already exists!' });
  }

  // Save new user
  users.push({ username, password });
  res.json({ success: true, message: 'Registered successfully!' });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, message: 'Login successful!' });
  } else {
    res.json({ success: false, message: 'Invalid username or password' });
  }
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
