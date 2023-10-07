import { emp, texts } from '@/exports';
import { Container, Text, Title, Image as Img, Group } from '@mantine/core';

import Image from 'next/image';

type Props = {};

const text = ['Empowerment'];
const words = texts?.map((item, index) => (
  <Text key={index} fw={'bold'} className="!text-base md:!text-lg">
    {item}
  </Text>
));

const video = emp.map((item, index) => (
  <Group key={index} w={'100%'} h={'300px'}>
    <iframe
      width={'100%'}
      height="300px"
      src={item.url}
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ></iframe>
  </Group>
));

const Page = (props: Props) => {
  return (
    <div className="min-h-screen py-[120px] ">
      <Container my={'md'} className="!mb-10">
        {text.map((item, index) => (
          <Title
            key={index}
            order={1}
            className="!text-3xl md:!text-5xl  font-semibold   tracking-wider text-purple-900"
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
      <Container>
        <div className="md:mt-[120px] !grid !grid-cols-1 mb-20 gap-10 sm:!grid-cols-2">
          <Img src={'/emp.png'} radius={10} fit="cover" />
          <div>
            <Title order={2} ta={'center'} mb={10} className="!text-purple-900">
              EMPOWERMENT
            </Title>
            <Text>
              Behind Marygift Walls Foundation is convinced beyond any
              reasonable doubt that to bridge the gap of poverty and gender
              inequality amongst females there is need to empower them. A woman
              that is empowered is a very confident woman. We encourage and
              enable women and girls to become independent thinkers and
              self-learners. By empowerment we provide skill acquisition
              training for women in various disciplines, and those who excel in
              their different fields of endeavor will be given a start-up
              capital for small-scale businesses. We have trained women and
              girls in the act of making liquid soaps for washing dishes,
              bleach, air-freshener etc. We also engage women and ladies that
              want to learn how to cook through our online cooking program. We
              have also empowered some women with start-up capital.
            </Text>
          </div>
        </div>
        <Title
          className="!text-purple-900 !mt-[80px] !text-lg sm:!text-3xl"
          ta={'center'}
        >
          Check out some of our youtube videos{' '}
        </Title>
        <div className="grid !gap-6 grid-cols-1 sm:grid-cols-2 mt-8">
          {video}
        </div>
      </Container>
    </div>
  );
};

export default Page;
