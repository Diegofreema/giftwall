'use client';
import { classRoom, feedText, videos } from '@/exports';
import { Image, Title } from '@mantine/core';
import { motion } from 'framer-motion';

const text = ['BMWF Projects'];
const MotionTitle = motion(Title);
// @ts-ignore
const MotionImage = motion(Image);
const Body = () => {
  return (
    <div className="min-h-screen py-[110px] px-4">
      <div className="!w-[90%] mx-auto  my-16 ">
        {text.map((item, index) => (
          <MotionTitle
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.3 }}
            viewport={{ once: true }}
            key={index}
            className="!text-3xl md:!text-6xl font-semibold text-center   tracking-wider text-yellow-400"
          >
            {item}
          </MotionTitle>
        ))}
      </div>
      <div className="w-[90%] space-y-8 mx-auto sm:w-[60%]">
        <div className=" h-[350px] overflow-hidden relative">
          <Image
            src={'/j3.jpeg'}
            alt="img"
            fit="fill"
            radius={'md'}
            // className="object-fill"
          />
        </div>
        <Title order={2} ta="center">
          {classRoom.title}
        </Title>
        <div>
          <p className="font-semibold text-center mb-3">Mission statement</p>
          <p>{classRoom.description}</p>
        </div>
        <div>
          <p className="font-semibold text-center">Goals and Strategies</p>
          <ol className="space-y-5">
            {classRoom.goals.map((item, index) => (
              <li key={index}>
                {index + 1 + '' + ')'} {item.heading} {item.description}
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4">
          <p className="font-semibold text-center">
            Importance of Sponsoring &#34;From Street to Classroom&#34;
          </p>

          {classRoom.importance.map((item, index) => (
            <p key={index}>
              {index + 1 + '' + ')'} {item}
            </p>
          ))}
        </div>

        <p className="font-semibold italic">{classRoom.summary}</p>
      </div>
    </div>
  );
};

export default Body;
