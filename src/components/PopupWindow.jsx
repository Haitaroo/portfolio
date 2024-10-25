import React from 'react';
import Draggable from 'react-draggable';
import './PopupWindow.css';

const PopupWindow = ({ title, content, onClose, onMinimize, onMaximize, isMaximized, isVisible }) => {
  return (
    <div className={`popup-window ${isMaximized ? 'maximized' : ''} ${!isVisible ? 'hidden' : ''}`}>
      <div className="popup-header">
        <span className="popup-title">{title}</span>
        <div className="header-buttons">
          <button className="minimize-button" onClick={onMinimize}></button>
          <button className="maximize-button" onClick={onMaximize}>🗖</button>
          <button className="close-button" onClick={onClose}>X</button>
        </div>
      </div>
      <div className="popup-content">
        {content}
      </div>
    </div>
  );
};

export default PopupWindow;
