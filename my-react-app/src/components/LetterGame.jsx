import React, { useState, useEffect } from 'react';
import './LetterGame.css';
import backgroundImage from '../assets/Letter.svg';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const LetterGame = () => {
    const [typedLetters, setTypedLetters] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [keyFeedback, setKeyFeedback] = useState({});

    const word = 'HELLO';

    useEffect(() => {
        const handleKeyPress = (event) => {
            const { key } = event;
            if (alphabet.includes(key.toUpperCase())) {
                if (key.toUpperCase() === word[currentIndex]) {
                    setTypedLetters((prev) => prev + key.toUpperCase());
                    setCurrentIndex((prev) => prev + 1);
                } else {
                    setKeyFeedback((prev) => ({ ...prev, [key.toUpperCase()]: 'red' }));
                    setTimeout(() => setKeyFeedback((prev) => ({ ...prev, [key.toUpperCase()]: '' })), 2000);
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentIndex, word]);

    return (
        <div className="interactive-letter-game">
            <img src={backgroundImage} alt="Background" className="background-image" />
            <div className="letter-container">
                {alphabet.map((letter) => (
                    <button
                        key={letter}
                        className={`letter-box ${keyFeedback[letter]}`}
                    >
                        {letter}
                    </button>
                ))}
            </div>
            <div className="word-display">
                {word.split('').map((letter, index) => (
                    <span
                        key={index}
                        className={index < typedLetters.length ? 'correct' : 'white'}
                    >
                        {letter}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default LetterGame;
