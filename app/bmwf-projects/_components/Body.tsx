'use client';
import { eventImages, videos } from '@/exports';
import { ProjectProps } from '@/lib/types';
import { Image, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import React from 'react';

const text = ['BMWF Projects'];
const MotionTitle = motion(Title);
// @ts-ignore
const MotionImage = motion(Image);
const Body: React.FC<ProjectProps> = ({ project, videos }) => {
  const displayProjectImages =
    project.length > 0 &&
    project.map((item, i) => (
      <div key={i}>
        <div className="overflow-hidden rounded-md">
          {/* @ts-ignore */}
          <MotionImage
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            src={item?.imgUrl}
            className="!w-full"
            h={'300px'}
            fit={'cover'}
            radius={10}
          />
          <p className="mt-4 font-bold text-center">{item?.name}</p>
        </div>
      </div>
    ));
  const displayProjectVideo =
    videos?.length > 0 &&
    videos?.map((item, i) => (
      <div key={i}>
        <div className="overflow-hidden rounded-md">
          <motion.video
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            key={i}
            width="100%"
            height="300px"
            src={item?.videoUrl}
            className="rounded-xl"
            controls
          ></motion.video>

          <p className="mt-4 font-bold text-center">{item?.name}</p>
        </div>
      </div>
    ));
  const emptyText = videos?.length === 0 && project?.length === 0;
  return (
    <div className="min-h-screen py-[110px] px-4">
      <div className="!w-[90%] mx-auto  my-16 ">
        {text.map((item, index) => (
          <MotionTitle
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.3 }}
            viewport={{ once: true }}
            key={index}
            className="!text-3xl md:!text-6xl font-semibold text-center   tracking-wider text-yellow-400"
          >
            {item}
          </MotionTitle>
        ))}
      </div>
      {!emptyText && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayProjectImages}
          {displayProjectVideo}
        </div>
      )}
      {emptyText && (
        <div className="w-full h-screen flex item-center justify-center">
          <h1 className="font-bold text-3xl text-center">No Projects yet</h1>
        </div>
      )}
    </div>
  );
};

export default Body;
