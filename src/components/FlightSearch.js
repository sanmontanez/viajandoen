"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaExchangeAlt, FaUser } from 'react-icons/fa';
import { searchPopularDestinations } from './popularDestinations';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // estilos básicos
import 'react-date-range/dist/theme/default.css'; // tema predeterminado

export default function FlightSearch({ onSelectFlight, initialSearchParams = {} }) {
  const [origin, setOrigin] = useState(initialSearchParams.origin || '');
  const [destination, setDestination] = useState(initialSearchParams.destination || '');
  const [dateRange, setDateRange] = useState([
    {
      startDate: initialSearchParams.departureDate ? new Date(initialSearchParams.departureDate) : new Date(),
      endDate: initialSearchParams.returnDate ? new Date(initialSearchParams.returnDate) : new Date(),
      key: 'selection'
    }
  ]);
  const [adults, setAdults] = useState(initialSearchParams.adults || 1);
  const [tripType, setTripType] = useState(initialSearchParams.tripType || 'roundTrip');
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [originIATA, setOriginIATA] = useState(initialSearchParams.originIATA || '');
  const [destinationIATA, setDestinationIATA] = useState(initialSearchParams.destinationIATA || '');
  const [showCalendar, setShowCalendar] = useState(false);

  const calendarRef = useRef(null);
  const router = useRouter();

  const fetchSuggestions = (query, setSuggestions) => {
    const suggestions = searchPopularDestinations(query);
    setSuggestions(suggestions);
  };

  const handleOriginChange = (e) => {
    const value = e.target.value;
    setOrigin(value);
    if (value.length > 1) {
      fetchSuggestions(value, setOriginSuggestions);
    } else {
      setOriginSuggestions([]);
    }
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    if (value.length > 1) {
      fetchSuggestions(value, setDestinationSuggestions);
    } else {
      setDestinationSuggestions([]);
    }
  };

  const handleOriginSelect = (iataCode, name) => {
    setOrigin(name);
    setOriginIATA(iataCode);
    setOriginSuggestions([]);
  };

  const handleDestinationSelect = (iataCode, name) => {
    setDestination(name);
    setDestinationIATA(iataCode);
    setDestinationSuggestions([]);
  };

  const handleDateRangeChange = (ranges) => {
    setDateRange([ranges.selection]);
    if (tripType === 'oneWay') {
      setShowCalendar(false);
    }
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const searchParams = {
        origin: originIATA || origin,
        destination: destinationIATA || destination,
        departureDate: dateRange[0].startDate.toISOString().split('T')[0],
        returnDate: tripType === 'roundTrip' ? dateRange[0].endDate.toISOString().split('T')[0] : '',
        adults,
        tripType,
      };
      onSelectFlight(searchParams);
      const query = new URLSearchParams(searchParams).toString();
      router.push(`/results?${query}`);
    } catch (error) {
      console.error('Error submitting search:', error);
      alert('Error submitting search. Please try again.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-7xl mx-auto mt-8">
      <div className="flex mb-4">
        <button 
          type="button"
          className={`mr-4 px-4 py-2 rounded-full ${tripType === 'roundTrip' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
          onClick={() => setTripType('roundTrip')}
        >
          Ida y Vuelta
        </button>
        <button 
          type="button"
          className={`px-4 py-2 rounded-full ${tripType === 'oneWay' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
          onClick={() => setTripType('oneWay')}
        >
          Solo ida
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row flex-wrap md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Desde</label>
          <div className="relative">
            <input 
              type="text" 
              value={origin}
              onChange={handleOriginChange}
              className="w-full p-2 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:bg-gray-900 dark:text-white"
              placeholder="Ciudad de origen"
            />
            {originSuggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 dark:text-white border rounded-md z-10 max-h-48 overflow-y-auto">
                {originSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.iataCode}
                    className="p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={() => handleOriginSelect(suggestion.iataCode, suggestion.name)}
                  >
                    {suggestion.name} ({suggestion.iataCode})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Hacia</label>
          <div className="relative">
            <input 
              type="text" 
              value={destination}
              onChange={handleDestinationChange}
              className="w-full p-2 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:bg-gray-900 dark:text-white"
              placeholder="Ingresa destino"
            />
            <FaExchangeAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {destinationSuggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 dark:text-white border rounded-md z-10 max-h-48 overflow-y-auto">
                {destinationSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.iataCode}
                    className="p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={() => handleDestinationSelect(suggestion.iataCode, suggestion.name)}
                  >
                    {suggestion.name} ({suggestion.iataCode})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-[120px] relative" ref={calendarRef}>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Fechas</label>
          <input 
            type="text" 
            readOnly
            value={tripType === 'roundTrip' ? `${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}` : dateRange[0].startDate.toLocaleDateString()}
            onClick={() => setShowCalendar(!showCalendar)}
            className="w-full p-2 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:bg-gray-900 dark:text-white cursor-pointer"
          />
          {showCalendar && (
            <div className="absolute top-full left-0 w-full z-20 bg-white dark:bg-gray-800">
              <DateRange
                ranges={dateRange}
                onChange={handleDateRangeChange}
                minDate={new Date()}
                rangeColors={['#3b82f6']}
                className="border-2 rounded-md"
              />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-[100px]">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Viajeros</label>
          <div className="relative">
            <select 
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              className="w-full p-2 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 appearance-none dark:bg-gray-900 dark:text-white"
            >
              {[1, 2, 3, 4].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="flex-none">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-full font-bold h-[42px]">
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}
