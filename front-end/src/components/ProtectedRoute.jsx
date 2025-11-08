import React from 'react';
import { Navigate } from 'react-router-dom';

// This component is a "wrapper"
// It will receive the component to protect as "children"
const ProtectedRoute = ({ children }) => {

  // Check for the "key" in the browser's storage
  const token = localStorage.getItem('token');

  if (token) {
    // If the key exists, show the page they asked for
    return children;
  }

  // If no key, "navigate" them back to the login page
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;