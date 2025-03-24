"use client";

import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import translations from '@/utils/translations';
import countries from '@/utils/countries'; // Asegúrate de crear este archivo con la lista de países

const PassengerForm = ({ onSubmit, selectedLanguage }) => {
  const [passengerData, setPassengerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    documentType: 'rut',
    documentNumber: '',
    documentExpirationDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassengerData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setPassengerData(prevData => ({
      ...prevData,
      phone: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(passengerData);
  };

  const t = translations[selectedLanguage] || {};

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700">{t.firstName || 'First Name'}</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={passengerData.firstName}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700">{t.lastName || 'Last Name'}</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={passengerData.lastName}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">{t.email || 'Email'}</label>
          <input
            id="email"
            type="email"
            name="email"
            value={passengerData.email}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700">{t.phone || 'Phone'}</label>
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="CL"
            value={passengerData.phone}
            onChange={handlePhoneChange}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="block text-gray-700">{t.dateOfBirth || 'Date of Birth'}</label>
          <input
            id="dateOfBirth"
            type="date"
            name="dateOfBirth"
            value={passengerData.dateOfBirth}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-gray-700">{t.gender || 'Gender'}</label>
          <select
            id="gender"
            name="gender"
            value={passengerData.gender}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
            required
          >
            <option value="">{t.selectGender || 'Select Gender'}</option>
            <option value="male">{t.male || 'Male'}</option>
            <option value="female">{t.female || 'Female'}</option>
            <option value="other">{t.other || 'Other'}</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="nationality" className="block text-gray-700">{t.nationality || 'Nationality'}</label>
          <select
            id="nationality"
            name="nationality"
            value={passengerData.nationality}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
            required
          >
            <option value="">{t.selectNationality || 'Select Nationality'}</option>
            {countries.map(country => (
              <option key={country.code} value={country.code}>{country.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="documentType" className="block text-gray-700">{t.documentType || 'Document Type'}</label>
          <select
            id="documentType"
            name="documentType"
            value={passengerData.documentType}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
            required
          >
            <option value="rut">RUT</option>
            <option value="passport">{t.passport || 'Passport'}</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="documentNumber" className="block text-gray-700">{t.documentNumber || 'Document Number'}</label>
          <input
            id="documentNumber"
            type="text"
            name="documentNumber"
            value={passengerData.documentNumber}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="documentExpirationDate" className="block text-gray-700">{t.documentExpirationDate || 'Document Expiration Date'}</label>
          <input
            id="documentExpirationDate"
            type="date"
            name="documentExpirationDate"
            value={passengerData.documentExpirationDate}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
            required
          />
        </div>
      </div>
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md">
        {t.continue || 'Continue'}
      </button>
    </form>
  );
};

export default PassengerForm;