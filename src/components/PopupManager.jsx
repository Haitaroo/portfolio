// PopupManager.jsx
import React from 'react';
import PopupWindow from './PopupWindow';

const PopupManager = ({ popup, isPopupVisible, isPopupMaximized, closePopup, handleMinimize, handleMaximize }) => {
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
        />
      )}
    </>
  );
};

export default PopupManager;