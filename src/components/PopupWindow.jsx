import React from 'react';
import Draggable from 'react-draggable';
import './PopupWindow.css';

const PopupWindow = ({ title, content, onClose, initialPosition }) => {
  return (
    <Draggable handle=".popup-header" defaultPosition={initialPosition}>
      <div className="popup-window">
        <div className="popup-header">
          <span>{title}</span>
          <button onClick={onClose} className="close-button">X</button>
        </div>
        <div className="popup-content">
          {content}
        </div>
      </div>
    </Draggable>
  );
};

export default PopupWindow;