import { serviceText } from '@/exports';
import { Container, Group, Text, Title } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import VolunteerForm from '../_components/VolunteerForm';

type Props = {};

const text = ['Become', 'A', 'Volunteer'];

const page = (props: Props) => {
  return (
    <div className="min-h-screen py-[130px]">
      <div className="!w-[90%] mx-auto flex flex-col md:flex-row  md:space-x-3 mb-16 mt-5">
        {text.map((item, index) => (
          <Title
            key={index}
            className="!text-3xl md:!text-6xl font-semibold   tracking-wider text-yellow-400"
          >
            {item}
          </Title>
        ))}
      </div>
      <div className="w-full h-[300px] overflow-hidden relative">
        <Image
          src={'/foundation.jpeg'}
          alt="img"
          fill
          priority
          className="object-cover"
        />
      </div>
      <Container>
        <VolunteerForm />
      </Container>
    </div>
  );
};

export default page;
