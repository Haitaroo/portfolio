import React from 'react';
import './SearchBar.css';

const SearchBar = ({ placeholder, onChange }) => {
  return (
    <div className="search-bar">
      <span className="search-icon">&#128269;</span> {/* Unicode for magnifying glass */}
      <input 
        type="text" 
        className="search-input" 
        placeholder={placeholder} 
        onChange={onChange} 
      />
    </div>
  );
};

export default SearchBar;