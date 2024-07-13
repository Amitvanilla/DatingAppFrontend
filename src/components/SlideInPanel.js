// SlideInPanel.js
import React from 'react';
import '../index.css';

const SlideInPanel = ({ isOpen, onClose, children }) => {
    return (
        <div className={`slide-in-panel ${isOpen ? 'open' : ''}`}>
            <div className="slide-in-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default SlideInPanel;
