"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function Header({ selectedCurrency, onCurrencyChange, selectedLanguage, onLanguageChange }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold text-red-500">Viajandoen</a>
        </Link>
        <div className="flex items-center">
          <div className="block md:hidden">
            <button onClick={toggleMenu} className="text-gray-500 dark:text-gray-300 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
          <nav className={`flex-col md:flex-row items-center space-x-4 ${menuOpen ? 'flex' : 'hidden'} md:flex`}>
            <ul className="flex flex-col md:flex-row md:space-x-4">
              <li><a href="#" className="hover:underline text-gray-700 dark:text-gray-300">+56 976430038</a></li>
            </ul>
            <div className="flex flex-col md:flex-row md:items-center mt-4 md:mt-0">
              <div className="flex items-center">
                <label htmlFor="currency" className="mr-2 text-gray-700 dark:text-gray-300"></label>
                <select
                  id="currency"
                  value={selectedCurrency}
                  onChange={onCurrencyChange}
                  className="p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-300"
                >
                  <option value="CLP">CLP</option>
                 
                </select>
              </div>
              <div className="flex items-center mt-4 md:mt-0 md:ml-4">
                <label htmlFor="language" className="mr-2 text-gray-700 dark:text-gray-300">Languaje:</label>
                <select
                  id="language"
                  value={selectedLanguage}
                  onChange={onLanguageChange}
                  className="p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-300"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  {/* Agrega más opciones de idioma según sea necesario */}
                </select>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
