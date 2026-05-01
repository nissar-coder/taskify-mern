import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import { userAuth } from "./Context/AuthContext";

function App() {
  const { user } = userAuth();



  return (
    <Routes>
      <Route 
        path="/" 
        element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route 
        path="/dashboard" 
        element={<Dashboard  />} 
      />
    </Routes>
  );
}

export default App;