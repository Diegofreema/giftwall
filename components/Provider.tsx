'use client';
import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const initialOptions = {
  clientId: 'test',
  currency: 'USD',
  intent: 'capture',
};
const query = new QueryClient();
const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <QueryClientProvider client={query}>{children}</QueryClientProvider>
    </PayPalScriptProvider>
  );
};

export default Provider;
