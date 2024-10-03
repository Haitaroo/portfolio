<<<<<<< HEAD
import React, { forwardRef, useRef } from 'react';
import './DesktopIcon.css';

const DesktopIcon = forwardRef(({ id, label, image, onClick }, ref) => {
    const iconRef = useRef(null);

    return (
        // <Draggable nodeRef={iconRef}>
            <div 
                className="desktop-icon" 
                onClick={onClick}
                ref={iconRef} // Assurez-vous d'utiliser nodeRef ici
            >
                <img src={image} alt={label} />
                <div className="desktop-icon-label">{label}</div>
            </div>
        // </Draggable>
    );
});

export default DesktopIcon;
=======
import React from 'react';
import './DesktopIcon.css'; // Si tu veux ajouter un style

const DesktopIcon = () => {
  return (
    <div className="desktop-icon">
      <h4>Icône</h4>
      {/* Contenu de l'icône ici */}
    </div>
  );
};

export default DesktopIcon;
>>>>>>> c5c1926 (Fix deployment setup)
