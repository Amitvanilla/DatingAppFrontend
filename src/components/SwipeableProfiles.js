// SwipeableProfiles.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSwipeable } from 'react-swipeable';
import SidebarTabs from './SidebarTabs';
import '../index.css';

const SwipeableProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState(null);
    const [selectedMatch, setSelectedMatch] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/users').then((response) => {
            setProfiles(response.data);
        });
    }, []);

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleSwipe = (direction) => {
        console.log(`Swiped ${direction}`);
        setSwipeDirection(direction);
        setTimeout(() => {
            setSwipeDirection(null);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
        }, 300);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('left'),
        onSwipedRight: () => handleSwipe('right'),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    const handleClick = (e) => {
        const { clientX } = e;
        const { innerWidth } = window;
        if (clientX < innerWidth / 2) {
            handleSwipe('left');
        } else {
            handleSwipe('right');
        }
    };

    if (profiles.length === 0) {
        return <div>Loading...</div>;
    }

    const currentProfile = profiles[currentIndex];
    const age = calculateAge(currentProfile.dob);

    return (
        <div className="main-container">
            <div className="profile-container" onClick={handleClick}>
                <div
                    {...handlers}
                    className={`profile-card ${swipeDirection === 'left' ? 'swipe-left' : ''} ${
                        swipeDirection === 'right' ? 'swipe-right' : ''
                    }`}
                >
                    <img src={currentProfile.imageUrl} alt="Profile" className="profile-image" />
                    <div className="profile-info">
                        <h1>{currentProfile.fullName}</h1>
                        <p>{age} years old</p>
                    </div>
                </div>
            </div>
            <div className="sidebar">
                <SidebarTabs onSelectMatch={setSelectedMatch} selectedMatch={selectedMatch} />
            </div>
        </div>
    );
};

export default SwipeableProfiles;
