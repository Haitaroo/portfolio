import React from 'react';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import DesktopIcon from './components/DesktopIcon';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <h1>Mon Interface Windows 11</h1>
      <div className="desktop">
        <DesktopIcon />
        <Window />
      </div>
      <Taskbar />
    </div>
  );
};

export default App;
