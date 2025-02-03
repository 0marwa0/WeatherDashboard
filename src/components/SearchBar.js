'use client';

import { useState } from 'react';

const SearchBar = ({ onSearch, disabled }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery && !disabled) {
      console.log('Submitting search for:', trimmedQuery);
      onSearch(trimmedQuery);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for cities..."
          disabled={disabled}
          className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg bg-[#232b36] text-white border-none rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 ${
            disabled ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        />
        <button
          type="submit"
          disabled={disabled || !query.trim()}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 sm:px-6 py-1.5 sm:py-2 bg-[#1a1f24] hover:bg-[#232b36] text-white rounded-lg sm:rounded-xl transition-colors font-semibold border border-gray-700 text-sm sm:text-base ${
            disabled || !query.trim()
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          {disabled ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </span>
          ) : (
            'Search'
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
