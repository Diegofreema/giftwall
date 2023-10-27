'use client';

import React from 'react';

import { Container, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import Image from 'next/image';
type Props = {};

const Submission = (props: Props) => {
  return (
    <div className="min-h-screen py-[50px]">
      <Container>
        <div className="flex flex-col md:flex-row md:space-x-12 items-center  space-y-4 md:space-y-0 ">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:basis-[50%] basis-[100%] w-full bg-black relative md:w-[300px]  rounded-md shadow-orange-50 shadow-md overflow-hidden md:h-[600px] h-[300px]"
          >
            <Image
              src={'/a8.jpeg'}
              alt="mission-imag"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:basis-[50%] basis-[100%] space-y-8"
          >
            <div className="text-center">
              <Title
                order={2}
                className="text-[#3E1273] font-semibold text-center text-lg !mb-3"
              >
                About Us
              </Title>
              <Text ta={'center'}>
                About us Behind MaryGift Walls foundation is about teaching and
                guiding women to embrace their challenges that represent walls
                on life’s journey, to see those walls as roadblocks; instead,
                see them as opportunities for growth, resilience, and
                transformation. To know with determination and effort, they can
                find ways to overcome any barrier.
              </Text>
            </div>
            <div>
              <Title
                order={2}
                className="text-[#3E1273] font-semibold text-center text-lg !mb-3"
              >
                Our Mission
              </Title>
              <Text ta={'center'}>
                Our mission is to empower women and girls across rural
                communities in Africa by providing them with the tools,
                resources, and opportunities they need to lead lives of dignity,
                equality, confidence, self esteem and self-reliance. We are
                committed to breaking down barriers, fostering education,
                promoting health and well-being, and championing gender equality
                to create a brighter future for all female gender through well
                tailored programs and sponsorships.
              </Text>
            </div>
            <div>
              <Title
                order={2}
                className="text-[#3E1273] font-semibold text-center text-lg !mb-3"
              >
                Our Vision
              </Title>
              <Text ta={'center'}>
                To create a future where every woman and girl in Africa has the
                knowledge, skills, and confidence to pursue her dreams and
                aspirations without fear of discrimination or inequality. We
                envision a continent where gender equality is not just a goal
                but a lived reality, where women and girls are at the forefront
                of positive change , can use their voices in different levels in
                their own community and beyond.
              </Text>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Submission;
