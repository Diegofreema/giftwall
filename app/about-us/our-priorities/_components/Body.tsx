'use client';
import { PriorityProps } from '@/lib/types';
import { Container, Group, Image, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';

const text = ['Our Priorities'];

const MotionTitle = motion(Title);
const MotionGroup = motion(Group);
const Body: React.FC<PriorityProps> = ({ priorities }) => {
  const images = (i: number) => {
    let src = '';
    if (i === 0) {
      src = '/j3.jpeg';
    } else if (i === 1) {
      src = '/fd.png';
    } else if (i === 2) {
      src = '/j2.jpeg';
    } else {
      src = '/su.png';
    }
    return (
      <Image
        src={src}
        alt="img"
        w={'100%'}
        h={'400px'}
        fit="fill"
        radius={'md'}
      />
    );
  };

  const words = priorities?.map((item, index) => {
    const id = item?.url.split('#')[1];

    return (
      <MotionGroup
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.3 }}
        viewport={{ once: true }}
        id={id}
        key={index}
        fw={'bold'}
        className="!text-base md:!text-lg "
      >
        <Title
          ta={'center'}
          mb="lg"
          className="!text-center w-full !pt-[110px]"
        >
          {item.heading}
        </Title>
        <div className="grid gap-y-6 grid-cols-1 ">
          {images(index)}
          <Text fw={'bold'}>{item.description}</Text>
        </div>
      </MotionGroup>
    );
  });
  return (
    <div className="min-h-screen py-[130px]">
      <div className="!w-[90%] mx-auto">
        {text.map((item, index) => (
          <MotionTitle
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.3 }}
            viewport={{ once: true }}
            key={index}
            className="!text-3xl md:!text-7xl !mb-10 font-semibold !text-center   tracking-wider text-purple-900"
          >
            {item}
          </MotionTitle>
        ))}
      </div>
      {/* <div className="w-full h-[300px] overflow-hidden relative">
        <MotionImage
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          src={'/j7.jpeg'}
          alt="img"
          fill
          priority
          className="object-fill"
        />
      </div> */}
      <Container>
        <div className="grid grid-cols-1 space-y-6 mt-8">
          {words}
          <MotionGroup
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            gap={'md'}
            fw={'bold'}
            className="!text-base md:!text-lg space-y-3"
          >
            <Text fw={'bold'}>
              {' '}
              Lack of income can lead to financial stress. Food assistance
              programs alleviate some of this burden by addressing a fundamental
              need, allowing recipients to allocate limited resources to other
              necessities. Providing food aid to this demographic demonstrates
              care and respect for their dignity, reinforcing their sense of
              belonging and worth within the community.
            </Text>
            <Text fw={'bold'}>
              Access to nutritious food supports overall health, reduces the
              risk of malnutrition-related health issues, and can help manage
              chronic conditions common among elderly individuals.These programs
              can act as a safety net during emergencies, ensuring vulnerable
              populations have access to food when other resources are scarce.
              In conclusion, food outreach to elderly women and widows with no
              income is vital for their physical and emotional well-being, as
              well as for building stronger, more compassionate communities.
            </Text>
          </MotionGroup>
        </div>
      </Container>
    </div>
  );
};

export default Body;
