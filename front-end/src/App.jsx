
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Home from "./components/Home";
// import ProtectedRoute from "./components/ProtectedRoute"; // 1. Import the bouncer
// import Calmness from "./components/Calmness"; // <--- 1. ADD THIS IMPORT

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         {/*
//           This route is now protected.
//           The <ProtectedRoute> will check for a token.
//           If it's there, it will show <Home />.
//           If not, it will redirect to /login.
//         */}
//         <Route 
//           path="/" 
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           } 
//         />
//         <Route 
//           path="/calm" 
//           element={<ProtectedRoute><Calmness /></ProtectedRoute>} 
//         />

//         {/* These routes are for guests */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//     </Router>
//   );
// }
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import all your components
import Landing from "./components/Landing"; // <--- NEW
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Calmness from "./components/Calmness";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/*
          PUBLIC ROUTES
          The "front door" (/) is now the public Landing page.
        */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/*
          PROTECTED ROUTES
          The dashboard/home is now at "/home".
        */}
        <Route 
          path="/home" 
          element={<ProtectedRoute><Home /></ProtectedRoute>} 
        />
        <Route 
          path="/calm" 
          element={<ProtectedRoute><Calmness /></ProtectedRoute>} 
        />
      </Routes>
    </Router>
  );
}