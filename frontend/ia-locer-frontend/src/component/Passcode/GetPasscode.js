import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Passcode.css';

const GetPasscodesComponent = () => {
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
        <div>
            <h2>All Passcodes:</h2>
            <button onClick={handleFetch}>
                Get All Passcodes
            </button>
            <ul>
                {passcodes.map(passcode => (
                    <li key={passcode.id} className="passcode-item">
                        {passcode.passcode}
                        <button
                            onClick={() => handleDelete(passcode.id)}
                            className="passcode-delete-btn">
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetPasscodesComponent;
