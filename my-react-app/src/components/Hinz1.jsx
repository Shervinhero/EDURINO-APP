import React, { useState, useEffect, useRef } from 'react';
import './hinz1.css';
import backgroundImage from '../assets/hinzz-back.svg';
import buttonImage1 from '../assets/bt-tv.svg';
import buttonImage2 from '../assets/bt-cam.svg';
import buttonImage3 from '../assets/Bt-2.svg';
import tryAgainImage from '../assets/Try-again.svg';
import correctImage from '../assets/Correct.svg';
import crossImage from '../assets/cross.svg';
import annyang from 'annyang';
import { useLocation } from 'wouter';

const Hinz1 = ({ history }) => {
    const [clickedButton, setClickedButton] = useState(null);
    const [showTryAgain, setShowTryAgain] = useState(false);
    const [showCorrect, setShowCorrect] = useState(false);
    const [, setLocation] = useLocation();
    const hasAskedQuestion = useRef(false);

    useEffect(() => {
        if (!hasAskedQuestion.current) {
            askQuestion();
            setupVoiceCommands();
            hasAskedQuestion.current = true;
        }
    }, []);

    const askQuestion = () => {
        speak("What is the answer to one plus one?");
    };

    const setupVoiceCommands = () => {
        if (annyang) {
            const commands = {
                'two': () => handleVoiceCommand(2, 'Great job!'),
                'camera': () => handleVoiceCommand(3, 'No, pay attention and try again.'),
                'TV': () => handleVoiceCommand(1, 'No, think more and try again.')
            };

            annyang.addCommands(commands);
            annyang.start({ autoRestart: true, continuous: false });
            annyang.addCallback('result', function(phrases) {
                console.log('Recognized phrase:', phrases[0]);
            });
        }
    };

    const handleVoiceCommand = (buttonNumber, feedback) => {
        console.log('Handling voice command for button:', buttonNumber);
        speak(feedback);
        handleClick(buttonNumber);
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
                    setLocation('/hinz2');
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
        <div className="hinz1-game">
            <img src={backgroundImage} alt="hinzz" className="background-image" />
            <div className="button-container-hinz1">
                <button
                    className={`image-button-hinz1 ${clickedButton === 1 ? 'red' : ''}`}
                    onClick={() => handleClick(1)}
                >
                    <img src={buttonImage1} alt="Button 1" className="button-image-l2" />
                </button>
                <button
                    className={`image-button-hinz1 ${clickedButton === 2 ? 'green' : clickedButton && clickedButton !== 2 ? 'red' : ''}`}
                    onClick={() => handleClick(2)}
                >
                    <img src={buttonImage3} alt="Button 2" className="button-image-l2" />
                </button>
                <button
                    className={`image-button-hinz1 ${clickedButton === 3 ? 'red' : ''}`}
                    onClick={() => handleClick(3)}
                >
                    <img src={buttonImage2} alt="Button 3" className="button-image-l2" />
                </button>
                {showTryAgain && (
                    <div className="try-again-container-hinz1">
                        <img src={tryAgainImage} alt="Try Again" className="try-again-image-l2" />
                    </div>
                )}
                {showCorrect && (
                    <div className="correct-container-hinz1">
                        <img src={correctImage} alt="Correct" className="correct-image-hinz1" />
                    </div>
                )}

                <div className="cross-containerhinz1" onClick={goToMainPage}>
                    <img src={crossImage} alt="Cross" className="cross-imagehinz1" />
                </div>
            </div>
        </div>
    );
};

export default Hinz1;
