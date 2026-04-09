import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

<<<<<<< Updated upstream
import React from 'react'
import Login from './Pages/Login'
import './App.css'
=======
import Login from "./Pages/Login";
import OTPVerification from "./Pages/OTPVerification";
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/otp" element={<OTPVerification />} />
      </Routes>
    </Router>
  );
}

export default App;