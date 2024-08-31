// import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import {BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom";
import Login from './pages/login';
import Register from './pages/Register';

function App() {
  const user=false;
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //        save to reload.
    //     </p>
    //   </header>
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={user?<Navigate to="/"/>:<Home/>}/>
        <Route path="/login" element={user?<Navigate to="/"/>:<Login/>}/>
        <Route path="/register" element={user?<Navigate to="/"/>:<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
