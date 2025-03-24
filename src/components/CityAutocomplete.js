"use client";

import React, { useState } from 'react';

const CityAutocomplete = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchCities = async (searchQuery) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`/api/search-location?city=${searchQuery}`);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    fetchCities(value);
  };

  const handleSuggestionClick = (city) => {
    setQuery(city.name);
    setSuggestions([]);
    onCitySelect(city);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="p-2 border rounded-md w-full"
        placeholder="Enter city name"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list bg-white border rounded-md mt-2">
          {suggestions.map((city) => (
            <li
              key={city.id}
              onClick={() => handleSuggestionClick(city)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityAutocomplete;
