'use client';

import React, { Suspense } from 'react';
import ConfirmationContent from './ConfirmationContent';

const ConfirmationPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
};

export default ConfirmationPage;
