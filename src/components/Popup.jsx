import React, { useEffect } from 'react';
import './Popup.css';

const Popup = ({ message, type, onClose }) => {
  useEffect(() => {
    if (type === 'success') {
      const timer = setTimeout(() => {
        document.querySelector('.popup').classList.add('fade-out');
        setTimeout(onClose, 500); // Wait for fade-out animation to complete
      }, 2000); // Disappear after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  return (
    <div className={`popup ${type}`}>
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