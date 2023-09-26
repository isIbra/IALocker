import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
function App() {
  
  const [codes, setCodes] = useState([""]);

  // get code from backend
  const generateCode = ()  => {
    axios.get('http://localhost:3001/Passcode').then(response => {
      console.log('response: ', response.data);
      setCodes(oldCodes => [...oldCodes, response.data])
    }).catch(e => console.log('error: ', e))
    return '';
  }

  // display codes
  const codesToString = () => {
    let string = "";
    codes.forEach(code => {
      string = string + " " + code;
    })
    return string
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
        {/* <input type="text" name="name" /> */}
          <button onClick={generateCode}>Generate Code</button>
          <br/>
          <text>{codesToString()}</text>
        </div>
      </header>
    </div>
  );
}

export default App;
