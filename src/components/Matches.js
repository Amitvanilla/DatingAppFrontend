import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../index.css';

const Matches = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        axios.get('/api/matches').then(response => {
            setMatches(response.data);
        });
    }, []);

    return (
        <div className={styles.container}>
            <h1>Matches</h1>
            {matches.map((match) => (
                <div key={match._id} className={styles.matchCard}>
                    <p className={styles.matchDetails}>From: {match.fromId}</p>
                    <p className={styles.matchDetails}>To: {match.toId}</p>
                    <p className={styles.matchDetails}>Matched On: {match.matchedOn}</p>
                </div>
            ))}
        </div>
    );
};

export default Matches;
