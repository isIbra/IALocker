import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Make sure this points to the correct CSS file

function LandingPage() {
    const navigate = useNavigate();

    const handleReserveClick = () => {
        // Navigate to the sign-in page
        navigate('/signin');
    };

    return (
        <div className="background">
            <div className="title-container">
                <h1 className="title">iaLocker</h1>
            </div>
            <button className="reserve-button" onClick={handleReserveClick}>
                RESERVE YOUR LOCKER
            </button>
        </div>
    );
}


export default LandingPage;