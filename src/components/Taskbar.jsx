import React, { useState } from 'react';
import WeatherWidget from './WeatherWidget'; // Assurez-vous d'importer votre composant WeatherWidget
import SearchBar from './SearchBar'; // Importez votre composant SearchBar
import wifiIcon from '../assets/img/wifi.png'; // Chemin d'importation pour votre icône Wi-Fi
import soundIcon from '../assets/img/son.png'; // Chemin d'importation pour votre icône son
import './Taskbar.css';

const Taskbar = ({ icons, onIconClick, onSearch }) => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isWifiMenuOpen, setIsWifiMenuOpen] = useState(false);
  const [isSoundMenuOpen, setIsSoundMenuOpen] = useState(false);
  const [volume, setVolume] = useState(50); // Valeur initiale pour le volume
  const [time] = useState(new Date()); // Remplacez par votre logique de gestion du temps

  const toggleWifiMenu = () => {
    setIsWifiMenuOpen(prev => !prev);
  };

  const toggleSoundMenu = () => {
    setIsSoundMenuOpen(prev => !prev);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString(); // Formatez le temps selon vos besoins
  };

  return (
    <div className="taskbar">
      <div className="taskbar-left">
        <WeatherWidget />
        {/* Remplacez l'input par le composant SearchBar */}
        <SearchBar 
          placeholder="Recherche..." 
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
