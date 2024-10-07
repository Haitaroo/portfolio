import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ placeholder, onChange, results = [] }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onChange(e); // Callback for passing search query up
  };

  return (
    <div className="search-bar taskbar-search">
      <span className="search-icon">&#128269;</span>
      <input 
        type="text" 
        className="search-input" 
        placeholder={placeholder} 
        onChange={handleSearch} 
        value={query}
      />
    </div>
  );
};

export default SearchBar;
