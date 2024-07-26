
import React from 'react';
import PlayButton from './PlayButton';
import './MainPage.css';
import MyImage from '../assets/image 167.svg';
import { useLocation } from 'wouter';

const MainPage = () => {
    const [, setLocation] = useLocation();

    const handlePlayClick = () => {
        setLocation('/second-page');
    };

    return (
        <div className="main-page">
            <div className="image-container1">
                <img src={MyImage} alt="Kids Game" className="main-image" />
            </div>
            <h3 className="main-title">Learn<br />or<br />Fun?</h3>
            <PlayButton onClick={handlePlayClick} />
        </div>
    );
};

export default MainPage;
