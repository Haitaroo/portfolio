import React, { useState } from 'react';
import WeatherWidget from './WeatherWidget';
import SearchBar from './SearchBar';
import wifiIcon from '../assets/img/wifi.png';
import noWifiIcon from '../assets/img/nonWifi.png';
import volumeLowIcon from '../assets/img/volumeBas.png';
import volumeMediumIcon from '../assets/img/volumeMoyen.png';
import volumeHighIcon from '../assets/img/volumeHaut.png';
import volumeMuteIcon from '../assets/img/volumeNon.png';
import './Taskbar.css';

const Taskbar = ({ icons = [], onIconClick, onSearch, volume, setVolume }) => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [time] = useState(new Date());
  const [isConnected, setIsConnected] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const networks = ['Réseau 1', 'Réseau 2', 'Réseau 3'];

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const connectToNetwork = (network) => {
    setSelectedNetwork(network);
    setIsConnected(true);
    toggleMenu();
  };

  const disconnectFromNetwork = () => {
    setIsConnected(false);
    setSelectedNetwork(null);
    toggleMenu();
  };

  const getVolumeIcon = () => {
    if (volume === 0) return volumeMuteIcon;
    if (volume > 0 && volume <= 33) return volumeLowIcon;
    if (volume > 33 && volume <= 66) return volumeMediumIcon;
    return volumeHighIcon;
  };

  const getWifiIcon = () => {
    return isConnected ? wifiIcon : noWifiIcon;
  };

  return (
    <div className="taskbar">
      <div className="taskbar-left">
        <WeatherWidget />
        <SearchBar placeholder="Recherche..." onChange={(e) => onSearch(e.target.value)} />
      </div>
      <div className="taskbar-icons">
        {Array.isArray(icons) && icons.map((icon) => (
          <div
            key={icon.id}
            className="taskbar-icon"
            onClick={() => onIconClick(icon.id)}
            onMouseEnter={() => setHoveredIcon(icon.id)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <img src={icon.image} alt={icon.label} />
            {hoveredIcon === icon.id && <div className="tooltip">{icon.label}</div>}
          </div>
        ))}
      </div>
      <div className="taskbar-right">
        <div className="taskbar-icon" onClick={toggleMenu}>
          <img src={getWifiIcon()} alt="Wi-Fi" />
        </div>
        <div className="taskbar-icon" onClick={toggleMenu}>
          <img src={getVolumeIcon()} alt="Son" />
        </div>
        {isMenuOpen && (
          <div className="combined-menu" style={{ right: '10px' }}>
            <div className="wifi-section">
              <p className="menu-title">État de la connexion</p>
              <p>{isConnected ? '✅ Connecté à ' + selectedNetwork : '❌ Déconnecté'}</p>
              {isConnected ? (
                <button onClick={disconnectFromNetwork} className="disconnect-button">
                  Se déconnecter
                </button>
              ) : (
                <>
                  <p>Réseaux disponibles :</p>
                  <ul>
                    {networks.map((network) => (
                      <li key={network} onClick={() => connectToNetwork(network)} style={{ cursor: 'pointer' }}>
                        {network}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="sound-section">
              <p className="menu-title">Contrôle du volume</p>
              <p>Volume : {volume}%</p>
              <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} />
              <div className="volume-indicator" style={{ width: `${volume}%` }} />
            </div>
          </div>
        )}
        <div className="taskbar-time">
          <span>{formatTime(time)}</span>
          <span>{time.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
