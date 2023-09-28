import { Button } from '@mantine/core';

import React from 'react';
interface Props {
  children: React.ReactNode;
  rightSection?: React.ReactNode;
}
const MyButton = ({ children, rightSection }: Props) => {
  return (
    <Button
      className="!bg-yellow-400 z-30 hover:!text-black transition group rounded-full "
      rightSection={rightSection}
    >
      {children}
    </Button>
  );
};

export default MyButton;
