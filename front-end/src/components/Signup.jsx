import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Check if passwords match (client-side check)
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // 2. Send the data to the backend
      const response = await axios.post("http://localhost:5000/user/signup", {
        name: formData.name,
        email: formData.email,
        gender: formData.gender,
        password: formData.password,
      });

      // 3. Handle success
      console.log("Signup successful:", response.data);
      alert('Signup successful! ' + response.data.message);
      
      // TODO: Redirect to the /login page
      // (You can use 'useNavigate' hook from 'react-router-dom' for this)

    } catch (error) {
      // 4. Handle all possible errors
      if (error.response) {
        // The backend *did* respond, but with an error (e.g., "User already exists")
        console.error('Backend Error:', error.response.data);
        alert('Signup Failed: ' + (error.response.data.message || 'Unknown error from backend.'));
      } else if (error.request) {
        // The request was *made*, but we got *no response*.
        console.error('Network Error:', error.request);
        alert('Signup Failed: Cannot connect to server. Is the backend running?');
      } else {
        // Something else went wrong setting up the request
        console.error('Frontend Error:', error.message);
        alert('Signup Failed: ' + error.message);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
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