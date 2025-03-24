"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import FlightSearch from '@/components/FlightSearch';

// Cargar dinámicamente el componente FlightResultsContent
const FlightResultsContent = dynamic(() => import('./FlightResultsContent'), {
  loading: () => <Loading />,
  ssr: false, // Opcional: desactiva la renderización del lado del servidor si es necesario
});

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <svg
          className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12H4z"
          ></path>
        </svg>
        <p className="text-gray-700 text-lg">Cargando...</p>
      </div>
    </div>
  );
};

const ResultsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
    
        <FlightResultsContent />
  
    </div>
  );
};

export default ResultsPage;
