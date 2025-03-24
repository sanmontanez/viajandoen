"use client";

import React, { Suspense } from 'react';
import CheckoutContent from './CheckoutContent';

const CheckoutPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
};

export default CheckoutPage;
