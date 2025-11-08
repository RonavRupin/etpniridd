import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from 'axios'
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // const handleSubmit = (e) => { ...
  // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  //   console.log("Logging in...");
const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Attempting to log in with:", email); // We use our new 'email' state

  try {
    // 1. Send the email and password (from state) to the backend
    const response = await axios.post(
      'http://localhost:5000/user/login', // This URL is confirmed by authRoutes.js
      {
        email: email,       // This comes from your useState
        password: password  // This also comes from your useState
      }
    );

    // 2. If it works, the backend sends back data.
    //    Based on authController.js, this will be response.data.data.token
    console.log('Login successful!', response.data);
 localStorage.setItem('token', response.data.data.token);
 navigate('/');

 
  } catch (error) {
    // This new 'catch' block is much smarter.

    if (error.response) {
      // The backend *did* respond, but with an error (401, 404, 500)
      console.error('Backend Error:', error.response.data);
      alert('Login Failed: ' + (error.response.data.message || 'Unknown error from backend.'));
    } else if (error.request) {
      // The request was *made*, but we got *no response*.
      // This is 99% a CORS error or the backend isn't running.
      console.error('Network Error:', error.request);
      alert('Login Failed: Cannot connect to server. Is the backend running? (Check CORS)');
    } else {
      // Something else went wrong setting up the request
      console.error('Frontend Error:', error.message);
      alert('Login Failed: ' + error.message);
    }
  }
};

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input 
  type="email" 
  name="email" 
  required 
  value={email} 
  onChange={(e) => setEmail(e.target.value)}
/>
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
  type="password" 
  name="password" 
  required 
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="switch-text">
          Don’t have an account?{" "}
          <a href="/signup" className="switch-link">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}