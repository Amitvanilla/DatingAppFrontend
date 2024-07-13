// Matches.js
import React from 'react';
import '../index.css';

const Matches = ({ matches, onSelectMatch }) => {
    if (!matches || matches.length === 0) {
        return <div>No matches found.</div>;
    }

    return (
        <div className="matches-container">
            {matches.map((match) => (
                <div key={match.id} className="match-card" onClick={() => onSelectMatch(match)}>
                    <img src={"https://i.imgur.com/Gg6BpGn.jpeg"} alt="Profile" className="match-image" />
                    <div className="match-info">
                        <h4>{"match.fullName"}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Matches;
