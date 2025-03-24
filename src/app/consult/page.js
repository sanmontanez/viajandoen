"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ConsultaCompra() {
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/consultaCompra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, lastName }),
      });

      if (!res.ok) {
        throw new Error('Compra no encontrada');
      }

      const data = await res.json();
      setResults(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching purchase data:', error);
      setResults([]);
      setError('Compra no encontrada');
    }
  };

  const formatAmount = (amount, currency) => {
    if (currency === 'usd') {
      // Si la moneda es "usd" pero el monto está en CLP, lo convertimos
      amount = amount / 100; // Ajuste si está en centavos
    }
    return parseFloat(amount).toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <>
      <Header />
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto pt-10 pb-10 mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Consulta tu Compra</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Ingresa tu correo electrónico"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Apellido</label>
            <input 
              type="text" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Ingresa tu apellido"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded-full font-bold">
              Consultar
            </button>
          </div>
        </form>
        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
        {results.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Detalles de las Compras</h3>
            {results.map((result, idx) => (
              <div key={idx} className="mb-6">
                <p className="text-lg font-bold">Compra {idx + 1}</p>
                <p><strong>Nombre:</strong> {result.passengerData?.firstName} {result.passengerData?.lastName}</p>
                <p><strong>Correo Electrónico:</strong> {result.passengerData?.email}</p>
                <p><strong>Teléfono:</strong> {result.passengerData?.phone}</p>
                <p><strong>Detalles del Vuelo:</strong></p>
                {result.flightData?.map((flight, index) => (
                  <div key={index} className="mb-4 p-4 border rounded">
                    <p><strong>Fecha emisión:</strong> {flight.lastTicketingDate}</p>
                    <div>
                      <strong>Itinerarios:</strong>
                      {flight.itineraries?.map((itinerary, idx) => (
                        <div key={idx}>
                          {itinerary.segments?.map((segment, segIdx) => (
                            <div key={segIdx}>
                              <p><strong>Segmento {segIdx + 1}:</strong></p>
                              <p><strong>Origen:</strong> {segment.departure.iataCode} ({segment.departure.at})</p>
                              <p><strong>Destino:</strong> {segment.arrival.iataCode} ({segment.arrival.at})</p>
                              <p><strong>Aerolínea:</strong> {segment.carrierCode}</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <p><strong>Monto:</strong> {formatAmount(result.paymentDetails?.amount, result.paymentDetails?.currency)}</p>
                <p><strong>Referencia de Reserva:</strong> {result.bookingDetails?.bookingReference}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
