'use client';

import { images } from '@/exports';
import { Button } from '@mantine/core';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';
import Carousel from 'nuka-carousel';

const text = ['BEHIND', ' MARYGIFT', 'WALLS', 'FOUNDATION'];

const Hero = () => {
  return (
    <div className=" pt-[100px] min-h-screen pb-[100px] overflow-hidden w-full text-white">
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
        {images.map((item) => (
          <div key={item.imgUrl} className="w-full !h-[100vh] relative">
            <>
              <div className="w-full h-full absolute inset-0 bg-black/80"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imgUrl}
                alt="img"
                width={'100%'}
                height={'100%'}
                className="w-full h-full object-cover"
              />
              <div className="absolute !top-[50%] !left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1 className="text-xl md:text-7xl text-center mb-4 sm:mb-8 md:mb-16 sm:text-4xl font-bold">
                  {item.title}
                </h1>
                <h3 className=" text-purple-500 text-xl md:text-5xl text-center font-bold">
                  {item.text.split(' ').map((item, index) => (
                    <span className="inline-block" key={index}>
                      {item}&nbsp;
                    </span>
                  ))}
                </h3>
              </div>
            </>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
