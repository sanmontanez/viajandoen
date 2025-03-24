'use client';

import { Suspense } from 'react';
import PaymentResponseContent from './PaymentResponseContent';

const PaymentResponse = () => {
  return (
    <Suspense fallback={<div>Processing payment...</div>}>
      <PaymentResponseContent />
    </Suspense>
  );
};

export default PaymentResponse;