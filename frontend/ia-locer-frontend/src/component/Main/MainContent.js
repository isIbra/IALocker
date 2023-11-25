import {React, useState} from 'react';
import './MainContent.css';
import axios from 'axios';

function MiddleSection({ name, dynamicContent, buttonText }) {
    const [codes, setCodes] = useState(['']);

    const generateCode = () => {
      axios
        .get('http://localhost:3001/passcode')
        .then((response) => {
          console.log('response: ', response.data);
          setCodes((oldCodes) => [...oldCodes, response.data]);
        })
        .catch((e) => console.log('error: ', e));
      return '';
    };
  
    // display codes
    const codesToString = () => {
      let string = '';
      codes.forEach((code) => {
        string = string + ' ' + code;
      });
      return string;
    };
  return (
    <div className="middle-section">
    <img src="/Images/safebox-svgrepo-com 1.svg" alt="Profile" className="profile-photo" />
    <div className="content-wrapper">
        <h2 className="name">{name}</h2>
        <div className="spacer"></div>
        <div className="dynamic-content"><text>{codesToString()}</text>
        </div>
      </div>
      <button className="show-password-button" onClick={generateCode}>
          Generate Code
        </button>
    </div>
  );
}

export default MiddleSection;
