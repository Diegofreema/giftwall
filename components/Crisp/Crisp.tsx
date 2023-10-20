'use client';
import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';
export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('1c9be1d9-5897-4c80-ac54-f208e0bc8880');
  }, []);

  return null;
};
