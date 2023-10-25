'use client';
import { eventImages, videos } from '@/exports';
import { Image, Title } from '@mantine/core';
import React from 'react';
import { motion } from 'framer-motion';
import { GalleryProps } from '@/lib/types';

const text = ['Our gallery'];
const MotionTitle = motion(Title);

const Gallery = ({ images, videos }: GalleryProps) => {
  const displayVideos =
    videos?.length > 0 &&
    videos?.map((video, i) => (
      <motion.video
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        key={i}
        width="100%"
        height="300px"
        src={video?.videoUrl}
        controls
        className="rounded-xl"
      ></motion.video>
    ));

  const displayImages =
    images?.length > 0 &&
    images?.map((img, i) => (
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
          src={img?.imgUrl}
          alt={'img'}
          w={'100%'}
          h={'200px'}
          fit={'cover'}
          radius={10}
        />
      </motion.div>
    ));

  const galleryIsEmpty = images?.length === 0 && videos?.length === 0;
  return (
    <div className="min-h-screen py-[110px] px-4">
      <div className="!w-[90%] mx-auto flex flex-col md:flex-row  md:space-x-3 my-16 ">
        {text.map((item, index) => (
          <MotionTitle
            ta={'center'}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.3 }}
            key={index}
            className="!text-3xl md:!text-6xl !text-center w-full font-semibold   tracking-wider text-yellow-400"
          >
            {item}
          </MotionTitle>
        ))}
      </div>
      {!galleryIsEmpty && (
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8">
          {displayImages}
          {displayVideos}
        </div>
      )}
      {galleryIsEmpty && (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-semibold">No images/videos available</h1>
        </div>
      )}
    </div>
  );
};

export default Gallery;
