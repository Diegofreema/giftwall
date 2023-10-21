'use client';
import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';
export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('257e42db-9e4b-4df5-a734-3e2467cf7dc4');
  }, []);

  return null;
};
