<<<<<<< HEAD
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
        <div className="taskbar-icon">
          <img src={wifiIcon} alt="Wi-Fi" />
        </div>
        <div className="taskbar-icon">
          <img src={soundIcon} alt="Sound" />
        </div>
        <div className="taskbar-time">
          <span>{formatTime(time)}</span>
          <span>{time.toLocaleDateString()}</span>
        </div>
      </div>
=======
import React from 'react';
import './Taskbar.css'; // Si tu veux ajouter un style

const Taskbar = () => {
  return (
    <div className="taskbar">
      <h3>Barre des tâches</h3>
      {/* Ajoute ici les icônes ou autres éléments */}
>>>>>>> c5c1926 (Fix deployment setup)
    </div>
  );
};

<<<<<<< HEAD
export default Taskbar;
=======
export default Taskbar;
>>>>>>> c5c1926 (Fix deployment setup)
