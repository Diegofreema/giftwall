'use client';

import Link from 'next/link';
import { IconArrowMoveRight, IconFeather } from '@tabler/icons-react';
import { Button, Card, Container, Group, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { PriorityProps } from '@/lib/types';

const texts = ['Our priorities'];
const MotionTitle = motion(Title);
// @ts-ignore
const MotionCard = motion(Card);
const Mission = ({ priorities }: PriorityProps) => {
  return (
    <div className="min-h-screen py-[50px] bg-[#ebe9eb]">
      <Container>
        <div className="top">
          <div>
            {texts.map((item, index) => (
              <MotionTitle
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                viewport={{ once: true }}
                id="title"
                key={index}
                className="!text-3xl md:!text-6xl  font-semibold !text-center  mb-1 tracking-wider text-yellow-400"
              >
                {item}
              </MotionTitle>
            ))}
          </div>
          <div className="flex md:mt-20 space-y-3 flex-col md:flex-row mt-4 items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex md:flex-col"
            >
              <Text className="text-black  font-semibold ">Check Out</Text>

              <Text className="text-black font-semibold ">Our Priorities</Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Text className="!text-[#3E1273]  md:!text-2xl font-bold !text-center md:!text-right ">
                BEHIND MARYGIFT WALLS FOUNDATION,
              </Text>
              <Text className="!text-[#3E1273]  md:!text-2xl font-bold !text-center md:!text-right">
                A Reason To Help Teenage Girls And Women
              </Text>
            </motion.div>
          </div>
        </div>
        <div className="bottom grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 mt-20 gap-3 ">
          {priorities.map(({ heading, description, url }, index) => {
            return (
              <>
                {/* @ts-ignore */}
                <MotionCard
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: index * 0.3,
                    duration: 0.3,
                  }}
                  viewport={{ once: true }}
                  key={index}
                  className="cursor-pointer !space-y-2 group hover:!-translate-y-6 !min-h-fit  transition duration-200 relative hover:!bg-yellow-400 group"
                  shadow="xl"
                >
                  <Group className="flex justify-center">
                    <div className="w-full mb-4">
                      <IconFeather
                        size={30}
                        className="group-hover:text-white duration-200 transition"
                      />
                    </div>
                    <Title
                      order={3}
                      className="group-hover:!text-white duration-200 transition"
                    >
                      {heading.length > 40
                        ? heading.slice(0, 50) + '...'
                        : heading}
                    </Title>
                  </Group>
                  <Group className="mb-16">
                    <Text className="group-hover:!text-white duration-200 transition">
                      {description.slice(0, 100)}...
                    </Text>
                  </Group>
                  <Group className="!flex items-center">
                    <IconArrowMoveRight
                      size={15}
                      className=" group-hover:translate-x-2 group-hover:!text-white  duration-200 transition"
                    />
                    <Button
                      unstyled
                      component={Link}
                      href={url}
                      className="translate-x-4 group-hover:!text-white  !text-sm group-hover:translate-x-0 duration-200 transition opacity-0 group-hover:opacity-100"
                    >
                      Learn More
                    </Button>
                  </Group>
                </MotionCard>
              </>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Mission;
