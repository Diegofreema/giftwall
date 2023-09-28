'use client';
import React from 'react';

import Image from 'next/image';
import { services } from '@/exports';
import { Card, Container } from '@mantine/core';

type Props = {};
const texts = ['Our', 'Services'];

const Services = (props: Props) => {
  return (
    <div className="min-h-screen pb-[100px]  ">
      <Container>
        <div className="top">
          <div>
            {texts.map((item, index) => (
              <p
                key={index}
                className="text-3xl md:text-6xl font-semibold  mb-1 tracking-wider text-yellow-400"
              >
                {item}
              </p>
            ))}
          </div>
          <div className="flex md:mt-20 space-y-3 flex-col md:flex-row mt-4 justify-between">
            <div className="flex md:flex-col">
              <p className="text-black font-medium text-sm ">One Goal,</p>

              <p className="text-black font-medium text-sm ">
                {' '}
                Different Services
              </p>
            </div>

            <p className="text-[#3E1273]  text-lg ">
              BEHIND MARYGIFT WALLS FOUNDATION
            </p>
          </div>
        </div>
        <div className="bottom grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 mt-20 gap-3 ">
          {services.map((item, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:!-translate-y-6 !py-8 !flex flex-col items-center justify-center transition !min-h-[200px] duration-300 !bg-purple-900"
              shadow="md"
              padding="lg"
              radius="md"
            >
              <Card.Section className="flex justify-center items-center">
                <div className=" flex justify-center">
                  <Image
                    alt="img"
                    src={item.imgUrl}
                    className="object-contain"
                    width={50}
                    height={50}
                  />
                </div>
              </Card.Section>
              <Card.Section>
                <h2 className="text-2xl font-bold text-center text-white">
                  {item.title}
                </h2>
              </Card.Section>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Services;
