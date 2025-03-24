'use client';

import React, { useEffect, useState } from 'react';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions');
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  if (!transactions || transactions.length === 0) {
    return <div>No transactions found.</div>;
  }

  return (
    <ul>
      {transactions.map((transaction, index) => (
        <li key={index} className="border-b py-4">
          <p><strong>Transaction ID:</strong> {transaction.orderId}</p>
          <p><strong>Name:</strong> {transaction.passengerData.firstName} {transaction.passengerData.lastName}</p>
          <p><strong>Email:</strong> {transaction.passengerData.email}</p>
          <p><strong>Phone:</strong> {transaction.passengerData.phone}</p>
          <p><strong>Amount:</strong> {transaction.paymentDetails && transaction.paymentDetails.amount ? transaction.paymentDetails.amount : 'N/A'}</p>
          <p><strong>Booking Reference:</strong> {transaction.bookingDetails && transaction.bookingDetails.bookingReference ? transaction.bookingDetails.bookingReference : 'N/A'}</p>
          <p><strong>Date:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>
        </li>
      ))}
    </ul>
  );
};

export default TransactionsList;
