import React, { useEffect, useRef } from 'react';
import './SecondPage.css';
import dice1 from '../assets/dice_2.png';
import dice2 from '../assets/dice_1.png';
import buttonImage3 from '../assets/Read_fun.svg';
import buttonImage2 from '../assets/paint-happy.svg';
import buttonImage from '../assets/Math_game.svg';
import logoimage from '../assets/Logo.svg';
import annyang from 'annyang';

const SecondPage = () => {
    const hasAskedQuestion = useRef(false);

    useEffect(() => {
        if (!hasAskedQuestion.current) {
            greetAndListen();
            hasAskedQuestion.current = true;
        }
    }, []);

    const greetAndListen = () => {
        annyang.start({ autoRestart: true, continuous: false });

        annyang.addCommands({
            'math and game': () => {
                navigateTo('/math-game');
            },
            'game': () => {
                navigateTo('/math-game');
            },
            'math': () => {
                navigateTo('/math-game');
            },
            'Go to the MAth and game page': () => {
                navigateTo('/math-game');
            },
        });

        annyang.addCallback('result', function (phrases) {
            console.log('I think the user said: ', phrases[0]);
        });

        speak('Hello, welcome to Edurino app. Where do you want to play today?');
    };

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    const navigateTo = (path) => {
        setTimeout(() => {
            window.location.href = path;
        }, 1000);
    };

    const handleButtonClick = (buttonNumber) => {
        switch (buttonNumber) {
            case 1:
                navigateTo('/math-game');
                break;
            case 2:
                navigateTo('/read-fun');
                break;
            case 3:
                navigateTo('/letter-game');
                break;
            default:
                break;
        }
    };

    return (
        <div className="second-page">
            <div className="logo-containersec">
                <img src={logoimage} alt="logo" className="logo" />
            </div>

            <div className="content-container1">
                <div className="dice-container">
                    <img src={dice1} alt="Dice 1" className="dice" />
                    <img src={dice2} alt="Dice 2" className="dice" />
                </div>
                <div className="button-containersec">
                    <button className="image-button left-button" onClick={() => handleButtonClick(1)}>
                        <img src={buttonImage} alt="MATH & GAME" className="button-image" />
                    </button>
                    <button className="image-button center-button" onClick={() => handleButtonClick(2)}>
                        <img src={buttonImage2} alt="READ & FUN" className="button-image" />
                    </button>
                    <button className="image-button right-button" onClick={() => handleButtonClick(3)}>
                        <img src={buttonImage3} alt="PAINT & HAPPY" className="button-image" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SecondPage;
