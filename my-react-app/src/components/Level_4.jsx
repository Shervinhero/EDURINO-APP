import React, { useEffect, useRef, useState } from 'react';
import './Level_4.css';
import sun from '../assets/sun.svg';
import backgroundImage from '../assets/Level_4.svg';
import buttonImage1 from '../assets/bigger.svg';
import buttonImage2 from '../assets/smaller.svg';
import buttonImage3 from '../assets/equal.svg';
import tryAgainImage from '../assets/Try-again.svg';
import correctImage from '../assets/Correct.svg';
import crossImage from '../assets/cross.svg';
import annyang from 'annyang';
import { useLocation } from 'wouter';

const Level_4 = () => {
    const [clickedButton, setClickedButton] = useState(null);
    const [showTryAgain, setShowTryAgain] = useState(false);
    const [showCorrect, setShowCorrect] = useState(false);
    const [transitionClass, setTransitionClass] = useState('');
    const [, setLocation] = useLocation();
    const hasSpokenOnce = useRef(false);

    useEffect(() => {
        setupVoiceCommands();


        if (!hasSpokenOnce.current) {
            speak('The jelly fishes are, what do you think?');
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
                'smaller': () => handleVoiceCommand(1, 'Wow, correct answer.'),
                'bigger': () => handleVoiceCommand(3, 'Try again and see more.'),
                'they are equal': () => handleVoiceCommand(2, 'Not quite.'),
                'last page': () => handleVoiceCommand(null, 'Going back to the last page...', '/level-3'),
                'go back': () => handleVoiceCommand(null, 'Going back to the last page...', '/level-3')
            };

            annyang.addCommands(commands);

            // Optional: Add result and error callbacks for debugging
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
            setTransitionClass('transition-slide');
            setTimeout(() => {
                setLocation(location);
            }, 500);
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
                setTransitionClass('transition-slide');
                setTimeout(() => {
                    setLocation('/winpage');
                }, 500);
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
        setTransitionClass('transition-slide');
        setTimeout(() => {
            setLocation('/math-game');
        }, 500);
    };

    return (
        <div className={`level4-game ${transitionClass}`}>
            <img src={backgroundImage} alt="Level 4 Background" className="background-image" />
            <div className="button-container-55">
                <button
                    className={`image-button-55 ${clickedButton === 1 ? 'red' : ''}`}
                    onClick={() => handleClick(1)}
                >
                    <img src={buttonImage1} alt="Button 1" className="button-image-55" />
                </button>
                <button
                    className={`image-button-55 ${clickedButton === 2 ? 'green' : clickedButton && clickedButton !== 2 ? 'red' : ''}`}
                    onClick={() => handleClick(2)}
                >
                    <img src={buttonImage3} alt="Button 2" className="button-image-55" />
                </button>
                <button
                    className={`image-button-55 ${clickedButton === 3 ? 'red' : ''}`}
                    onClick={() => handleClick(3)}
                >
                    <img src={buttonImage2} alt="Button 3" className="button-image-55" />
                </button>
                {showTryAgain && (
                    <div className="try-again-container-55">
                        <img src={tryAgainImage} alt="Try Again" className="try-again-image-55" />
                    </div>
                )}
                {showCorrect && (
                    <div className="correct-container-55">
                        <img src={correctImage} alt="Correct" className="correct-image-55" />
                    </div>
                )}
                <div className="image-container-55">
                    <img src={sun} alt="Sun" className="sun-image-55" />
                </div>
                <div className="cross-container" onClick={goToMainPage}>
                    <img src={crossImage} alt="Cross" className="cross-image" />
                </div>
            </div>
        </div>
    );
};

export default Level_4;
