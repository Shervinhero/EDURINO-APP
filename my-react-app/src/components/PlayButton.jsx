import React from 'react';
import './PlayButton.css';

const PlayButton = ({ onClick }) => (
    <button className="play-button" onClick={onClick}>
        ▶
    </button>
);

export default PlayButton;
