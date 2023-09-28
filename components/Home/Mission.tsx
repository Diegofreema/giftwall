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

type Props = {};
const texts = ['Our', 'Priorities'];

const services = [
  {
    Icon: IconFeather,
    title: 'Girl child education',
    text: `
        Education equips girls with knowledge, skills, and self-confidence, empowering them to make informed choices about their lives. It enables them to participate actively in social, economic, and political spheres, contributing to their own well-being and that of their communities. On a global scale, investing in girl child education contributes to achieving the United Nations Sustainable Development Goals, particularly those related to quality education, gender equality, and poverty reduction.  `,
  },
  {
    Icon: IconClover,
    title: 'Women and Youth Empowerment',
    text: `Women empowerment refers to the process of granting women the knowledge, resources, and power to make choices and control their own lives. It involves eliminating gender-based discrimination and providing equal opportunities and rights to women in various spheres, including education, employment, healthcare, and participation in social and political decision-making. Empowered women have the ability to shape their destinies, challenge societal norms, and advocate for gender equality.`,
  },
  {
    Icon: IconClubs,
    title: 'Clean Healthy and Confident girl',
    text: ` Good personal and menstrual Hygiene for the girl child.
    Hygiene is not only essential for the physical health of the girl child but also for her emotional well-being, confidence, education, and overall empowerment. Providing education and resources to support proper hygiene practices is crucial in promoting the well-being and dignity of girls.`,
  },
  {
    Icon: IconRosetteFilled,
    title:
      'Food outreach to elderly women , widows, abandoned pregnant teenagers and single mothers',
    text: `Food outreach to elderly women, pregnant teenagers, single mothers and widows without income is very important. Many elderly women and widows have been abandoned by their families, so they
    struggle to access nutritious meals regularly. Food outreach programs help ensure they receive essential nutrients to maintain their health and well-being. These individuals may face social isolation, and food outreach can provide them with regular contact with volunteers or community members, reducing loneliness and offering emotional support.`,
  },
];
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
          {services.map(({ Icon, title, text }, index) => (
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
                  href={'/'}
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
