import React from 'react';
import Draggable from 'react-draggable';
import './PopupWindow.css';

const PopupWindow = ({ title, content, onClose, onMinimize, onMaximize, isMaximized, isVisible }) => {
  return (
<div className={`popup-window ${isMaximized ? 'maximized' : 'minimized'} ${!isVisible ? 'hidden' : ''}`}>
    <div className="popup-header">
        <span>{title}</span>
        <div>
          <button className="minimize-button" onClick={onMinimize}>_</button>
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