'use client';
import { texts, youtube } from '@/exports';
import {
  Blockquote,
  Container,
  Text,
  Title,
  Image as Img,
  Group,
} from '@mantine/core';
import { motion } from 'framer-motion';

import Image from 'next/image';

type Props = {};

const text = ['Girl', 'Child', 'Education'];
const MotionImage = motion(Image);
const MotionTitle = motion(Title);
const MotionBlockquote = motion(Blockquote);
const MotionGroup = motion(Group);
const words = texts?.map((item, index) => (
  <Text key={index} fw={'bold'} className="!text-base md:!text-lg">
    {item}
  </Text>
));

const video = youtube.map((item, index) => (
  <MotionGroup
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7, delay: index * 0.3 }}
    viewport={{ once: true }}
    key={index}
  >
    <iframe
      src={item.url}
      className="h-[300px] w-[300px] rounded-md "
      allowFullScreen
    ></iframe>
  </MotionGroup>
));

const Page = (props: Props) => {
  return (
    <div className="min-h-screen py-[120px] ">
      <Container my={'md'} className="!mb-10">
        {text.map((item, index) => (
          <MotionTitle
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.3 }}
            key={index}
            order={1}
            className="!text-3xl md:!text-5xl  font-semibold   tracking-wider text-purple-900"
          >
            {item}
          </MotionTitle>
        ))}
      </Container>
      <div className="w-full h-[300px] relative bg-[#ebe9eb] overflow-hidden">
        <MotionImage
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          src={'/foundation.jpeg'}
          alt="img"
          fill
          priority
          className="!object-cover"
        />
      </div>
      <Container>
        <div className="md:mt-[120px] !grid !grid-cols-1 mb-20 gap-10 sm:!grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Img src={'/girl-child.png'} radius={10} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Title order={4} ta={'center'} className="!text-purple-900">
              OUR ORGANIZATION PROMISE
            </Title>
            <Title order={2} ta={'center'} mb={10} className="!text-purple-900">
              GIRL CHILD EDUCATION
            </Title>
            <Text>
              Education is the key to success. We believe that girls have the
              same right to access quality education as the boys. This is not so
              in Africa, due to our culture and abject poverty affecting the
              families. A girl child is always relegated to the background when
              it comes to making a choice of who to send to school between a boy
              and a girl in our communities. It is based on this that Behind
              Marygift Walls Foundation has used her platform to sponsor girls
              in different levels of education and donations of school materials
              such as schools’ bags, water bottles, writing materials to girls
              in various communities in Nigeria that have been out of school due
              to financial difficulties.
            </Text>
          </motion.div>
        </div>
        <Title
          mt={20}
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
