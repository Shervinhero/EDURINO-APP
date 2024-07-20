import React, { useEffect, useRef, useState } from 'react';
import './Level_3.css';
import sun from '../assets/sun.svg';
import backgroundImage from '../assets/Level_3.svg';
import buttonImage1 from '../assets/bigger.svg';
import buttonImage2 from '../assets/smaller.svg';
import buttonImage3 from '../assets/equal.svg';
import tryAgainImage from '../assets/Try-again.svg';
import correctImage from '../assets/Correct.svg';
import crossImage from '../assets/cross.svg';
import annyang from 'annyang';
import { useLocation } from 'wouter';

const Level_3 = () => {
    const [clickedButton, setClickedButton] = useState(null);
    const [showTryAgain, setShowTryAgain] = useState(false);
    const [showCorrect, setShowCorrect] = useState(false);
    const [, setLocation] = useLocation();
    const hasSpokenOnce = useRef(false);

    useEffect(() => {
        setupVoiceCommands();

        if (!hasSpokenOnce.current) {
            speak('Are the carrots bigger or smaller?');
            hasSpokenOnce.current = true;
        }


        annyang.start({ autoRestart: true, continuous: false });


        return () => {
            annyang.abort();
            annyang.removeCommands();
        };
    }, []);

    const setupVoiceCommands = () => {
        if (annyang) {
            const commands = {
                'smaller': () => handleVoiceCommand(1, 'Nice, you did it.'),
                'bigger': () => handleVoiceCommand(3, 'Hey, try again.'),
                'they are equal': () => handleVoiceCommand(2, 'No, look.'),
                'equal': () => handleVoiceCommand(2, 'No, look.'),
                'go last page': () => handleVoiceCommand(null, 'Going back to the last page...', '/vergleisch'),
                'go back': () => handleVoiceCommand(null, 'Going back to the last page...', '/level-2'),
                'next page': () => handleVoiceCommand(null, 'Going to the next page...', '/level-4')
            };

            annyang.addCommands(commands);
            annyang.addCallback('result', function (phrases) {
                console.log('User said:', phrases[0]);
            });
            annyang.addCallback('error', function (error) {
                console.error('Annyang error:', error);
            });
        } else {
            console.error('Annyang is not available.');
        }
    };

    const handleVoiceCommand = (buttonNumber, feedback, location = null) => {
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
        if (buttonNumber === 1) {
            setShowCorrect(true);
            setTimeout(() => {
                setShowCorrect(false);
                setTimeout(() => {
                    setLocation('/level-4');
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
        <div className="level-3">
            <img src={backgroundImage} alt="Level 3 Background" className="background-image" />
            <div className="button-container22">
                <button
                    className={`image-button ${clickedButton === 1 ? 'red' : ''}`}
                    onClick={() => handleClick(1)}
                >
                    <img src={buttonImage1} alt="Button 1" className="button-image" />
                </button>
                <button
                    className={`image-button ${clickedButton === 2 ? 'green' : clickedButton && clickedButton !== 2 ? 'red' : ''}`}
                    onClick={() => handleClick(2)}
                >
                    <img src={buttonImage3} alt="Button 2" className="button-image" />
                </button>
                <button
                    className={`image-button ${clickedButton === 3 ? 'red' : ''}`}
                    onClick={() => handleClick(3)}
                >
                    <img src={buttonImage2} alt="Button 3" className="button-image" />
                </button>
                {showTryAgain && (
                    <div className="try-again-container22">
                        <img src={tryAgainImage} alt="Try Again" className="try-again-image22" />
                    </div>
                )}
                {showCorrect && (
                    <div className="correct-container22">
                        <img src={correctImage} alt="Correct" className="correct-image22" />
                    </div>
                )}
                <div className="cross-containerlevel3" onClick={goToMainPage}>
                    <img src={crossImage} alt="Cross" className="cross-imagelevel3" />
                </div>
                <div className="image-container22">
                    <img src={sun} alt="Sun" className="sun-image22" />
                </div>
            </div>
        </div>
    );
};

export default Level_3;
