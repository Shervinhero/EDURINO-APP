import React, { useState, useEffect, useRef } from 'react';
import './Level_2.css'; // Assuming you want to use the same CSS as Level_2
import sun from '../assets/sun.svg';
import backgroundImage from '../assets/vergleisch.svg';
import buttonImage1 from '../assets/bigger.svg';
import buttonImage2 from '../assets/smaller.svg';
import buttonImage3 from '../assets/equal.svg';
import tryAgainImage from '../assets/Try-again.svg';
import correctImage from '../assets/Correct.svg';
import crossImage from '../assets/cross.svg';
import annyang from 'annyang';
import { useLocation } from 'wouter';

const Vergleisch = () => {
    const [clickedButton, setClickedButton] = useState(null);
    const [showTryAgain, setShowTryAgain] = useState(false);
    const [showCorrect, setShowCorrect] = useState(false);
    const [, setLocation] = useLocation();
    const hasSpokenOnce = useRef(false);

    useEffect(() => {
        greetAndListen();
        return () => {
            annyang.abort();
            annyang.removeCommands();
        };
    }, []);

    const greetAndListen = () => {
        if (!hasSpokenOnce.current) {
            speak('Are they bigger than each other or equal?');
            hasSpokenOnce.current = true;
        }

        annyang.start({ autoRestart: true, continuous: false });

        annyang.addCommands({
            'smaller': () => handleVoiceCommand(3, 'Hey, try again.'),
            'bigger': () => handleVoiceCommand(1, 'No, try again.'),
            'they are equal': () => handleVoiceCommand(2, 'Great job!'),
            'go last page': () => handleVoiceCommand(null, 'Going back to last page...', '/math-game'),
            'go back': () => handleVoiceCommand(null, 'Going back to last page...', '/math-game'),
            'next page': () => handleVoiceCommand(null, 'Going to next page...', '/level-2')
        });

        annyang.addCallback('result', function (phrases) {
            console.log('User said:', phrases[0]);
        });
    };

    const handleVoiceCommand = (buttonNumber, feedback, location) => {
        if (location) {
            setLocation(location);
        } else {
            speak(feedback);
            handleClick(buttonNumber);
        }
    };

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    const handleClick = (buttonNumber) => {
        setClickedButton(buttonNumber);
        if (buttonNumber === 2) {
            setShowCorrect(true);
            setTimeout(() => {
                setShowCorrect(false);
                setTimeout(() => {
                    setLocation('/level-2');
                }, 1000);
            }, 1500);
        } else {
            setShowTryAgain(true);
            setTimeout(() => {
                setShowTryAgain(false);
                setClickedButton(null);
            }, 1500);
        }
    };

    const goToMainPage = () => {
        setLocation('/');
    };

    return (
        <div className="level2-game">
            <img src={backgroundImage} alt="Vergleisch Background" className="background-image" />
            <div className="button-container-l2">
                <button
                    className={`image-button-l2 ${clickedButton === 1 ? 'red' : ''}`}
                    onClick={() => handleClick(1)}
                >
                    <img src={buttonImage1} alt="Button 1" className="button-image-l2" />
                </button>
                <button
                    className={`image-button-l2 ${clickedButton === 2 ? 'green' : clickedButton && clickedButton !== 2 ? 'red' : ''}`}
                    onClick={() => handleClick(2)}
                >
                    <img src={buttonImage3} alt="Button 2" className="button-image-l2" />
                </button>
                <button
                    className={`image-button-l2 ${clickedButton === 3 ? 'red' : ''}`}
                    onClick={() => handleClick(3)}
                >
                    <img src={buttonImage2} alt="Button 3" className="button-image-l2" />
                </button>
                {showTryAgain && (
                    <div className="try-again-container-l2">
                        <img src={tryAgainImage} alt="Try Again" className="try-again-image-l2" />
                    </div>
                )}
                {showCorrect && (
                    <div className="correct-container-l2">
                        <img src={correctImage} alt="Correct" className="correct-image-l2" />
                    </div>
                )}
                <div className="image-container-l2">
                    <img src={sun} alt="Sun" className="sun-image-l2" />
                </div>
                <div className="cross-container2222" onClick={goToMainPage}>
                    <img src={crossImage} alt="Cross" className="cross-image2222" />
                </div>
            </div>
        </div>
    );
};

export default Vergleisch;
