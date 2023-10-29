import { React, useState } from 'react';
import './Card.css';
import axios from 'axios';

const Card = ({ title, content, imageUrl }) => {
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
    <div className="card">
      <img src={imageUrl} alt="" />
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{content}</p>
        <button className="button" onClick={generateCode}>
          Generate Code
        </button>
        <div className="card-codes">
          <text>{codesToString()}</text>
        </div>
      </div>
    </div>
  );
};

export default Card;
