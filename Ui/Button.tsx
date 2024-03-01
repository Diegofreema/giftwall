import { Button } from '@mantine/core';

import React from 'react';
interface Props {
  children: React.ReactNode;
  rightSection?: React.ReactNode;
  onClick?: () => void;
}
const MyButton = ({ children, rightSection, onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      className="!bg-yellow-400 z-30 hover:!text-black transition group rounded-full "
      rightSection={rightSection}
    >
      {children}
    </Button>
  );
};

export default MyButton;
