import React, { useState } from 'react';
import axios from 'axios';

const AddPasscodeComponent = () => {
    const [passcode, setPasscode] = useState(''); // State to hold passcode value
    const [userId, setUserId] = useState(''); // State to hold user ID value

    const handleAddPasscode = () => {
        // Prepare the data to send to the server
        const passcodeData = {
            passcode: passcode,
            userId: userId || null, // Set userId to null if it's empty
        };

        axios.post('http://localhost:3001/addPasscode', passcodeData)
            .then(response => {
                console.log('Passcode added successfully!', response);
            })
            .catch(error => {
                console.error('Failed to add passcode', error);
            });
    };

    return (
        <div className='Add-Passcode-Container'>
            <input
                className='AddPasscode-input'
                type="text"
                placeholder="Enter Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
            />
            <input
                className='AddPasscode-input'
                type="text"
                placeholder="Enter User ID (Optional)"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <button className='AddPasscode-button' onClick={handleAddPasscode}>
                Add
            </button>
        </div>
    );
};

export default AddPasscodeComponent;
