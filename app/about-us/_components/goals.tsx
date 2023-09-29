import { goals } from '@/exports';
import { Group, Text } from '@mantine/core';
import { twMerge } from 'tailwind-merge';

const goal = goals.map((item, index) => (
  <Group
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
      {item.title}
    </Text>
    <Text fz={'lg'} ta={'left'} className="!font-semibold !text-sm" size="md">
      {item.text}
    </Text>
  </Group>
));
export const Goal = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {goal}
    </div>
  );
};
