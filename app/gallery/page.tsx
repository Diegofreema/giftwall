import { eventImages, videos } from '@/exports';
import { Image, Title } from '@mantine/core';
import React from 'react';

type Props = {};
const text = ['Our', 'Gallery'];
const page = (props: Props) => {
  return (
    <div className="min-h-screen py-[110px] px-4">
      <div className="!w-[90%] mx-auto flex flex-col md:flex-row  md:space-x-3 my-16 ">
        {text.map((item, index) => (
          <Title
            key={index}
            className="!text-3xl md:!text-6xl font-semibold   tracking-wider text-yellow-400"
          >
            {item}
          </Title>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {eventImages.map((img, i) => (
          <Image
            key={i}
            src={img.url}
            alt={'img'}
            w={'100%'}
            h={'300px'}
            fit={'cover'}
            radius={10}
          />
        ))}
        {videos.map((item, index) => (
          <iframe
            key={index}
            width="100%"
            height="300px"
            src={item.url}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl"
          />
        ))}
      </div>
    </div>
  );
};

export default page;
