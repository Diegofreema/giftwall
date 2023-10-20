'use client';

import { useEffect, useState } from 'react';
import { CrispChat } from './Crisp';

export const CrispProvider = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div className="">
      <CrispChat />
    </div>
  );
};
