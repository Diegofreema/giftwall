import { serviceText } from '@/exports';
import { Container, Group, Text, Title } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

type Props = {};

const text = ['Our', 'Priorities'];
const words = serviceText?.map((item, index) => (
  <Group
    id={item.id}
    key={index}
    fw={'bold'}
    className="!text-base md:!text-lg"
  >
    <Title>{item.title}</Title>
    <Text>{item.text}</Text>
  </Group>
));
const page = (props: Props) => {
  return (
    <div className="min-h-screen py-[130px]">
      <div className="!w-[90%] mx-auto">
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
        <div className="grid grid-cols-1 space-y-8 mt-10">
          {words}
          <Group fw={'bold'} className="!text-base md:!text-lg space-y-3">
            <Text>
              {' '}
              Lack of income can lead to financial stress. Food assistance
              programs alleviate some of this burden by addressing a fundamental
              need, allowing recipients to allocate limited resources to other
              necessities. Providing food aid to this demographic demonstrates
              care and respect for their dignity, reinforcing their sense of
              belonging and worth within the community.
            </Text>
            <Text>
              Access to nutritious food supports overall health, reduces the
              risk of malnutrition-related health issues, and can help manage
              chronic conditions common among elderly individuals.These programs
              can act as a safety net during emergencies, ensuring vulnerable
              populations have access to food when other resources are scarce.
              In conclusion, food outreach to elderly women and widows with no
              income is vital for their physical and emotional well-being, as
              well as for building stronger, more compassionate communities.
            </Text>
          </Group>
        </div>
      </Container>
    </div>
  );
};

export default page;
