import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css'; // Make sure this points to the correct CSS file

function About() {
    const navigate = useNavigate();

    const handleReserveClick = () => {
        // Navigate to the sign-in page
        navigate('/signin');
    };

    return (
        <div className="background">
            <div className="about-title-container">
                <h1>What Is ialocker</h1>
                <div className='about-paragraph-container'>
                    <p>iaLocker project is an ingenious solution that combines technology and convenience to make college life easier and healthier for students.<br />
                        Using cutting-edge technology, students will reserve lockers effortlessly through this website  using React and powered by Node.js.<br />
                        The website feature a user-friendly interface that makes it easy for students to check locker availability and reserve lockers in a snap.<br />
                        Upon reservation, students will receive a unique code that they can use to access the locker, making it a hassle-free experience.
                    </p>
                </div>
                <div >
                    <h1>What Makes The iaLocker System Impressive?</h1>
                    <div>
                        <p className='about-paragraph-container'>What makes the iaLockers system even more impressive is that it is powered by an Arduino microcontroller, a device that is highly customizable and easy to program. <br />
                            The locker system is equipped with multiple sensors and cameras to ensure the maximum safety and security of students' belongings.<br />
                            Moreover, the system is designed to send real-time notifications to students' phones, keeping them updated on any changes or updates related to their locker reservation</p>
                    </div>
                </div>
            </div>
            <div className='down-section'>
                <div className='about-img'>
                    <img src='/Images/safebox-svgrepo-com 1.svg' alt='' />
                </div>

                <div className='about-contact-section'>
                    <p>For contact</p>
                    <div className='downsection-email-details1'>
                        <img src='/Images/mail-icon.svg' alt='' className='downsection-email-icon' />
                        <p>411103909@s.mu.edu.sa</p>
                    </div>
                    <div className='downsection-email-details2'>
                        <img src='/Images/mail-icon.svg' alt='' className='downsection-email-icon' />
                        <p>411103909@s.mu.edu.sa</p>
                    </div>
                </div>
            </div>
        </div >
    );
}


export default About;