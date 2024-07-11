import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../index.css';

const Messages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get('/api/messages').then(response => {
            setMessages(response.data);
        });
    }, []);

    return (
        <div className={styles.container}>
            <h1>Messages</h1>
            {messages.map((message) => (
                <div key={message._id} className={styles.messageCard}>
                    <p>From: {message.fromId}</p>
                    <p>To: {message.toId}</p>
                    {message.messages.map((msg, index) => (
                        <div key={index}>
                            <p className={styles.message}>{msg.message}</p>
                            <p className={styles.timeStamp}>{msg.timeStamp}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Messages;
