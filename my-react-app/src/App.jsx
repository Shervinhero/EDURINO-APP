import React from 'react';
import MainPage from './components/MainPage';
import Vergleisch from './components/Vergleisch';
import SecondPage from './components/SecondPage';
import MathGame from './components/MathGame';
import Level_2 from './components/Level_2';
import Level_3 from './components/Level_3';
import Level_4 from './components/Level_4';
import LetterGame from './components/LetterGame';
import Hinz1 from "./components/Hinz1.jsx";
import Hinz2 from "./components/Hinz2.jsx";
import Hinz3 from "./components/Hinz3.jsx";
import WinPage from './components/winpage.jsx';
import WinPage2 from './components/winpage2.jsx';

import { Route, Switch } from 'wouter';
import './App.css';

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/" component={MainPage} />
                <Route path="/second-page" component={SecondPage} />
                <Route path="/math-game" component={MathGame} />
                <Route path="/vergleisch" component={Vergleisch} />
                <Route path="/level-2" component={Level_2} />
                <Route path="/level-3" component={Level_3} />
                <Route path="/level-4" component={Level_4} />
                <Route path="/letter-game" component={LetterGame} />
                <Route path="/Hinz1" component={Hinz1} />
                <Route path="/Hinz2" component={Hinz2} />
                <Route path="/Hinz3" component={Hinz3} />
                <Route path="/winpage" component={WinPage} />
                <Route path="/winpage2" component={WinPage2} />
            </Switch>
        </div>
    );
}

export default App;
