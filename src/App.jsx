import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/login';
import Register from './pages/Register';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    localStorage.removeItem("user"); 
    setUser(false);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/home" /> : <Login setUser={setUser} />} 
        />       
        <Route 
          path="/home" 
          element={user ? <Home /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
