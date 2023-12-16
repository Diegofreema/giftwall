'use client';

import { Button } from '@mantine/core';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';
import Carousel from 'nuka-carousel';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Prop = {
  slider: {
    imgUrl: string;
    heading: string;
    description: string;
  }[];
};
const Hero = ({ slider }: Prop) => {
  const sliders =
    slider.length > 0 ? (
      <Carousel
        autoplayInterval={5000}
        className="!h-[100vh]"
        autoplay
        wrapAround
        renderCenterLeftControls={({ previousSlide }) => (
          <p
            onClick={() => previousSlide()}
            className="!bg-yellow-400 p-2 sm:ml-4 ml-2 md:h-10 md:w-10 !w-10 !h-10 !rounded-full  sm:flex items-center group hover:!bg-purple-900 !outline-none hover:text-white transition justify-center hidden  "
          >
            <IconArrowNarrowLeft
              size={25}
              className="group-hover:text-white text-base text-purple-900 transition"
            />
          </p>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <p
            onClick={() => nextSlide()}
            className="  p-2 sm:mr-4 mr-2 !rounded-full md:h-10 md:w-10 !w-10 !h-10 sm:flex items-center group hover:!bg-purple-900 hover:text-white !outline-none transition justify-center !bg-yellow-400 hidden "
          >
            <IconArrowNarrowRight
              size={25}
              className="group-hover:text-white text-base text-purple-900 transition "
            />
          </p>
        )}
      >
        {slider?.map((item) => (
          <div key={item?.imgUrl} className="w-full !h-[100vh] relative">
            <div className="w-full h-full absolute inset-0 bg-black/40"></div>

            <Image
              src={item?.imgUrl}
              alt="img"
              fill
              priority
              className="w-full h-full object-fill"
            />
            <div className="absolute !top-[50%] !left-1/2 -translate-x-1/2 -translate-y-1/2">
              <h1 className="text-3xl   md:text-5xl text-center w-full  mb-4 sm:mb-8 md:mb-16 sm:text-4xl font-bold">
                {item?.heading?.split(' ').map((word, index) => (
                  <motion.span
                    initial={{ opacity: 0, x: 40, y: -30, skewX: 40 }}
                    whileInView={{ opacity: 1, x: 0, y: 0, skewX: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 * index }}
                    viewport={{ once: true }}
                    className="inline-block "
                    key={index}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </h1>
              <h3 className=" text-yellow-400 text-base md:text-3xl text-center font-bold">
                {item?.description?.split(' ').map((item, index) => (
                  <motion.span
                    initial={{ opacity: 0, x: -10, y: 10 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 * index }}
                    viewport={{ once: true }}
                    className="inline-block"
                    key={index}
                  >
                    {item}&nbsp;
                  </motion.span>
                ))}
              </h3>
            </div>
          </div>
        ))}
      </Carousel>
    ) : (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-3xl md:text-6xl  font-semibold  mb-1 tracking-wider text-yellow-400">
          No Slider
        </h1>
      </div>
    );
  return (
    <div className="  min-h-screen  overflow-hidden w-full text-white">
      {sliders}
    </div>
  );
};

export default Hero;
