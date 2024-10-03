import React from 'react';
import Draggable from 'react-draggable';
import './DesktopIcon.css';

const DesktopIcon = ({ id, onSelect, selected, label, image }) => {
    const handleMouseDown = (e) => {
        e.preventDefault();
        onSelect(id); // Appelle la fonction de sélection
    };

    return (
        <Draggable>
            <div 
                className={`desktop-icon ${selected ? 'selected' : ''}`} 
                onMouseDown={handleMouseDown}
                style={{ cursor: 'default' }} // Garde le curseur par défaut
            >
                <img src={image} alt={label} />
                <div className="desktop-icon-label">{label}</div>
            </div>
        </Draggable>
    );
};

export default DesktopIcon;
