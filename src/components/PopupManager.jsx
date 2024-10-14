// PopupManager.jsx
import React from 'react';
import PopupWindow from './PopupWindow';

const PopupManager = ({ volume, setVolume, popup, isPopupVisible, isPopupMaximized, closePopup, handleMinimize, handleMaximize }) => {
  return (
    <>
      {popup.isOpen && (
        <PopupWindow 
          title={popup.title} 
          content={popup.content} 
          onClose={closePopup}
          initialPosition={popup.position}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          isMaximized={isPopupMaximized}
          isVisible={isPopupVisible}
          volume={volume}
          setVolume={setVolume}
        />
      )}
    </>
  );
};

export default PopupManager;