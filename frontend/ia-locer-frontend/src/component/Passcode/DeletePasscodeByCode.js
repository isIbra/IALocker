import React, { useState } from 'react';
import axios from 'axios';
import './Passcode.css'

const DeletePasscodeByCodeComponent = () => {
    const [passcode, setPasscode] = useState(''); // State to hold passcode ID value

    const handleDeleteByCode = () => {
        axios.delete(`http://localhost:3001/deletePasscodeByCode/${passcode}`)
            .then(response => {
                console.log(`Passcode number ${passcode} has been deleted successfuly`);
            })
            .catch(error => {
                console.error(`Failed to delete passcode with ID ${passcode}`, error);
            });
    };

    return (
        <div>
            <input
                className='Delete-Passcode-input'
                type="text"
                placeholder="Enter Passcode to delete"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
            />
            <button className='Delete-Passcode-Button' onClick={handleDeleteByCode}>
                Delete
            </button>
        </div>
    );
};

export default DeletePasscodeByCodeComponent;
