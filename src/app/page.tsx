'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FlightSearch from '../components/FlightSearch';
import Header from '../components/Header';
import FlightOffer from '../components/FlightOffer';
import translations from '../utils/translations'; // Importa las traducciones
import Footer from '../components/Footer';

interface Flight {
  id: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
}

interface FlightOffer {
  id: string;
  price: {
    total: string;
  };
  itineraries: Array<{
    segments: Array<{
      carrierCode: string;
      flightNumber: string;
      departure: {
        iataCode: string;
        at: string;
      };
      arrival: {
        iataCode: string;
        at: string;
      };
      duration: string;
    }>;
  }>;
}

export default function Home() {
  const router = useRouter();
  const [selectedFlights, setSelectedFlights] = useState<Flight[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [flightOffers, setFlightOffers] = useState<FlightOffer[][]>([[], [], [], []]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offerCount, setOfferCount] = useState<number>(3);
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});
  const [selectedCurrency, setSelectedCurrency] = useState<string>('CLP');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('es');

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlights([...selectedFlights, flight]);
  };

  const handleSelectOffer = (offer: FlightOffer, route: string, departureDate: string, returnDate: string) => {
    let origin, destination;
    if (route === 'route1') {
      origin = 'SCL';
      destination = 'GRU';
    } else if (route === 'route2') {
      origin = 'SCL';
      destination = 'MAD';
    } else if (route === 'route3') {
      origin = 'SCL';
      destination = 'AUA';
    } else if (route === 'route4') {
      origin = 'SCL';
      destination = 'CUN';
    }

    const query = new URLSearchParams({
      origin: origin || '',
      destination: destination || '',
      departureDate,
      returnDate,
      adults: '1',
      selectedOffer: JSON.stringify(offer),
    }).toString();
    router.push(`/results?${query}`);
  };

  const handleRemoveFlight = (index: number) => {
    const newSelectedFlights = [...selectedFlights];
    newSelectedFlights.splice(index, 1);
    setSelectedFlights(newSelectedFlights);
  };

  const handleProceedToPayment = () => {
    setShowPayment(true);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  useEffect(() => {
    const predefinedOffersRoute1 = [
      {
        id: '1',
        price: { total: '500' },
        itineraries: [
          {
            segments: [
              {
                carrierCode: 'AA',
                flightNumber: '100',
                departure: { iataCode: 'SCL', at: '2024-08-01T10:00:00' },
                arrival: { iataCode: 'GRU', at: '2024-08-01T13:00:00' },
                duration: 'PT5H',
              },
            ],
          },
        ],
      },
    ];

    const predefinedOffersRoute2 = [
      {
        id: '2',
        price: { total: '1000' },
        itineraries: [
          {
            segments: [
              {
                carrierCode: 'DL',
                flightNumber: '200',
                departure: { iataCode: 'SCL', at: '2024-08-05T09:00:00' },
                arrival: { iataCode: 'MAD', at: '2024-08-05T12:00:00' },
                duration: 'PT6H',
              },
            ],
          },
        ],
      },
    ];

    const predefinedOffersRoute3 = [
      {
        id: '3',
        price: { total: '500' },
        itineraries: [
          {
            segments: [
              {
                carrierCode: 'IB',
                flightNumber: '300',
                departure: { iataCode: 'SCL', at: '2024-08-10T08:00:00' },
                arrival: { iataCode: 'AUA', at: '2024-08-10T09:00:00' },
                duration: 'PT1H',
              },
            ],
          },
        ],
      },
    ];

    const predefinedOffersRoute4 = [
      {
        id: '4',
        price: { total: '600' },
        itineraries: [
          {
            segments: [
              {
                carrierCode: 'AM',
                flightNumber: '400',
                departure: { iataCode: 'SCL', at: '2024-08-15T11:00:00' },
                arrival: { iataCode: 'CUN', at: '2024-08-15T16:00:00' },
                duration: 'PT7H',
              },
            ],
          },
        ],
      },
    ];

    setFlightOffers([predefinedOffersRoute1, predefinedOffersRoute2, predefinedOffersRoute3, predefinedOffersRoute4]);

    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (err) {
        console.error('Error fetching exchange rates:', err);
      }
    };

    fetchExchangeRates();
    setLoading(false);
  }, []);

  const convertCurrency = (amount: number, toCurrency: string) => {
    const rate = exchangeRates[toCurrency];
    return rate ? (amount * rate).toFixed(2) : amount.toFixed(2);
  };

  const formatCurrency = (amount: string, currency: string) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency,
    }).format(parseFloat(amount));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header selectedCurrency={selectedCurrency} onCurrencyChange={handleCurrencyChange} selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />
      <main className="flex-grow bg-cover bg-center pt-10 pb-10" style={{ backgroundImage: `url(/travel-storytelling-couple-2.png)` }}>
        <div className="container mx-auto py-16 flex flex-col items-center">
          <div className="rounded-lg w-full">
            <FlightSearch onSelectFlight={handleSelectFlight} />
          </div>
          <h1 className="text-4xl mb-4 text-white pt-10 text-center">Reserva vuelos baratos que otros buscadores nunca verán.</h1>
        </div>
      </main>
      <div className="justify-center max-w-7xl mx-auto mt-8 p-4 md:p-8">
        <h1 className="text-4xl mb-8 text-center font-bold text-blue-700">¡Vuelos Baratos a los destinos más buscados!</h1>
        {loading ? (
          <p className="text-center text-lg text-gray-700">Loading...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { city: "Sao Paulo", image: "/sao.jpg", route: "route1", offers: flightOffers[0], departureDate: '2024-08-01', returnDate: '2024-08-15' },
              { city: "Madrid", image: "/madrid.jpg", route: "route2", offers: flightOffers[1], departureDate: '2024-08-05', returnDate: '2024-08-20' },
              { city: "Aruba", image: "/aruba.jpg", route: "route3", offers: flightOffers[2], departureDate: '2024-08-10', returnDate: '2024-08-25' },
              { city: "Cancún", image: "/cancun.jpg", route: "route4", offers: flightOffers[3], departureDate: '2024-08-01', returnDate: '2024-08-30' }
            ].map((destination, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Image src={destination.image} alt={destination.city} width={400} height={300} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">{destination.city}</h2>
                  <div className="text-gray-700 mb-4">
                    {destination.offers.slice(0, offerCount).map((offer, offerIndex) => (
                      <FlightOffer 
                        key={offerIndex} 
                        offer={offer} 
                        exchangeRate={exchangeRates[selectedCurrency]} 
                        onSelectOffer={() => handleSelectOffer(offer, destination.route, destination.departureDate, destination.returnDate)} 
                        selectedCurrency={selectedCurrency}
                        selectedLanguage={selectedLanguage}
                        convertCurrency={convertCurrency}
                        formatCurrency={formatCurrency}
                        translations={translations}
                      />
                    ))}
                  </div>
                  {destination.offers.length > offerCount && (
                    <button
                      onClick={() => setOfferCount((prevCount) => prevCount + 3)}
                      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      Load More Offers
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
<Footer></Footer>
    </div>
    
  );
}
