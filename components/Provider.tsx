'use client';
import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
const initialOptions = {
  clientId: 'test',
  currency: 'USD',
  intent: 'capture',
};
const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  );
};

export default Provider;
