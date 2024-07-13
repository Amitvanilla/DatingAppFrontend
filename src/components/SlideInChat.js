// SlideInChat.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

const SlideInChat = ({ isOpen, onClose, selectedMatch }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (isOpen && selectedMatch) {
            axios.get(`http://localhost:8080/api/messages}`)
                .then(response => {
                    setMessages(response.data);
                })
                .catch(error => {
                    console.error("Error fetching messages:", error);
                });
        }
    }, [isOpen, selectedMatch]);

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            const message = {
                matchId: selectedMatch.id,
                text: newMessage,
                senderId: 'currentUserId', // Replace with the actual sender ID
                timestamp: new Date().toISOString()
            };
            axios.post('http://localhost:8080/api/messages', message)
                .then(response => {
                    setMessages([...messages, response.data]);
                    setNewMessage("");
                })
                .catch(error => {
                    console.error("Error sending message:", error);
                });
        }
    };

    return (
        <div className={`slide-in-chat ${isOpen ? 'open' : ''}`}>
            <div className="slide-in-chat-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                {selectedMatch ? (
                    <>
                        <h2>Chat with {selectedMatch.fullName}</h2>
                        <div className="messages-container">
                            {messages.map((message, index) => (
                                <div key={index} className={`message ${message.senderId === 'currentUserId' ? 'sent' : 'received'}`}>
                                    <p>{message.text}</p>
                                    <span className="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
                                </div>
                            ))}
                        </div>
                        <div className="message-input">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message"
                            />
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                    </>
                ) : (
                    <p>Select a match to start chatting</p>
                )}
            </div>
        </div>
    );
};

export default SlideInChat;
