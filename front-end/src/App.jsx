
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute"; // 1. Import the bouncer

export default function App() {
  return (
    <Router>
      <Routes>
        {/*
          This route is now protected.
          The <ProtectedRoute> will check for a token.
          If it's there, it will show <Home />.
          If not, it will redirect to /login.
        */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />

        {/* These routes are for guests */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}