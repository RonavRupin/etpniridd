import React from "react";//import
import "./Login.css";
import axios from 'axios'
export default function Login() {
  // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  //   console.log("Logging in...");
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // TODO: This is where the integration is missing.
    // 1. Get the 'email' and 'password' from the form's state.
    // 2. Use 'axios' to send a POST request to the backend's login endpoint
    //    (e.g., 'http://localhost:5000/api/auth/login').
    // 3. Handle the response (e.g., save the token, redirect to dashboard).

    console.log("Logging in... (but not really, backend isn't called yet)");
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