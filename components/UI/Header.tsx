'use client';

import Link from 'next/link';
import SocialButtons from './SocialButtons';
import { Card, Image, Title } from '@mantine/core';
import { IconArrowMoveRight, IconHeart } from '@tabler/icons-react';

import { links } from '@/exports';
import MyButton from '@/Ui/Button';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const notDonatePage = pathname !== '/donate';
  const navigate = () => {
    router.push('https://flutterwave.com/donate/hooymfuxdq9k');
  };
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="bg-purple-900 pt-16 sm:px-6 md:px-8 px-4">
      <div className="top ">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-4 gap-y-8"
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <Title className="text-white text-center  font-bold">
              Social networks{' '}
            </Title>
            <p className="text-white text-center">of</p>
            <p className="text-white text-center ">
              BEHIND MARYGIFT WALLS FOUNDATION
            </p>
            <SocialButtons />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className=" grid gap-8 "
          >
            <Card className=" border-none space-y-3" bg={'transparent'}>
              <Card.Section className="!text-center">
                <Title className="text-white">Our Aim</Title>
              </Card.Section>
              <Card.Section className="!text-center">
                <p className="text-white">
                  The Foundation aims to promote growth and wellbeing of the
                  girl child, single mothers and widows
                </p>
              </Card.Section>
              {notDonatePage && (
                <Card.Section className="!text-center">
                  <MyButton
                    onClick={navigate}
                    rightSection={
                      <IconHeart size={15} className="ml-2 fill-white  " />
                    }
                  >
                    Support Us
                  </MyButton>
                </Card.Section>
              )}
            </Card>
          </motion.div>
          <motion.div className="grid gap-8">
            <Card className="!bg-transparent border-none space-y-3">
              <Card.Section className="!text-center">
                <Title className="text-white">Address</Title>
              </Card.Section>
              <Card.Section className="!text-center">
                <p className="text-white">Find us at,</p>
                <p className="text-white">No 71A, Issele Azagba road,</p>
                <p className="text-white">Ogwashi-Uku, Delta State.</p>
              </Card.Section>
              <Card.Section className="!text-center">
                <Link href={'/contact'} className="rounded-lg inline-block">
                  <MyButton
                    rightSection={
                      <IconArrowMoveRight
                        size={15}
                        className="ml-2 fill-white   text-white "
                      />
                    }
                  >
                    Contact
                  </MyButton>
                </Link>
              </Card.Section>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      <div className="bottom flex flex-col md:flex-row items-center justify-between mt-8 pb-4 text-white sm:mt-16">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          © {year} All rights reserved.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          BEHIND MARYGIFT WALLS FOUNDATION
        </motion.p>
      </div>
    </div>
  );
};

export default Footer;
