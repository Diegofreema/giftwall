import { feed, texts } from '@/exports';
import { Container, Text, Title, Image as Img, Group } from '@mantine/core';

import Image from 'next/image';

type Props = {};

const text = ['Operation Feed the Hungry'];
const words = texts?.map((item, index) => (
  <Text key={index} fw={'bold'} className="!text-base md:!text-lg">
    {item}
  </Text>
));

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
      <Container my={'md'} className="!mb-10">
        {text.map((item, index) => (
          <Title
            key={index}
            order={1}
            className="!text-3xl md:!text-7xl  font-semibold   tracking-wider text-purple-900"
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
          <Img src={'/food3.jpeg'} radius={10} fit="cover" />
          <div>
            <Title order={2} ta={'center'} mb={10} className="!text-purple-900">
              Operation Feed the Hungry
            </Title>
            <Text>
              This is our food outreach program for women, children, the
              derelict elderly women that cannot fend for themselves and the
              widows in different communities. We will build food banks in rural
              communities and make it accessible to women and children. Hunger
              is ravaging a lot of homes in our rural communities, Behind
              Marygift Walls Foundation takes the initiative to feed the hungry
              and beggars on the streets of our communities. We have been
              sharing food items to poor families in different communities in
              Nigeria.
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
