'use client';
import React from 'react';

import Image from 'next/image';
import { services } from '@/exports';
import { Card, Container } from '@mantine/core';
import { motion, Variants } from 'framer-motion';
type Props = {};
const texts = ['Our', 'Services'];

const Services = (props: Props) => {
  return (
    <div className="min-h-screen pb-[100px]  ">
      <Container>
        <div className="top">
          <div>
            {texts.map((item, index) => (
              <h1
                key={index}
                className="text-3xl md:text-6xl  font-semibold  mb-1 tracking-wider text-yellow-400"
              >
                {item.split(' ').map((word, index) => (
                  <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.3 }}
                    viewport={{ once: true }}
                    className="inline-block"
                    key={index}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </h1>
            ))}
          </div>
          <div className="flex md:mt-20 space-y-3 flex-col md:flex-row mt-4 justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex md:flex-col"
            >
              <p className="text-black font-medium text-sm ">One Goal,</p>

              <p className="text-black font-medium text-sm ">
                {' '}
                Different Services
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-[#3E1273]  text-lg "
            >
              BEHIND MARYGIFT WALLS FOUNDATION
            </motion.p>
          </div>
        </div>
        <div className="bottom grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 mt-20 gap-6 ">
          {services.map(({ Icon, title }, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.3,
                ease: 'easeIn',
                mass: 0.5,
                duration: 0.5,
              }}
              viewport={{ once: true }}
              key={index}
              className="cursor-pointer rounded-md hover:!-translate-y-6 !py-8 !flex flex-col items-center justify-center shadow-md shadow-black p-2 transition !min-h-[200px] duration-300 !bg-purple-900 hover:!bg-yellow-400"
            >
              <div className="flex justify-center items-center">
                <div className=" flex justify-center">
                  <Icon size={50} className="text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-center text-white">
                  {title}
                </h2>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Services;
