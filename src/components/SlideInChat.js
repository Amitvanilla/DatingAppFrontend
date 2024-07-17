import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

const SlideInChat = ({ isOpen, onClose, selectedMatch }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (isOpen && selectedMatch) {
            // Fetch messages for the selected match
            axios.get(`http://localhost:8080/api/messages/${selectedMatch.fromId}/${selectedMatch.toId}`)
                .then(response => {
                    setMessages(response.data.messages);
                })
                .catch(error => {
                    console.error("Error fetching messages:", error);
                });
        }
    }, [isOpen, selectedMatch]);

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            const message = {
                fromId: 'user1', // Replace with the actual sender ID
                toId: selectedMatch.toId,
                messages: [
                    {
                        message: newMessage,
                        timeStamp: new Date().toISOString()
                    }
                ]
            };
            axios.post('http://localhost:8080/api/messages', message)
                .then(response => {
                    setMessages(prevMessages => [...prevMessages, response.data.messages[0]]);
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
                            {messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.fromId === 'currentUserId' ? 'sent' : 'received'}`}>
                                    <p>{msg.message}</p>
                                    <span className="timestamp">{new Date(msg.timeStamp).toLocaleTimeString()}</span>
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
