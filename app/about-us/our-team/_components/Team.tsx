'use client';
import React from 'react';
import { people } from '@/exports';
import { Container, Text, Title, Image as Img, Stack } from '@mantine/core';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { TeamProps } from '@/lib/types';
const text = ['Our', 'Team'];
const MotionImage = motion(Image);
const MotionTitle = motion(Title);
const MotionStack = motion(Stack);
const Team: React.FC<TeamProps> = ({ team }) => {
  const profile = team?.map((item, index) => (
    <MotionStack
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      align="center"
      key={index}
      fw={'bold'}
      className="!text-base md:!text-lg"
    >
      <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden ">
        <Img
          src={item?.imgUrl}
          alt="img"
          className="object-cover"
          width={200}
          height={200}
        />
      </div>
      <Text fw={'bold'} className="text-purple-900">
        {item?.name.toUpperCase()}
      </Text>
      <Text fw={'bold'} className="text-purple-900">
        {item?.job}
      </Text>
    </MotionStack>
  ));
  return (
    <div className="min-h-screen py-[130px]">
      <div className="!w-[90%] mx-auto mb-10">
        {text.map((item, index) => (
          <MotionTitle
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.3 }}
            viewport={{ once: true }}
            key={index}
            className="!text-3xl md:!text-6xl  font-semibold   tracking-wider text-yellow-400"
          >
            {item}
          </MotionTitle>
        ))}
      </div>
      <div className="w-full h-[300px] overflow-hidden relative">
        <MotionImage
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          src={'/j4.jpeg'}
          alt="img"
          fill
          priority
          className="object-fill"
        />
      </div>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 space-y-10 mt-10 sm:mt-20">
          {profile}
        </div>
      </Container>
    </div>
  );
};

export default Team;
