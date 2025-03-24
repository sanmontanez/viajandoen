import React from 'react';
import TransactionsList from '../../components/TransactionsList';

const TransactionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <TransactionsList />
      </div>
    </div>
  );
};

export default TransactionsPage;
