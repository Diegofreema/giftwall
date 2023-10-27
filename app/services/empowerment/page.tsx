'use client';
import { emp, texts } from '@/exports';
import { Container, Text, Title, Image as Img, Group } from '@mantine/core';
import { motion } from 'framer-motion';

import Image from 'next/image';

type Props = {};

const text = ['Empowerment'];
const MotionGroup = motion(Group);
const MotionTitle = motion(Title);
const words = texts?.map((item, index) => (
  <Text key={index} fw={'bold'} className="!text-base md:!text-lg">
    {item}
  </Text>
));

const video = emp.map((item, index) => (
  <MotionGroup
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    viewport={{ once: true }}
    key={index}
    w={'100%'}
    h={'300px'}
  >
    <iframe width={'100%'} height="300px" src={item.url}></iframe>
  </MotionGroup>
));

const Page = (props: Props) => {
  return (
    <div className="min-h-screen py-[120px] ">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className="w-[90%] mx-auto h-[300px] relative bg-[#ebe9eb] overflow-hidden"
      >
        <Image
          src={'/itt.jpeg'}
          alt="img"
          fill
          priority
          className="!object-fill"
        />
      </motion.div>
      <Container my={'md'} className="!my-10">
        {text.map((item, index) => (
          <MotionTitle
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.3 }}
            key={index}
            order={1}
            className="!text-3xl md:!text-5xl text-center  font-semibold   tracking-wider text-purple-900"
          >
            {item}
          </MotionTitle>
        ))}
      </Container>
      <Container>
        <div className="md:mt-[120px] !grid !grid-cols-1 mb-20 gap-14 sm:!grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <Img src={'/emp.png'} radius={10} fit="cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Title order={2} ta={'center'} mb={10} className="!text-purple-900">
              EMPOWERMENT
            </Title>
            <Text>
              Behind Marygift Walls Foundation is convinced beyond any
              reasonable doubt that to bridge the gap of poverty and gender
              inequality amongst females there is need to empower them. A woman
              that is empowered is a very confident woman. We encourage and
              enable women and girls to become independent thinkers and
              self-learners. By empowerment we provide skill acquisition
              training for women in various disciplines, and those who excel in
              their different fields of endeavor will be given a start-up
              capital for small-scale businesses. We have trained women and
              girls in the act of making liquid soaps for washing dishes,
              bleach, air-freshener etc. We also engage women and ladies that
              want to learn how to cook through our online cooking program. We
              have also empowered some women with start-up capital.
            </Text>
          </motion.div>
        </div>
        <MotionTitle
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="!text-purple-900 !mt-[80px] !text-lg sm:!text-3xl"
          ta={'center'}
        >
          Check out some of our youtube videos{' '}
        </MotionTitle>
        <div className="grid !gap-6 grid-cols-1 sm:grid-cols-2 mt-8">
          {video}
        </div>
      </Container>
    </div>
  );
};

export default Page;
