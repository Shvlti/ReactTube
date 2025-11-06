import { useState, useEffect } from 'react';

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(inputValue);
    }, 500); // 

    return () => clearTimeout(handler); 
  }, [inputValue, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title or channel..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
}