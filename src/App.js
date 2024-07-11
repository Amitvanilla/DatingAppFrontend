import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import Messages from './components/Messages';
import Matches from './components/Matches';
import Hobbies from './components/Hobbies';
import SwipeableProfiles from './components/SwipeableProfiles';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<SwipeableProfiles />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/matches" element={<Matches />} />
                    <Route path="/hobbies" element={<Hobbies />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
