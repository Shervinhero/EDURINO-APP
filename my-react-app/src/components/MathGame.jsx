import React, { useEffect, useRef } from 'react';
import './MathGame.css';
import sun from '../assets/sun.svg';
import backgroundImage from '../assets/back-3.svg';
import buttonImage1 from '../assets/hinz.svg';
import buttonImage2 from '../assets/verg.svg';
import buttonImage3 from '../assets/zahlen.svg';
import logoimage from '../assets/Logo.svg';
import annyang from 'annyang';
import { useLocation } from 'wouter';
import crossImage from '../assets/cross.svg';

const MathGame = () => {
    const [, setLocation] = useLocation();
    const hasSpokenOnce = useRef(false);

    useEffect(() => {
        greetAndListen();
    }, []);

    const greetAndListen = () => {
        if (!hasSpokenOnce.current) {
            speak('Wow, perfect choice!  choose the Game what you want?? ');
            hasSpokenOnce.current = true;
        }

        annyang.start({ autoRestart: true, continuous: false });

        annyang.addCommands({
            'compare': () => {
                speak('Great choice! Let\'s go to the compare page.');
                navigateTo('/vergleisch');
            },
            'candy': () => {
                speak('Sure! Let\'s go to the candy page.');
                navigateTo('/vergleisch');
            },
            'game vergleisch': () => {
                speak('Excellent! now we go to the vergleisch.');
                navigateTo('/vergleisch');
            },
            'at': () => {
                speak('Here you learn a lot!');
                navigateTo('/Hinz1');
            },
            'count': () => {
                speak('Here you learn a lot!');
                navigateTo('/count-game');
            },
            'Go to the last Page': () => {
                speak('sure, now we are in main!');
                navigateTo('/second-page');
            },
            'last Page': () => {
                speak('sure, now we are in main!');
                navigateTo('/second-page');
            },

        });

        annyang.addCallback('result', function (phrases) {
            console.log('User said:', phrases[0]);
        });
    };

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    const navigateTo = (path) => {
        setTimeout(() => {
            setLocation(path);
        }, 2000);
    };

    const goToMainPage = () => {
        setLocation('/second-page');
    };
    return (
        <div className="math-game">
            <div className="logo-container">
                <img src={logoimage} alt="logo" className="logo" />
            </div>
            <img src={backgroundImage} alt="Math Game Background" className="background-image" />
            <div className="button-container2">
                <button className="image-button" onClick={() => setLocation('/Hinz1')}>
                    <img src={buttonImage1} alt="Button 1" className="button-image" />
                </button>
                <button className="image-button" onClick={() => setLocation('/vergleisch')}>
                    <img src={buttonImage2} alt="Button 2" className="button-image" />
                </button>
                <button className="image-button" onClick={() => setLocation('/count-game')}>
                    <img src={buttonImage3} alt="Button 3" className="button-image" />
                </button>
                <div className="image-container">
                    <img src={sun} alt="Sun" className="sun-image rotating-image-container" />
                </div>
                <div className="cross-container9999" onClick={goToMainPage}>
                    <img src={crossImage} alt="Cross" className="cross-image9999" />
                </div>
            </div>
        </div>
    );
};

export default MathGame;
