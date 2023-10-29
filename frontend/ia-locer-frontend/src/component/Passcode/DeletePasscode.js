import React, { useState } from 'react';
import axios from 'axios';

const DeletePasscodeComponent = () => {
    const [passcodeId, setPasscodeId] = useState(''); // State to hold passcode ID value

    const handleDeletePasscode = () => {
        axios.delete(`http://localhost:3001/deletePasscode/${passcodeId}`)
            .then(response => {
                console.log('Passcode deleted successfully!', response);
                // You can add further logic or state updates on successful deletion
            })
            .catch(error => {
                console.error('Failed to delete passcode', error);
                // Handle errors, show messages, etc.
            });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter Passcode ID to delete"
                value={passcodeId}
                onChange={(e) => setPasscodeId(e.target.value)}
            />
            <button onClick={handleDeletePasscode}>
                Delete Passcode
            </button>
        </div>
    );
};

export default DeletePasscodeComponent;
