import React from 'react';
import './DesktopIcon.css';
import iconImage from '../assets/img/github.png'; // Assurez-vous que ce chemin est correct

const DesktopIcon = () => {
    return (
        <div className="desktop-icon">
            <img src={iconImage} alt="Github" className="icon-image" />
            <div className="desktop-icon-label">Mon Github</div>
        </div>
    );
};

export default DesktopIcon;