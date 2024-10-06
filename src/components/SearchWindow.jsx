import React, { useEffect, useRef } from 'react';
import './SearchWindow.css';

const SearchWindow = ({ query, onClose }) => {
  const searchWindowRef = useRef(null);

  const handleClickOutside = (event) => {
    if (searchWindowRef.current && !searchWindowRef.current.contains(event.target)) {
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
    <div className="search-window-overlay">
      <div className="search-window-content" ref={searchWindowRef}>
        <h2>Résultats de recherche pour : {query}</h2>
        <button onClick={onClose} className="search-window-close-button">X</button>
      </div>
    </div>
  );
};

export default SearchWindow;