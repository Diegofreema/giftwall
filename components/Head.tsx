import React from 'react';

type Props = {
  title: string;
  description: string;
};

const Head = ({ title, description }: Props) => {
  const appTitle = `BehindMaryGiftwall Foundation | ${title}`;
  return (
    <>
      <title>{appTitle} </title>
      <meta name="description" content={description} />
    </>
  );
};

export default Head;
