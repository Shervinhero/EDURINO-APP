import React, { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import './winpage.css';
import annyang from 'annyang';

const WinPage = () => {
    const [, setLocation] = useLocation();
    const hasSpokenOnce = useRef(false);

    useEffect(() => {
        if (!hasSpokenOnce.current) {
            speak('Congratulations! Do you want to play again or go to the homepage?');
            hasSpokenOnce.current = true;
        }

        annyang.start({ autoRestart: true, continuous: false });

        annyang.addCommands({
            'play again': () => {
                speak('Sure! Let\'s play again.');
                setTimeout(() => {
                    setLocation('/vergleisch');
                }, 1000);
            },
            'homepage': () => {
                speak('Taking you to the homepage.');
                setTimeout(() => {
                    setLocation('/second-page');
                }, 1000);
            }
        });

        return () => {
            annyang.abort();
        };
    }, [setLocation]);

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    const handlePlayAgain = () => {
        setLocation('/vergleisch');
    };

    const handleHomePage = () => {
        setLocation('/second-page');
    };

    return (
        <div className="win-page">
            <div className="button-container-win">
                <button className="win-button" onClick={handlePlayAgain}>Play Again</button>
                <button className="win-button" onClick={handleHomePage}>Home Page</button>
            </div>
        </div>
    );
};

export default WinPage;
