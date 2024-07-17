// SidebarTabs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Matches from './Matches';
import Messages from './Messages';
import SlideInChat from './SlideInChat';
import '../index.css';

const SidebarTabs = () => {
    const [activeTab, setActiveTab] = useState('matches');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [matches, setMatches] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/matches').then((response) => {
            setMatches(response.data);
        });

        axios.get('http://localhost:8080/api/messages').then((response) => {
            setMessages(response.data);
        });
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleMatchSelect = (match) => {
        setSelectedMatch(match)
        setIsChatOpen(true);

    };

    const handleMessagesSelect = (messages) => {
        setIsChatOpen(true)
    }

    const closeChat = () => {
        setIsChatOpen(false);
    };

    return (
        <div className="sidebar-tabs">
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'matches' ? 'active' : ''}`}
                    onClick={() => handleTabClick('matches')}
                >
                    Matches
                </button>
                <button
                    className={`tab ${activeTab === 'messages' ? 'active' : ''}`}
                    onClick={() => handleTabClick('messages')}
                >
                    Messages
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 'matches' && <Matches matches={matches} onSelectMatch={handleMatchSelect} />}
                {activeTab === 'messages' && <Messages messages={messages} onSelectMatch={handleMessagesSelect} />}
            </div>
            <SlideInChat isOpen={isChatOpen} onClose={closeChat} selectedMatch={selectedMatch} />
        </div>
    );
};

export default SidebarTabs;
