import React from 'react';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import DesktopIcon from './components/DesktopIcon';
import './App.css'; // Assure-toi que ce fichier est importé

const App = () => {
    return (
        <div className="app">
            <h1>Mon Portfolio</h1>
            <div className="desktop">
                <DesktopIcon />
                <Window />
            </div>
            <Taskbar />
        </div>
    );
};

export default App;
