// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignOut = () => {
    // Sign out and navigate to the landing page
    signOut();
    navigate('/');
  };

  return (
    <nav className='navbar'>
      <ul>
        {user && user.role === 'Admin' ? (
          <li><Link to="/AdminDashboard">Admin Dashboard</Link></li>
        ) : (
          <li><Link to="/">Home</Link></li>
        )}

        <li><Link to="/about">About</Link></li>

        <li style={{ marginLeft: 'auto' }}>
          {user ? (
            <button className="sign-out-button" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
