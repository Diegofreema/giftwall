'use client';
import { youtube } from '@/exports';
import { motion } from 'framer-motion';

import Image from 'next/image';

type Props = {};

const text = ['Girl child education'];

const video = youtube.map((item, index) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay: index * 0.3 }}
    viewport={{ once: true }}
    key={index}
  >
    <iframe
      src={item.url}
      className="h-[300px] w-[300px] rounded-md "
      allowFullScreen
    ></iframe>
  </motion.div>
));

const Page = (props: Props) => {
  return (
    <div className="min-h-screen py-[120px] ">
      <div className="w-[90%] mx-auto md:h-[300px] h-[150px] relative bg-[#ebe9eb] overflow-hidden">
        <Image
          src={'/j5.jpeg'}
          alt="img"
          fill
          priority
          className="!object-fill"
        />
      </div>
      <div className="!w-[90%] mx-auto  my-16 ">
        {text.map((item, index) => (
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.3 }}
            key={index}
            className="!text-3xl md:!text-7xl !mb-10 font-semibold !text-center   tracking-wider text-purple-900"
          >
            {item}
          </motion.h1>
        ))}
      </div>
      <div className="w-[90%] md:w-[80%] space-y-5 mx-auto">
        <div className="md:mt-[120px] !grid !grid-cols-1 mb-20 gap-10 sm:!grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-[350px] rounded-md overflow-hidden"
          >
            <Image
              src={'/girl-child.jpeg'}
              fill
              priority
              className="rounded-md"
              alt="img"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full space-y-5"
          >
            <h2 className="!text-purple-900  text-center !text-lg sm:!text-3xl">
              OUR ORGANIZATION PROMISE
            </h2>
            <h2 className="!text-purple-900  text-center !text-lg sm:!text-3xl">
              GIRL CHILD EDUCATION
            </h2>
            <p>
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
            </p>
          </motion.div>
        </div>
        <h2 className="!text-purple-900  text-center !text-lg sm:!text-3xl">
          Check out some of our videos{' '}
        </h2>
        <div className="grid !gap-4 place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8">
          {video}
        </div>
      </div>
    </div>
  );
};

export default Page;
