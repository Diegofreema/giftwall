'use client';
import { eventImages, videos } from '@/exports';
import { Image, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import React from 'react';

type Props = {};
const text = ['BMWF', 'Projects'];
const MotionTitle = motion(Title);
// @ts-ignore
const MotionImage = motion(Image);
const page = (props: Props) => {
  return (
    <div className="min-h-screen py-[110px] px-4">
      <div className="!w-[90%] mx-auto  my-16 ">
        {text.map((item, index) => (
          <MotionTitle
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.3 }}
            viewport={{ once: true }}
            key={index}
            className="!text-3xl md:!text-6xl font-semibold   tracking-wider text-yellow-400"
          >
            {item}
          </MotionTitle>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {eventImages.map((img, i) => (
          <div key={i} className="overflow-hidden rounded-md">
            {/* @ts-ignore */}
            <MotionImage
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              key={i}
              src={img.url}
              className="!w-full"
              h={'300px'}
              fit={'cover'}
              radius={10}
            />
          </div>
        ))}
        {videos.map((item, index) => (
          <motion.video
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            key={index}
            width="100%"
            height="300px"
            src={item.url}
            className="rounded-xl"
            controls
          ></motion.video>
        ))}
      </div>
    </div>
  );
};

export default page;
