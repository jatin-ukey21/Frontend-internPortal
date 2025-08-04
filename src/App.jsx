import React from 'react';
import {BrowserRouter  as Router,Route,Routes,Navigate} from 'react-router-dom';
import './App.css';
import LoginSignup from './pages/LoginSignup';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard'; 
import Layout from './components/Layout';
function App() {
  

  return (
    <Router>
      <div className='min-h-screen bg-gray-50'>
        <Routes>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="leaderboard" element={<Leaderboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
