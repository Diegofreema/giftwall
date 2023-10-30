'use client';
import { feed, hygiene, texts } from '@/exports';
import { Container, Text, Title, Image as Img, Group } from '@mantine/core';
import { motion } from 'framer-motion';

import Image from 'next/image';

type Props = {};
const MotionGroup = motion(Group);
const MotionTitle = motion(Title);
const text = ['Elevating Confidence Through Personal and Menstrual Hygiene'];

const video = hygiene.map((item, index) => (
  <MotionGroup
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    viewport={{ once: true }}
    key={index}
    w={'100%'}
    h={'300px'}
  >
    <video
      src={item.url}
      className="h-[300px] w-[300px] rounded-md "
      controls
    ></video>
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
        className="w-[90%] mx-auto md:h-[300px] h-[150px] relative bg-[#ebe9eb] overflow-hidden"
      >
        <Image
          src={'/w8.jpeg'}
          alt="img"
          fill
          priority
          className="!object-fill"
        />
      </motion.div>
      <Container my={'md'} className="!my-16">
        {text.map((item, index) => (
          <MotionTitle
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.3 }}
            key={index}
            order={1}
            className="!text-3xl md:!text-7xl !mb-10 font-semibold !text-center   tracking-wider text-purple-900"
          >
            {item}
          </MotionTitle>
        ))}
      </Container>
      <Container>
        <div className="md:mt-[120px] !grid !grid-cols-1 mb-20 gap-10 sm:!grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <Img src={'/hy.jpeg'} radius={10} fit="cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Text fw={'bold'}>
              Behind Marygift Walls foundation cares for the health of women and
              girls. We are swayed that for women and girls to function to the
              optimum their health is very important. We have helped defray
              medical bills of women and girls in hospitals across the country.
              We are currently teaching women and girls on healthy living, how
              to make their environment habitable, and personal hygiene is our
              topmost priority when it comes to the health of women and girls.
              Our team of experts are doing exceptionally well in this pursuit.
            </Text>
          </motion.div>
        </div>
      </Container>
      <Container>
        <Title
          my={20}
          className="!text-purple-900 !text-lg sm:!text-3xl"
          ta={'center'}
        >
          Check out some of our videos{' '}
        </Title>
        <div className="grid !gap-4 place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8">
          {video}
        </div>
      </Container>
    </div>
  );
};

export default Page;
