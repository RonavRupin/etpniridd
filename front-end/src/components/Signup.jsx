import React from "react";
import "./Signup.css";

export default function Signup() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up...");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input type="text" name="name" required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>

          <div className="input-group">
            <label>Gender</label>
            <select name="gender" required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" required />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="switch-text">
          Already have an account?{" "}
          <a href="/login" className="switch-link">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}