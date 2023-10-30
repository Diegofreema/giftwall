'use client';
import { IconPlus } from '@tabler/icons-react';
import { Accordion, Text, Container, Title } from '@mantine/core';
import { faq } from '@/exports';
import { motion } from 'framer-motion';

type FAQ = {
  label: string;
  content: string[];
};
const text = ['Frequently', 'Asked Questions'];
const MotionTitle = motion(Title);
const Faq = () => {
  // See groceries data above
  const items = faq?.map((item: FAQ) => (
    <Accordion.Item key={item.label} value={item.label}>
      <Accordion.Control className="!font-bold md:!text-xl !text-base">
        {item.label}
      </Accordion.Control>
      <Accordion.Panel className="!space-y-4">
        {item.content.map((item, i) => (
          <Text fz={'sm'} key={i} mb={15}>
            {item}
          </Text>
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div className="min-h-screen py-[120px]">
      <Container my={'md'} className="!mb-10">
        {text.map((item, index) => (
          <MotionTitle
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.3 }}
            viewport={{ once: true }}
            key={index}
            order={1}
            className="!text-3xl md:!text-7xl !mb-10 font-semibold !text-center   tracking-wider text-purple-900"
          >
            {item}
          </MotionTitle>
        ))}
      </Container>
      <Container className="!mx-auto !mt-[50px] " mt={20}>
        <Accordion chevron={<IconPlus />} variant="contained">
          {items}
        </Accordion>
      </Container>
    </div>
  );
};

export default Faq;
