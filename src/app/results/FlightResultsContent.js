import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import airlineNames from '../../utils/airlineNames';
import Header from '@/components/Header';
import { formatCurrency } from '../../utils/formatCurrency';
import translations from '../../utils/translations';
import FlightFilters from '@/components/FlightFilters';
import { FaSuitcase, FaLuggageCart, FaPlane, FaChevronDown, FaChevronUp, FaSuitcaseRolling } from 'react-icons/fa'; 
import { GiBackpack } from 'react-icons/gi';
import FlightSearch from '@/components/FlightSearch';
import CustomImage from '../../components/CustomImage';
import Loading from '../../components/Loading';
import iataToCity from '../../utils/citynames';
import Footer from '@/components/Footer';

const FlightResultsContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const departureDate = searchParams.get('departureDate');
  const returnDate = searchParams.get('returnDate');
  const adults = searchParams.get('adults');

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState('CLP');
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [exchangeRates, setExchangeRates] = useState({});
  const [filters, setFilters] = useState({
    airlines: [],
    stops: [],
    departureTime: 24,
    sortBy: 'noSort',
  });

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const searchHistory = JSON.parse(Cookies.get('searchHistory') || '[]');
        const searchCount = searchHistory.filter(search => search.origin === origin && search.destination === destination).length;
        const priceMultiplier = 1 + 0.05 * searchCount;

        const res = await fetch(`/api/searchFlights`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ origin, destination, departureDate, returnDate, adults }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch flight data');
        }

        const data = await res.json();
        
        const adjustedData = data.map(flight => {
          flight.price.total = (flight.price.total * priceMultiplier).toFixed(2);
          return flight;
        });

        setResults(Array.isArray(adjustedData) ? adjustedData : []);

        searchHistory.push({ origin, destination, date: new Date() });
        Cookies.set('searchHistory', JSON.stringify(searchHistory), { expires: 7 });

      } catch (err) {
        console.error("Error fetching flight data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchExchangeRates = async () => {
      try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
        const data = await res.json();
        setExchangeRates(data.rates);
      } catch (err) {
        console.error("Error fetching exchange rates:", err);
      }
    };

    fetchFlights();
    fetchExchangeRates();
  }, [origin, destination, departureDate, returnDate, adults]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSelectFlight = (flight) => {
    const selectedFlights = [flight];
    const query = new URLSearchParams({ selectedFlights: JSON.stringify(selectedFlights) }).toString();
    router.push(`/checkout?${query}`);
  };

  const handleSearchSelectFlight = (searchParams) => {
    router.push(`/flight-results?${new URLSearchParams(searchParams).toString()}`);
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const convertCurrency = (amount, currency) => {
    if (!exchangeRates[currency]) return amount;
    const rate = exchangeRates[currency];
    return (amount * rate).toFixed(2);
  };

  const applyFilters = (results) => {
    let filteredResults = results;

    if (filters.airlines.length > 0) {
      filteredResults = filteredResults.filter(flight =>
        flight.itineraries.some(itinerary =>
          itinerary.segments.some(segment => filters.airlines.includes(segment.carrierCode))
        )
      );
    }

    if (filters.stops.length > 0) {
      if (filters.stops.includes('direct')) {
        filteredResults = filteredResults.filter(flight =>
          flight.itineraries.every(itinerary =>
            itinerary.segments.length === 1
          )
        );
      } else {
        filteredResults = filteredResults.filter(flight =>
          flight.itineraries.every(itinerary =>
            itinerary.segments.length > 1
          )
        );
      }
    }

    if (filters.departureTime !== 24) {
      filteredResults = filteredResults.filter(flight =>
        flight.itineraries.every(itinerary =>
          new Date(itinerary.segments[0].departure.at).getHours() <= filters.departureTime
        )
      );
    }

    if (filters.sortBy !== 'noSort') {
      if (filters.sortBy === 'cheapest') {
        filteredResults = filteredResults.sort((a, b) => parseFloat(a.price.total) - parseFloat(b.price.total));
      } else if (filters.sortBy === 'shortest') {
        filteredResults = filteredResults.sort((a, b) => {
          const aDuration = a.itineraries.reduce((acc, itinerary) => acc + parseDuration(itinerary.duration), 0);
          const bDuration = b.itineraries.reduce((acc, itinerary) => acc + parseDuration(itinerary.duration), 0);
          return aDuration - bDuration;
        });
      }
    }

    return filteredResults;
  };

  const parseDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
    const hours = match[1] ? parseInt(match[1].slice(0, -1)) : 0;
    const minutes = match[2] ? parseInt(match[2].slice(0, -1)) : 0;
    return hours * 60 + minutes;
  };

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
  };

  const calculateTotalDuration = (segments) => {
    const totalDuration = segments.reduce((acc, segment, index) => {
      const segmentDuration = parseDuration(segment.duration);
      if (index < segments.length - 1) {
        const stopoverDuration = calculateStopoverDuration(
          segments[index].arrival.at,
          segments[index + 1].departure.at
        );
        return acc + segmentDuration + stopoverDuration;
      }
      return acc + segmentDuration;
    }, 0);
    return formatDuration(totalDuration);
  };

  const calculateStopoverDuration = (arrivalTime, departureTime) => {
    const arrival = new Date(arrivalTime);
    const departure = new Date(departureTime);
    const duration = new Date(departure - arrival);
    const hours = duration.getUTCHours();
    const minutes = duration.getUTCMinutes();
    return hours * 60 + minutes;
  };

  const renderBaggageInfo = (flight) => {
    const checkedBags = flight.price.includedCheckedBags?.weight || 0;
    const cabinBag = flight.price.includedCabinBags?.weight || 0;
    
    return (
      <div className="flex items-center">
        <GiBackpack className={`text-blue-500 mr-2`} title="Artículo personal" />
        <FaSuitcaseRolling className={`mr-2 ${cabinBag > 0 ? 'text-blue-500' : 'text-gray-300'}`} title="Equipajer de cabina" />
        <FaSuitcase className={`mr-2 ${checkedBags > 0 ? 'text-blue-500' : 'text-gray-300'}`} title="Equipaje facturado" />
      </div>
    );
  };

  const filteredResults = applyFilters(results);
  const paginatedResults = filteredResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const t = translations[selectedLanguage];

  const getUniqueAirlines = () => {
    const airlines = new Set();
    results.forEach(flight => {
      flight.itineraries.forEach(itinerary => {
        itinerary.segments.forEach(segment => {
          airlines.add(segment.carrierCode);
        });
      });
    });
    return Array.from(airlines);
  };

  const uniqueAirlines = getUniqueAirlines();

  const initialSearchParams = {
    origin,
    destination,
    departureDate,
    returnDate,
    adults,
  };

  const [expandedFlights, setExpandedFlights] = useState({});

  const toggleExpand = (flightIndex) => {
    setExpandedFlights((prevExpandedFlights) => ({
      ...prevExpandedFlights,
      [flightIndex]: !prevExpandedFlights[flightIndex],
    }));
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{t.error}: {error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header selectedCurrency={selectedCurrency} onCurrencyChange={handleCurrencyChange} selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />
      
      <div className="bg-grey p-4 hidden md:block" >
        <div className="container mx-auto">
          <FlightSearch onSelectFlight={handleSearchSelectFlight} initialSearchParams={initialSearchParams} />
        </div>
      </div>

      <div className="container mx-auto p-1 grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-2 bg-gray-100 p-4">
          <FlightFilters filters={filters} setFilters={setFilters} selectedLanguage={selectedLanguage} uniqueAirlines={uniqueAirlines} />
        </div>
        <div className="md:col-span-9 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{t.flightResults}</h2>
          <ul className="mt-4">
            {paginatedResults.length > 0 ? (
              paginatedResults.map((flight, index) => (
                <li key={index} className="border-b py-4">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <p className="text-2xl font-bold">
                      {formatCurrency(convertCurrency(parseFloat(flight.price.total), selectedCurrency), selectedCurrency)}
                    </p>
                    <button onClick={() => handleSelectFlight(flight)} className="bg-orange-500 text-white py-2 px-4 rounded-md">
                      {t.selectFlight}
                    </button>
                  </div>
              
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    {flight.itineraries.map((itinerary, itineraryIndex) => (
                      <div key={itineraryIndex} className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">
                          {itineraryIndex === 0 ? t.departure : t.return}
                        </h3>
                        <div>
                          <div className="flex items-center mb-2">
                            <CustomImage
                              src={`https://logo.clearbit.com/${airlineNames[itinerary.segments[0].carrierCode] || itinerary.segments[0].carrierCode}.com`}
                              alt={itinerary.segments[0].carrierCode}
                              className="w-10 h-10 mr-4"
                            />
                            <div>
                              <p className="text-sm">
                                {airlineNames[itinerary.segments[0].carrierCode] || itinerary.segments[0].carrierCode}
                              </p>
                              <p>{itinerary.segments[0].carrierCode}  {itinerary.segments[0].number}</p>
                          
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row justify-between mb-2">
                            <div className="flex flex-col items-start md:items-center mb-2 md:mb-0">
                              <p className="text-sm">
                                {new Date(itinerary.segments[0].departure.at).toLocaleTimeString('en-GB', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: false,
                                })}
                              </p>
                              <p className="text-sm">
                                {itinerary.segments[0].departure.iataCode} - {iataToCity[itinerary.segments[0].departure.iataCode]}
                              </p>
                            </div>
                            <div className="flex items-center mb-2 md:mb-0 w-full relative">
                              <div className="h-px bg-gray-500 flex-grow mx-2"></div>
                              <FaPlane className="absolute left-1/2 transform -translate-x-1/2 text-blue-500" />
                              <div className="absolute left-1/2 transform -translate-x-1/2 mt-10">
                                <p className="text-sm">{t.duration}: {calculateTotalDuration(itinerary.segments)}</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-start md:items-center">
                              <p className="text-sm">
                                {new Date(itinerary.segments[itinerary.segments.length - 1].arrival.at).toLocaleTimeString('en-GB', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: false,
                                })}
                              </p>
                              <p className="text-sm">
                                {itinerary.segments[itinerary.segments.length - 1].arrival.iataCode} - {iataToCity[itinerary.segments[itinerary.segments.length - 1].arrival.iataCode]}
                              </p>
                              {renderBaggageInfo(flight)}
                            </div>
                          </div>
                          {itinerary.segments.length > 1 && (
                            <div className="mt-4">
                              <button
                                onClick={() => toggleExpand(index)}
                                className="flex items-center text-blue-500"
                              >
                                {expandedFlights[index] ? (
                                  <>
                                    <FaChevronUp className="mr-2" /> {t.hideStopovers}
                                  </>
                                ) : (
                                  <>
                                    <FaChevronDown className="mr-2" /> {t.showStopovers} {t.stops}
                                  </>
                                )}
                              </button>
                              {expandedFlights[index] && (
                                <div className="mt-2">
                                  {itinerary.segments.slice(1).map((segment, segmentIndex) => (
                                    <div key={segmentIndex} className="mt-4 border-t pt-4">
                                      <div className="flex items-center mb-2">
                                        <CustomImage
                                          src={`https://logo.clearbit.com/${airlineNames[segment.carrierCode] || segment.carrierCode}.com`}
                                          alt={segment.carrierCode}
                                          className="w-10 h-10 mr-4"
                                        />
                                        <div>
                                          <p className="text-sm">
                                            {airlineNames[segment.carrierCode] || segment.carrierCode}
                                          </p>
                                          <p>{segment.carrierCode} {segment.number}</p>
                                    
                                        </div>
                                      </div>
                                      <div className="flex flex-col md:flex-row justify-between mb-2">
                                        <div className="flex flex-col items-start md:items-center mb-2 md:mb-0">
                                          <p className="text-sm bold">
                                            {new Date(segment.departure.at).toLocaleTimeString('en-GB', {
                                              hour: '2-digit',
                                              minute: '2-digit',
                                              hour12: false,
                                            })}
                                          </p>
                                          <p className="font-light">
                                            {segment.departure.iataCode} - {iataToCity[segment.departure.iataCode]}
                                          </p>
                                        </div>
                                        <div className="flex items-center mb-2 md:mb-0 w-full relative">
                                          <div className="h-px bg-gray-500 flex-grow mx-2"></div>
                                          <FaPlane className="absolute left-1/2 transform -translate-x-1/2 text-blue-500" />
                                          <div className="absolute left-1/2 transform -translate-x-1/2 mt-6">
                                            <p className="text-sm">{t.duration}: {formatDuration(parseDuration(segment.duration))}</p>
                                          </div>
                                        </div>
                                        <div className="flex flex-col items-start md:items-center">
                                          <p className="text-sm">
                                            {new Date(segment.arrival.at).toLocaleTimeString('en-GB', {
                                              hour: '2-digit',
                                              minute: '2-digit',
                                              hour12: false,
                                            })}
                                          </p>
                                          <p className="text-sm">
                                            {segment.arrival.iataCode} - {iataToCity[segment.arrival.iataCode]}
                                          </p>
                                          {renderBaggageInfo(flight)}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </li>
              ))
            ) : (
              <p>{t.noResults}</p>
            )}
          </ul>
          {filteredResults.length > itemsPerPage && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
              >
                {t.previous}
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage * itemsPerPage >= filteredResults.length}
                className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
              >
                {t.next}
              </button>
            </div>
          )}
        </div>
      
      </div>
      <Footer></Footer>
    </div>
  );
};

export default FlightResultsContent;
