import { feed, texts } from '@/exports';
import { Container, Text, Title, Image as Img, Group } from '@mantine/core';

import Image from 'next/image';

type Props = {};

const text = ['GOOD HEALTH FOR WOMEN'];

const video = feed.map((item, index) => (
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
      <Container my={'md'} className="!my-16">
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
          src={'/foundation1.jpeg'}
          alt="img"
          fill
          priority
          className="!object-cover"
        />
      </div>
      <Container>
        <div className="md:mt-[120px] !grid !grid-cols-1 mb-20 gap-10 sm:!grid-cols-2">
          <Img src={'/image-35.png'} radius={10} fit="cover" />
          <div>
            <Title order={2} ta={'center'} mb={10} className="!text-purple-900">
              GOOD HEALTH FOR WOMEN
            </Title>
            <Text>
              Behind Marygift Walls foundation cares for the health of women and
              girls. We are swayed that for women and girls to function to the
              optimum their health is very important. We have helped defray
              medical bills of women and girls in hospitals across the country.
              We are currently teaching women and girls on healthy living, how
              to make their environment habitable, and personal hygiene is our
              topmost priority when it comes to the health of women and girls.
              Our team of experts are doing exceptionally well in this pursuit.
            </Text>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Page;
