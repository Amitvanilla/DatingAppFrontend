// Messages.js
import React from 'react';
import '../index.css';

const Messages = ({ messages, onSelectMatch }) => {
    if (!messages || messages.length === 0) {
        return <div>No messages found.</div>;
    }

    return (
        <div className="messages-section">
            <h2>Messages</h2>
            <ul>
                {messages.map((message) => {
                    // Get the most recent message
                    const recentMessage = message.messages[message.messages.length - 1];

                    return (
                        <li key={message.id} className="message-card" onClick={() => onSelectMatch(message)}>
                            <img src={"https://i.imgur.com/Gg6BpGn.jpeg"} alt="Profile" className="message-image" />
                            <div className="message-info">
                                <strong>{message.fromId}</strong>: {recentMessage.message}
                                <span className="timestamp">{new Date(recentMessage.timeStamp).toLocaleString()}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Messages;
