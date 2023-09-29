'use client';

import React from 'react';

import Link from 'next/link';
import {
  IconArrowMoveRight,
  IconClover,
  IconClubs,
  IconFeather,
  IconRosetteFilled,
} from '@tabler/icons-react';
import {
  Button,
  Card,
  CardSection,
  Container,
  Group,
  Text,
  Title,
} from '@mantine/core';
import { serviceText } from '@/exports';

type Props = {};
const texts = ['Our', 'Priorities'];

const Mission = (props: Props) => {
  return (
    <div className="min-h-screen py-[50px] bg-[#ebe9eb]">
      <Container>
        <div className="top">
          <div>
            {texts.map((item, index) => (
              <Title
                key={index}
                className="!text-3xl md:text-7xl font-semibold  mb-1 tracking-wider text-yellow-400"
              >
                {item}
              </Title>
            ))}
          </div>
          <div className="flex md:mt-20 space-y-3 flex-col md:flex-row mt-4 justify-between">
            <div className="flex md:flex-col">
              <Text className="text-black font-medium ">Check Out</Text>

              <Text className="text-black font-medium ">Our Priorities</Text>
            </div>

            <div>
              <Text className="!text-[#3E1273]  md:!text-2xl ">
                BEHIND MARYGIFT WALLS FOUNDATION,
              </Text>
              <Text className="!text-[#3E1273]  md:!text-2xl ">
                A Reason To Help Teenage Girls And Women
              </Text>
            </div>
          </div>
        </div>
        <div className="bottom grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 mt-20 gap-3 ">
          {serviceText.map(({ Icon, title, text, url }, index) => (
            <Card
              key={index}
              className="cursor-pointer !space-y-2 group hover:!-translate-y-6 !min-h-fit  transition duration-300 relative"
            >
              <Group className="flex justify-center">
                <div className="w-full mb-4">
                  <Icon size={30} />
                </div>
                <Title order={3}>
                  {title.length > 40 ? title.slice(0, 50) + '...' : title}
                </Title>
              </Group>
              <Group className="mb-16">
                <Text>{text.slice(0, 100)}...</Text>
              </Group>
              <Group className="!flex items-center">
                <IconArrowMoveRight
                  size={15}
                  className=" group-hover:translate-x-2 duration-200 transition"
                />
                <Button
                  unstyled
                  component={Link}
                  href={url}
                  className="translate-x-4 !text-sm group-hover:translate-x-0 duration-200 transition opacity-0 group-hover:opacity-100"
                >
                  Learn More
                </Button>
              </Group>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Mission;
