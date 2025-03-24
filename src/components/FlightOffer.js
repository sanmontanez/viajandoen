// /components/FlightOffer.js

import React from 'react';

const FlightOffer = ({ offer, exchangeRate, onSelectOffer, selectedCurrency, selectedLanguage, convertCurrency, formatCurrency, translations }) => {
  const {
    price: { total },
    itineraries,
  } = offer;

  const [firstItinerary] = itineraries;
  const { segments } = firstItinerary;

  // Convertir el precio a la moneda seleccionada
  const priceInSelectedCurrency = convertCurrency(parseFloat(total), selectedCurrency);

  return (
    <div className="cursor-pointer" onClick={onSelectOffer}>
      <h2 className="text-lg font-bold">{translations[selectedLanguage].price}: {formatCurrency(priceInSelectedCurrency, selectedCurrency)}</h2>
      {segments.map((segment, index) => (
        <div key={index} className="mb-2">
          <p>
            {segment.departure.iataCode} to {segment.arrival.iataCode}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FlightOffer;
