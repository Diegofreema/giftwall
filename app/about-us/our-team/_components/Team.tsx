'use client';
import React from 'react';
import { Container, Text, Title, Stack } from '@mantine/core';

import { motion } from 'framer-motion';
import { TeamProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
const text = ['Our team'];
// const MotionImage = motion(Image);
const MotionTitle = motion(Title);
const MotionStack = motion(Stack);
const Team: React.FC<TeamProps> = ({ team }) => {
  const profile = team?.map((item, index) => (
    <MotionStack
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      align="center"
      key={index}
      fw={'bold'}
      className={cn('!text-base md:!text-lg', index === 0 && ' mt-10')}
    >
      <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden ">
        <Image
          src={item?.imgUrl}
          alt="img"
          fill
          priority
          className="object-cover"
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
      <div className="w-[90%] md:w-[80%] mx-auto h-[300px]  rounded-md md:h-[400px] relative overflow-hidden ">
        <Image
          src={'/bmt.jpg'}
          alt="img"
          fill
          priority
          className="!object-center "
        />
      </div>
      <div className="!w-[90%] mx-auto my-10">
        {text.map((item, index) => (
          <MotionTitle
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.3 }}
            viewport={{ once: true }}
            key={index}
            className="!text-3xl md:!text-7xl !mb-10 font-semibold !text-center   tracking-wider text-purple-900"
          >
            {item}
          </MotionTitle>
        ))}
      </div>
      <Container>
        <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 space-y-10 mt-10 sm:mt-20">
          {profile}
        </div>
      </Container>
    </div>
  );
};

export default Team;
