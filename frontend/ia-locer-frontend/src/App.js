import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Routes/LandingPage/LandingPage';
import Home from './Routes/Home/Home';
import Navbar from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer';
import SignIn from './Routes/SignIn/SingIn';
import { AuthProvider } from './component/Auth/AuthContext';
import './App.css';
import AdminDashboard from './Routes/Admin/Home/AdminDash';
import About from './Routes/About/About';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path='/AdminDashboard' element={<AdminDashboard />} />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
