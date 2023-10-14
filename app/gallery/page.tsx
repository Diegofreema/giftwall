'use client';
import { eventImages, videos } from '@/exports';
import { Image, Title } from '@mantine/core';
import React from 'react';
import { motion } from 'framer-motion';
type Props = {};
const text = ['Our', 'Gallery'];
const MotionTitle = motion(Title);
const page = (props: Props) => {
  return (
    <div className="min-h-screen py-[110px] px-4">
      <div className="!w-[90%] mx-auto flex flex-col md:flex-row  md:space-x-3 my-16 ">
        {text.map((item, index) => (
          <MotionTitle
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.3 }}
            key={index}
            className="!text-3xl md:!text-6xl font-semibold   tracking-wider text-yellow-400"
          >
            {item}
          </MotionTitle>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8">
        {eventImages.map((img, i) => (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            key={i}
            className="overflow-hidden rounded-md"
          >
            <Image
              key={i}
              src={img.url}
              alt={'img'}
              w={'100%'}
              h={'200px'}
              fit={'cover'}
              radius={10}
            />
          </motion.div>
        ))}
        {videos.map((item, index) => (
          <motion.video
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            key={index}
            width="100%"
            height="300px"
            src={item.url}
            controls
            className="rounded-xl"
          ></motion.video>
        ))}
      </div>
    </div>
  );
};

export default page;
