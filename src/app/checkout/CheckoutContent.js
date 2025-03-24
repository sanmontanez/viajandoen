import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import StripeCheckoutButton from '@/components/StripeCheckoutButton';
import TransbankCheckoutButton from '@/components/TransbankCheckoutButton';
import PassengerForm from '@/components/PassengerForm';
import airlineNames from '@/utils/airlineNames';
import Header from '@/components/Header';
import { formatCurrency } from '@/utils/formatCurrency';
import translations from '@/utils/translations';
import { FaSuitcase, FaLuggageCart } from 'react-icons/fa';
import { GiBackpack } from 'react-icons/gi';
import Footer from '@/components/Footer';

const validCoupons = {
  'DISCOUNT10': 0.10, // 10% de descuento
  'DISCOUNT20': 0.20  // 20% de descuento
};

const CheckoutContent = () => {
  const searchParams = useSearchParams();
  const [selectedFlights, setSelectedFlights] = useState([]);
  const [passengerData, setPassengerData] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('CLP');
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [exchangeRates, setExchangeRates] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const selectedFlightsParam = searchParams.get('selectedFlights');
    if (selectedFlightsParam) {
      try {
        const parsedFlights = JSON.parse(decodeURIComponent(selectedFlightsParam));
        setSelectedFlights(parsedFlights);
      } catch (error) {
        console.error('Error parsing selected flights:', error);
      }
    }

    const fetchExchangeRates = async () => {
      try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
        const data = await res.json();
        setExchangeRates(data.rates);
      } catch (err) {
        console.error("Error fetching exchange rates:", err);
      }
    };

    fetchExchangeRates();
  }, [searchParams]);

  const handlePassengerSubmit = (data) => {
    setPassengerData(data);
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const applyCoupon = () => {
    if (validCoupons[coupon]) {
      setDiscount(validCoupons[coupon]);
    } else {
      setDiscount(0);
      alert('Invalid coupon code');
    }
  };

  const convertCurrency = (amount, currency) => {
    if (!exchangeRates[currency]) return amount;
    const rate = exchangeRates[currency];
    return (amount * rate).toFixed(2);
  };

  const calculateTotal = () => {
    let total = selectedFlights.reduce((total, flight) => {
      let flightTotal = parseFloat(flight.price.total);
      return total + flightTotal;
    }, 0);

    total = total * (1 - discount); // Aplicar descuento
    return convertCurrency(total, selectedCurrency);
  };

  const t = translations[selectedLanguage];

  const renderBaggageInfo = (flight) => {
    const fareDetails = flight.travelerPricings[0].fareDetailsBySegment[0];
    const includedCheckedBags = fareDetails.includedCheckedBags;
    const cabinBag = fareDetails.includedCabinBags?.weight || 0;
    const cabinBagUnit = fareDetails.includedCabinBags?.weightUnit || '';

    return (
      <div className="mt-2">
        <p className="font-semibold">{t.includedBaggage}:</p>
        <div className="flex items-center mt-1">
          <GiBackpack className="text-blue-500 mr-2" title={t.personalItem} />
          <span className="text-sm mr-4">{t.personalItem}</span>
          
          {cabinBag > 0 && (
            <>
              <FaLuggageCart className="text-blue-500 mr-2" title={t.cabinBaggage} />
              <span className="text-sm mr-4">{t.cabinBaggage}: {`${cabinBag}${cabinBagUnit}`}</span>
            </>
          )}
          
          {includedCheckedBags && includedCheckedBags.quantity > 0 && (
            <>
              <FaSuitcase className="text-blue-500 mr-2" title={t.checkedBaggage} />
              <span className="text-sm">{t.checkedBaggage}: {includedCheckedBags.quantity}</span>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Header selectedCurrency={selectedCurrency} onCurrencyChange={handleCurrencyChange} selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />
      <div className="flex flex-col md:flex-row w-full max-w-7xl bg-white p-4 md:p-8 rounded-lg shadow-md mt-8">
        <div className="w-full md:w-2/3 p-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-left">{t.passengerInfo}</h2>
          <PassengerForm onSubmit={handlePassengerSubmit} selectedLanguage={selectedLanguage}/>
          {passengerData && (
            <div className="mt-6 w-full max-w-7xl">
              <h3 className="text-xl font-bold mb-4">{t.selectPaymentMethod}</h3>
              <div className="mb-4">
                <label className="block mb-2">{t.paymentMethod}</label>
                <div>
                  <label className="mr-4">
                    <input 
                      type="radio" 
                      value="stripe" 
                      checked={paymentMethod === 'stripe'} 
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    Stripe
                  </label>
                  <label className="mr-4">
                    <input 
                      type="radio" 
                      value="transbank" 
                      checked={paymentMethod === 'transbank'} 
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    Transbank
                  </label>
                </div>
              </div>
              {paymentMethod === 'stripe' && (
                <StripeCheckoutButton 
                  amount={calculateTotal()} 
                  passengerData={passengerData} 
                  flightData={selectedFlights}
                />
              )}
              {paymentMethod === 'transbank' && (
                <TransbankCheckoutButton 
                  amount={calculateTotal()} 
                  passengerData={passengerData} 
                  flightData={selectedFlights}
                />
              )}
            </div>
          )}
        </div>
        <div className="w-full md:w-1/3 p-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-left">{t.flightItinerary}</h2>
          <ul>
            {selectedFlights.map((flight, index) => (
              <li key={index} className="border-b py-4">
                <div>
                  <p className="text-lg font-semibold">{t.price}: {formatCurrency(convertCurrency(flight.price.total, selectedCurrency), selectedCurrency)}</p>
                  {renderBaggageInfo(flight)}
                  {flight.itineraries.map((itinerary, itineraryIndex) => (
                    <div key={itineraryIndex} className="mt-4">
                      <p className="text-xl font-semibold">{t.itinerary} {itineraryIndex + 1}</p>
                      {itinerary.segments.map((segment, segmentIndex) => (
                        <div key={segment.id} className="mt-2">
                          <p className="font-medium">{t.segment} {segmentIndex + 1}:</p>
                          <p>{t.from}: <span className="font-semibold">{segment.departure.iataCode}</span> {t.at} <span className="font-semibold">{new Date(segment.departure.at).toLocaleString()}</span></p>
                          <p>{t.to}: <span className="font-semibold">{segment.arrival.iataCode}</span> {t.at} <span className="font-semibold">{new Date(segment.arrival.at).toLocaleString()}</span></p>
                          <p>{t.airline}: <span className="font-semibold">
                            {airlineNames[segment.carrierCode] || segment.carrierCode || 'Unknown Airline'}
                          </span></p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-xl font-bold">
              {t.total}: {formatCurrency(calculateTotal(), selectedCurrency)}
            </p>
            <div className="mt-2">
              <label className="block mb-2">{t.couponCode}</label>
              <input
                type="text"
                value={coupon}
                onChange={handleCouponChange}
                className="border p-2 rounded w-full"
              />
              <button onClick={applyCoupon} className="mt-2 bg-blue-500 text-white p-2 rounded">
                {t.applyCoupon}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutContent;
