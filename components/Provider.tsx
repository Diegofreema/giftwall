'use client';
import React, { useState } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const initialOptions = {
  clientId: 'test',
  currency: 'USD',
  intent: 'capture',
};

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <PayPalScriptProvider options={initialOptions}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </PayPalScriptProvider>
  );
};

export default Provider;
