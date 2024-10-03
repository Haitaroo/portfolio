import React, { useState, useRef } from 'react';
import './PopupWindow.css'; // Assurez-vous d'avoir le bon chemin vers votre fichier CSS

const PopupWindow = ({ title, content, onClose, initialPosition }) => {
  const [position, setPosition] = useState(initialPosition || { top: 100, left: 100 });
  const popupRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    const offsetX = e.clientX - position.left;
    const offsetY = e.clientY - position.top;

    const handleMouseMove = (e) => {
      setPosition({
        top: e.clientY - offsetY,
        left: e.clientX - offsetX,
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className="popup-window"
      style={{ top: position.top, left: position.left }}
      ref={popupRef}
      onMouseDown={handleMouseDown} // La popup entière est draggable
    >
      <div className="popup-header">
        <span>{title}</span>
        <button onClick={(e) => { e.stopPropagation(); onClose(); }}>X</button> {/* Ajout du stopPropagation ici */}
      </div>
      <div className="popup-content">{content}</div>
      <button className="popup-close-button" onClick={(e) => { e.stopPropagation(); onClose(); }}>
        Fermer
      </button>
    </div>
  );
};

export default PopupWindow;
