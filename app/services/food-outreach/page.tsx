'use client';
import { feed, texts } from '@/exports';
import { Container, Text, Title, Image as Img, Group } from '@mantine/core';
import { motion } from 'framer-motion';

import Image from 'next/image';

type Props = {};
const MotionGroup = motion(Group);
const MotionTitle = motion(Title);
const text = ['Food outreach'];
const words = texts?.map((item, index) => (
  <Text key={index} fw={'bold'} className="!text-base md:!text-lg">
    {item}
  </Text>
));

const video = feed.map((item, index) => (
  <MotionGroup
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    viewport={{ once: true }}
    key={index}
    w={'100%'}
    h={'300px'}
  >
    <iframe
      width={'100%'}
      height="300px"
      src={item.url}
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ></iframe>
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
          src={'/food3.jpeg'}
          alt="img"
          fill
          priority
          className="!object-fill"
        />
      </motion.div>
      <Container my={'md'} className="!mb-10">
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
            <Img src={'/f.jpeg'} radius={10} fit="cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Title order={2} ta={'center'} mb={10} className="!text-purple-900">
              Operation Feed the Hungry
            </Title>
            <Text>
              This is our food outreach program for women, children, the
              derelict elderly women that cannot fend for themselves and the
              widows in different communities. We will build food banks in rural
              communities and make it accessible to women and children. Hunger
              is ravaging a lot of homes in our rural communities, Behind
              Marygift Walls Foundation takes the initiative to feed the hungry
              and beggars on the streets of our communities. We have been
              sharing food items to poor families in different communities in
              Nigeria.
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
