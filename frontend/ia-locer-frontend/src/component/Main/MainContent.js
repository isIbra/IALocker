import { React, useState, useEffect } from 'react';
import './MainContent.css';
import axios from 'axios';

function MiddleSection({ name, dynamicContent, buttonText, disabled }) {
  const [codes, setCodes] = useState(['']);

  // const generateCode = () => {
  //   axios
  //     .get('http://localhost:3001/passcode')
  //     .then((response) => {
  //       console.log('response: ', response.data);
  //       setCodes((oldCodes) => [...oldCodes, response.data]);
  //     })
  //     .catch((e) => console.log('error: ', e));
  //   return '';
  // };

  // // display codes
  // const codesToString = () => {
  //   let string = '';
  //   codes.forEach((code) => {
  //     string = string + ' ' + code;
  //   });
  //   return string;
  // };

  const [passcodes, setPasscodes] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (fetched) {
      fetchPasscodes();
      setFetched(false); // Reset the fetched state after fetching
    }
  }, [fetched]);

  const fetchPasscodes = () => {
    axios.get('http://localhost:3001/passcodes')
      .then(response => {
        setPasscodes(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch passcodes', error);
      });
  };

  const handleFetch = () => {
    setFetched(true);
  };

  const handleDelete = (passcodeId) => {
    axios.delete(`http://localhost:3001/deletePasscodeById/${passcodeId}`)
      .then(() => {
        setPasscodes(passcodes.filter(passcode => passcode.id !== passcodeId));
      })
      .catch(error => {
        console.error(`Failed to delete passcode with ID ${passcodeId}`, error);
      });
  };

  return (
    <div className="middle-section">
      <img src="/Images/safebox-svgrepo-com 1.svg" alt="Profile" className="profile-photo" />
      <div className="content-wrapper">
        <h2 className="name">{name}</h2>
        <div className="spacer"></div>
        <div className='dynamic-contnet-container'>
          <ul className='dynamic-content'>
            {passcodes.map(passcode => (
              <li key={passcode.id} className="passcode-item">
                {passcode.passcode}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className='show-password-button' onClick={handleFetch}>
        {buttonText}
      </button>
    </div>
  );
}

export default MiddleSection;
