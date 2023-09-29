import { people } from '@/exports';
import { Container, Text, Title, Image as Img, Stack } from '@mantine/core';
import Image from 'next/image';

const text = ['Our', 'Team'];
const profile = people?.map((item, index) => (
  <Stack
    align="center"
    key={index}
    fw={'bold'}
    className="!text-base md:!text-lg"
  >
    <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden ">
      <Img
        src={item.imgUrl}
        alt="img"
        className="object-cover"
        width={200}
        height={200}
      />
    </div>
    <Text fw={'bold'} className="text-purple-900">
      Volunteer
    </Text>
  </Stack>
));
const page = () => {
  return (
    <div className="min-h-screen py-[130px]">
      <div className="!w-[90%] mx-auto mb-10">
        {text.map((item, index) => (
          <Title
            key={index}
            className="!text-3xl md:!text-6xl  font-semibold   tracking-wider text-yellow-400"
          >
            {item}
          </Title>
        ))}
      </div>
      <div className="w-full h-[300px] overflow-hidden relative">
        <Image
          src={'/foundation1.jpeg'}
          alt="img"
          fill
          priority
          className="object-fit"
        />
      </div>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 space-y-8 mt-10 sm:mt-20">
          {profile}
        </div>
      </Container>
    </div>
  );
};

export default page;
