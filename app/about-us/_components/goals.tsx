import { Group, Text } from '@mantine/core';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
const MotionGroup = motion(Group);

export const Goal = ({
  goals,
}: {
  goals: { heading: string; description: string }[];
}) => {
  const goal = goals.map((item, index) => (
    <MotionGroup
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.3 }}
      viewport={{ once: true }}
      gap={'md'}
      key={index}
      className="!shadow-sm !shadow-black !rounded-md"
      p="lg"
    >
      <div
        className={twMerge(
          index % 2 === 0 ? '!bg-purple-900' : '!bg-yellow-400',
          'h-1 w-full rounded-md'
        )}
      />
      <Text fw={'normal'} className="!text-xs">
        {item?.heading}
      </Text>
      <Text fz={'lg'} ta={'left'} className="!font-semibold !text-sm" size="md">
        {item?.description}
      </Text>
    </MotionGroup>
  ));
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {goal}
    </div>
  );
};
