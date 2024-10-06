import React, { useEffect, useRef } from 'react';
import './Popup.css';

const Popup = ({ message, type, onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    if (type === 'success') {
      const timer = setTimeout(() => {
        if (popupRef.current) {
          popupRef.current.classList.add('fade-out');
          setTimeout(onClose, 500); // Attendre la fin de l'animation de disparition
        }
      }, 2000); // Disparaître après 2 secondes

      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  // Ferme la popup si l'utilisateur clique à l'extérieur
  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`popup ${type}`} ref={popupRef}>
      <div className="popup-content">
        {type === 'success' && <span className="popup-icon">✔️</span>}
        {type === 'error' && <span className="popup-icon">❌</span>}
        <p>{message}</p>
        <button onClick={onClose} className="popup-close-button">X</button>
      </div>
    </div>
  );
};

export default Popup;
