import React, { forwardRef, useRef } from 'react';
import './DesktopIcon.css';

const DesktopIcon = forwardRef(({ id, label, image, onClick }, ref) => {
  const iconRef = useRef(null);

  return (
    <div 
      className="desktop-icon" 
      onClick={onClick}
      ref={iconRef}
    >
      <img src={image} alt={label} />
      <div className="desktop-icon-label">{label}</div>
    </div>
  );
});

export default DesktopIcon;