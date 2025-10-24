import React from "react";//import
import "./Login.css";
import axios from 'axios'
export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Logging in...");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" required />
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