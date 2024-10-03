import React from 'react';
import Draggable from 'react-draggable';
import './PopupWindow.css';

const PopupWindow = ({ title, content, onClose, initialPosition }) => {
  return (
    <Draggable handle=".draggable-handle" defaultPosition={initialPosition}>
      <div className="popup-window">
        <div className="draggable-handle">
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