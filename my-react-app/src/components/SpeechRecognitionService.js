// SpeechRecognitionService.js

import annyang from 'annyang';

const setupVoiceCommands = (commands) => {
    if (annyang) {
        annyang.addCommands(commands);
        annyang.start({ autoRestart: true, continuous: false });
    }
};

const addCommand = (command, handler) => {
    if (annyang) {
        annyang.addCommands({ [command]: handler });
    }
};

const startListening = () => {
    if (annyang) {
        annyang.start();
    }
};

const stopListening = () => {
    if (annyang) {
        annyang.abort();
    }
};

const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
};

export { setupVoiceCommands, addCommand, startListening, stopListening, speak };
