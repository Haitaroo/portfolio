import React, { useState, useEffect } from 'react';
import WeatherWidget from './WeatherWidget';
import './Taskbar.css';
import wifiIcon from '../assets/img/wifi.png';
import soundIcon from '../assets/img/son.png';

const Taskbar = ({ icons, onIconClick, onSearch }) => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const [isWifiMenuOpen, setWifiMenuOpen] = useState(false);
  const [isSoundMenuOpen, setSoundMenuOpen] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isConnected, setIsConnected] = useState(true);

  const toggleWifiMenu = () => {
    setWifiMenuOpen(!isWifiMenuOpen);
  };

  const toggleSoundMenu = () => {
    setSoundMenuOpen(!isSoundMenuOpen);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  return (
    <div className="taskbar">
      <div className="taskbar-left">
        <WeatherWidget />
        <input 
          type="text" 
          className="taskbar-search" 
          placeholder="Search..." 
          onChange={(e) => onSearch(e.target.value)} 
        />
      </div>
      <div className="taskbar-icons">
        {icons.map(icon => (
          <div 
            key={icon.id} 
            className="taskbar-icon" 
            onClick={() => onIconClick(icon.id)}
            onMouseEnter={() => setHoveredIcon(icon.id)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <img src={icon.image} alt={icon.label} />
            {hoveredIcon === icon.id && (
              <div className="tooltip">{icon.label}</div>
            )}
          </div>
        ))}
      </div>
      <div className="taskbar-right">
        <div className="taskbar-icon" onClick={toggleWifiMenu}>
          <img src={wifiIcon} alt="Wi-Fi" />
          {isWifiMenuOpen && (
            <div className="wifi-menu">
              <p>{isConnected ? 'Connecté' : 'Déconnecté'}</p>
              <p>Réseaux disponibles :</p>
              <ul>
                <li>Réseau 1</li>
                <li>Réseau 2</li>
                <li>Réseau 3</li>
              </ul>
            </div>
          )}
        </div>
        <div className="taskbar-icon" onClick={toggleSoundMenu}>
          <img src={soundIcon} alt="Sound" />
          {isSoundMenuOpen && (
            <div className="sound-menu">
              <p>Volume : {volume}%</p>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          )}
        </div>
        <div className="taskbar-time">
          <span>{formatTime(time)}</span>
          <span>{time.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;