import React, { useState } from 'react';
import axios from 'axios';

 const DeletePasscodeByIdComponent = () => {
    const [passcodeId, setPasscodeId] = useState(''); // State to hold passcode ID value

    const handleDeleteByIdPasscode = () => {
        axios.delete(`http://localhost:3001/deletePasscodeById/${passcodeId}`)
            .then(response => {
                console.log(`Passcode with ID ${passcodeId} deleted successfully!`, response);
            })
            .catch(error => {
                console.error(`Failed to delete passcode with ID ${passcodeId}`, error);
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
            <button onClick={handleDeleteByIdPasscode}>
                Delete Passcode
            </button>
        </div>
    );
};

export default DeletePasscodeByIdComponent;
