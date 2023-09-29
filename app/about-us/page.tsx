import { texts } from '@/exports';
import { Blockquote, Container, Text, Title } from '@mantine/core';
import { Objective } from './_components/objectives';
import { Goal } from './_components/goals';
import Image from 'next/image';

type Props = {};

const text = ['About Us'];
const words = texts?.map((item, index) => (
  <Text key={index} fw={'bold'} className="!text-base md:!text-lg">
    {item}
  </Text>
));

const About = (props: Props) => {
  return (
    <div className="min-h-screen py-[120px]">
      <Container my={'md'}>
        {text.map((item, index) => (
          <Title
            key={index}
            order={1}
            className="!text-3xl md:!text-7xl !mb-10 font-semibold   tracking-wider text-yellow-400"
          >
            {item}
          </Title>
        ))}
      </Container>
      <div className="w-full h-[300px] relative bg-[#ebe9eb] overflow-hidden">
        <Image
          src={'/foundation.jpeg'}
          alt="img"
          fill
          priority
          className="!object-cover"
        />
      </div>
      <Container className="md:mt-[120px]">
        <Text
          fw={700}
          mt={`lg`}
          className={
            '!text-yellow-400 md:!w-2/3 !mb-20 !text-lg sm:!text-xl md:!text-4xl lg:!text-5xl'
          }
        >
          <span className="ml-16">With</span> its patrons, the Foundation works
          for success of young girls, single moms and widows.
        </Text>
        <div className="w-[90%] sm:w-[80] md:w-[70%] mx-auto mt-8">
          <Title
            className="!text-purple-900 md:text-9xl text-4xl !mb-5 font-semibold capitalize"
            fs={'italic'}
          >
            The founder’s corner
          </Title>
          <div className="space-y-8">
            <Blockquote color="blue" cite="– Oprah Winfrey" mt="xl">
              Every one of us gets through the tough times, because somebody is
              there, standing in the gap to close it for us.
            </Blockquote>
            {words}
          </div>
        </div>
      </Container>
      <Container
        fluid
        className="!mt-[100px] md:!mt-[130px] md:!w-[90%] mx-auto"
      >
        <Title ta={'center'} order={1} className="!text-5xl !mb-6" fw={600}>
          Our Objectives
        </Title>
        <Objective />
        <div className="mt-[50px] sm:mt-[70px]">
          <Title ta={'center'} order={1} className="!text-5xl !mb-6" fw={600}>
            Our Goals
          </Title>
          <Goal />
        </div>
      </Container>
    </div>
  );
};

export default About;
