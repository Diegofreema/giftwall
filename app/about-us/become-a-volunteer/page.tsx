'use client';

import { Container, Title } from '@mantine/core';
import Image from 'next/image';
import VolunteerForm from '../_components/VolunteerForm';
import { motion } from 'framer-motion';

type Props = {};

const text = ['Become a volunteer'];
const MotionImage = motion(Image);
const MotionTitle = motion(Title);
const page = (props: Props) => {
  return (
    <div className="min-h-screen py-[130px]">
      <div className="w-[90%] mx-auto h-[300px] overflow-hidden relative">
        <MotionImage
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          src={'/foundation.jpeg'}
          alt="img"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="!w-[90%] mx-auto  my-16 mt-5">
        {text.map((item, index) => (
          <MotionTitle
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.3 }}
            key={index}
            className="!text-3xl block md:!text-6xl font-semibold text-center   tracking-wider text-purple-900"
          >
            {item}
          </MotionTitle>
        ))}
      </div>
      <Container>
        <VolunteerForm />
      </Container>
    </div>
  );
};

export default page;
