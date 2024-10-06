import React, { useState } from 'react';
import './SearchBar.css';
import SearchWindow from './SearchWindow';

const SearchBar = ({ placeholder, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onChange(e);
    if (e.target.value) {
      setIsOpen(true); // Open the search window if there is a query
    } else {
      setIsOpen(false); // Close the search window if the query is empty
    }
  };

  const handleSearchClick = () => {
    if (query) {
      setIsOpen(true); // Open the search window if there is a query
    }
  };

  const handleClose = () => {
    setIsOpen(false); // Close the search window
  };

  return (
    <>
      <div className="search-bar" onClick={handleSearchClick}>
        <span className="search-icon">&#128269;</span>
        <input 
          type="text" 
          className="search-input" 
          placeholder={placeholder} 
          onChange={handleSearch} 
          value={query} 
          onFocus={handleSearchClick} // Open the search window on focus
        />
      </div>
      {isOpen && <SearchWindow query={query} onClose={handleClose} />}
    </>
  );
};

export default SearchBar;