import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate(); // Initialize useHistory

  const handleSignIn = async () => {
    try {
      // Send a POST request to your backend endpoint for sign-in
      const response = await axios.post('http://localhost:3001/signin', {
        email: email,
        password: password,
      });

      // Check the response from the server
      if (response.data.success) {
        console.log('Sign-in successful!');
        // Redirect to the home page upon successful sign-in
        history('/home');
      } else {
        console.log('Invalid email or password.');
        // Handle unsuccessful sign-in (e.g., display an error message)
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      // Handle other errors (e.g., network issues)
    }
  };

  return (
    <div className="sign-in-body">
      <div className="sign-in-container">
        <img src="/Images/safebox-svgrepo-com 1.svg" alt="Profile" className="signin-logo" />
        <p className='header'>Sign In</p>
        <p className='sub-header'>Login to your account</p>
        <form className="sign-in-form">
          <div className='signin-email-input'>
            <img src='/Images/mail-send-envelope--envelope-email-message-unopened-sealed-close.svg' alt='' className='sigin-icon' />
            <input
              placeholder='Email'
              className="sign-in-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='signin-Password-input'>
            <img src='Images/interface-login-key--entry-key-lock-login-pass-unlock.svg' alt='password icon' className='sigin-icon' />
            <input
              placeholder='Password'
              className="sign-in-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="sign-in-button" type="button" onClick={handleSignIn}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
