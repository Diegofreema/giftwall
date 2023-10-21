'use client';

import { images } from '@/exports';
import { Button } from '@mantine/core';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';
import Carousel from 'nuka-carousel';
import { motion } from 'framer-motion';
import { Slider } from '@/lib/types';

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
          <Button
            onClick={() => previousSlide()}
            className="!bg-yellow-400 p-2 sm:ml-4 ml-2 rounded-full h-10 w-10 flex items-center group hover:!bg-purple-900 hover:text-white transition justify-center "
          >
            <IconArrowNarrowLeft
              size={30}
              className="group-hover:text-white text-purple-900 transition"
            />
          </Button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <Button
            onClick={() => nextSlide()}
            className=" p-2 sm:mr-4 mr-2 rounded-full h-10 w-10 flex items-center group hover:!bg-purple-900 hover:text-white transition justify-center !bg-yellow-400"
          >
            <IconArrowNarrowRight
              size={30}
              className="group-hover:text-white text-purple-900 transition"
            />
          </Button>
        )}
      >
        {slider.map((item) => (
          <div key={item?.imgUrl} className="w-full !h-[100vh] relative">
            <>
              <div className="w-full h-full absolute inset-0 bg-black/70"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item?.imgUrl}
                alt="img"
                width={'100%'}
                height={'100%'}
                className="w-full h-full object-cover"
              />
              <div className="absolute !top-[50%] !left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1 className="text-xl md:text-7xl text-center mb-4 sm:mb-8 md:mb-16 sm:text-4xl font-bold">
                  {item?.heading?.split(' ').map((word, index) => (
                    <motion.span
                      initial={{ opacity: 0, x: 40, y: -30, skewX: 40 }}
                      whileInView={{ opacity: 1, x: 0, y: 0, skewX: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 * index }}
                      className="inline-block"
                      key={index}
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </h1>
                <h3 className=" text-purple-500 text-xl md:text-5xl text-center font-bold">
                  {item?.description?.split(' ').map((item, index) => (
                    <motion.span
                      initial={{ opacity: 0, x: -10, y: 10 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 * index }}
                      className="inline-block"
                      key={index}
                    >
                      {item}&nbsp;
                    </motion.span>
                  ))}
                </h3>
              </div>
            </>
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
    <div className=" pt-[100px] min-h-screen pb-[100px] overflow-hidden w-full text-white">
      {sliders}
    </div>
  );
};

export default Hero;
