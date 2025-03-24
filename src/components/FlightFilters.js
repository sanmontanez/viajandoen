"use client";

import React, { useState, useEffect } from "react";
import translations from "@/utils/translations";
import airlineNames from "@/utils/airlineNames";
import useScreenSize from "./useScreenSize"; // Asegúrate de crear este archivo

export default function FlightFilters({
  filters,
  setFilters,
  selectedLanguage,
  uniqueAirlines,
}) {
  const t = translations[selectedLanguage];
  const isDesktop = useScreenSize();

  const [airlinesExpanded, setAirlinesExpanded] = useState(isDesktop);
  const [timesExpanded, setTimesExpanded] = useState(isDesktop);
  const [stopsExpanded, setStopsExpanded] = useState(isDesktop);
  const [sortExpanded, setSortExpanded] = useState(isDesktop);

  useEffect(() => {
    setAirlinesExpanded(isDesktop);
    setTimesExpanded(isDesktop);
    setStopsExpanded(isDesktop);
    setSortExpanded(isDesktop);
  }, [isDesktop]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    const isChecked = e.target.checked;

    setFilters((prevFilters) => {
      if (value === "all") {
        const updatedAirlines = isChecked ? uniqueAirlines : [];
        return {
          ...prevFilters,
          [name]: updatedAirlines,
        };
      }

      const updatedArray = isChecked
        ? [...prevFilters[name], value]
        : prevFilters[name].filter((item) => item !== value);

      return {
        ...prevFilters,
        [name]: updatedArray,
      };
    });
  };

  const handleSliderChange = (e, name) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: e.target.value,
    }));
  };

  return (
    <div>
      <h3 className="font-bold mb-2">{t.filters}</h3>

      {/* Aerolíneas */}
      <div className="mb-4 border-b pb-4">
        <h4
          className="font-semibold cursor-pointer flex justify-between items-center"
          onClick={() => setAirlinesExpanded(!airlinesExpanded)}
        >
          {t.airline}
          <span>{airlinesExpanded ? "▲" : "▼"}</span>
        </h4>
        {airlinesExpanded && (
          <div className="mt-2">
            <label className="block mb-1">
              <input
                type="checkbox"
                name="airlines"
                value="all"
                checked={filters.airlines.length === uniqueAirlines.length}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              {t.allAirlines}
            </label>
            {uniqueAirlines.map((airline) => (
              <label key={airline} className="block mb-1">
                <input
                  type="checkbox"
                  name="airlines"
                  value={airline}
                  checked={filters.airlines.includes(airline)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                {airlineNames[airline] || airline}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Horarios */}
      <div className="mb-4 border-b pb-4">
        <h4
          className="font-semibold cursor-pointer flex justify-between items-center"
          onClick={() => setTimesExpanded(!timesExpanded)}
        >
          {t.departureTime}
          <span>{timesExpanded ? "▲" : "▼"}</span>
        </h4>
        {timesExpanded && (
          <div className="mt-2">
            <div className="flex items-center">
              <input
                type="range"
                min="0"
                max="24"
                step="1"
                value={filters.departureTime}
                onChange={(e) => handleSliderChange(e, "departureTime")}
                className="w-full"
              />
              <span className="ml-2">{filters.departureTime}:00</span>
            </div>
          </div>
        )}
      </div>

      {/* Paradas */}
      <div className="mb-4 border-b pb-4">
        <h4
          className="font-semibold cursor-pointer flex justify-between items-center"
          onClick={() => setStopsExpanded(!stopsExpanded)}
        >
          {t.stops}
          <span>{stopsExpanded ? "▲" : "▼"}</span>
        </h4>
        {stopsExpanded && (
          <div className="mt-2">
            <label className="block mb-1">
              <input
                type="checkbox"
                name="stops"
                value="all"
                checked={filters.stops.includes("all")}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              {t.allStops}
            </label>
            <label className="block mb-1">
              <input
                type="checkbox"
                name="stops"
                value="direct"
                checked={filters.stops.includes("direct")}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              {t.direct}
            </label>
            <label className="block mb-1">
              <input
                type="checkbox"
                name="stops"
                value="withStops"
                checked={filters.stops.includes("withStops")}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              {t.withStops}
            </label>
          </div>
        )}
      </div>

      {/* Ordenar por */}
      <div className="mb-4 border-b pb-4">
        <h4
          className="font-semibold cursor-pointer flex justify-between items-center"
          onClick={() => setSortExpanded(!sortExpanded)}
        >
          {t.sortBy}
          <span>{sortExpanded ? "▲" : "▼"}</span>
        </h4>
        {sortExpanded && (
          <div className="mt-2">
            <label className="block mb-1">
              <input
                type="radio"
                name="sortBy"
                value="noSort"
                checked={filters.sortBy === "noSort"}
                onChange={handleFilterChange}
                className="mr-2"
              />
              {t.noSort}
            </label>
            <label className="block mb-1">
              <input
                type="radio"
                name="sortBy"
                value="cheapest"
                checked={filters.sortBy === "cheapest"}
                onChange={handleFilterChange}
                className="mr-2"
              />
              {t.cheapest}
            </label>
            <label className="block mb-1">
              <input
                type="radio"
                name="sortBy"
                value="shortest"
                checked={filters.sortBy === "shortest"}
                onChange={handleFilterChange}
                className="mr-2"
              />
              {t.shortest}
            </label>
          </div>
        )}
      </div>
    </div>
  );
}