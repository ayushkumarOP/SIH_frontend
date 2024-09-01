import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/login';
import Register from './pages/Register';
import { useState, useEffect } from 'react';
import History from './pages/History';
import ParticularHistory from './pages/History_particular';

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
        <Route 
          path="/history" 
          element={user ? <Navigate to="/home" /> : <History setUser={setUser} />} 
        />  
        <Route path="/particular_history" element={<ParticularHistory />} />
        
      </Routes>
    </Router>
  );
}

export default App;
