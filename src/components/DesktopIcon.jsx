import React from 'react';
import Draggable from 'react-draggable'; // Import de react-draggable
import './DesktopIcon.css';
import iconImage from '../assets/img/github.png';  // Chemin vers l'icône

const DesktopIcon = () => {
    return (
        <Draggable>
            <div className="desktop-icon">
                <img src={iconImage} alt="Github" />
                <div className="desktop-icon-label">Mon Github</div>
            </div>
        </Draggable>
    );
};

export default DesktopIcon;
