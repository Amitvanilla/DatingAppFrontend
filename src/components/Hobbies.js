import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../index.css';

const Hobbies = () => {
    const [hobbies, setHobbies] = useState([]);

    useEffect(() => {
        axios.get('/api/hobbies').then(response => {
            setHobbies(response.data);
        });
    }, []);

    return (
        <div className={styles.container}>
            <h1>Hobbies</h1>
            {hobbies.map((hobby) => (
                <div key={hobby._id} className={styles.hobbyCard}>
                    <p>User ID: {hobby.userId}</p>
                    <ul className={styles.hobbyList}>
                        {hobby.hobbies.map((h, index) => (
                            <li key={index} className={styles.hobbyItem}>{h}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Hobbies;
