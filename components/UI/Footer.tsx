'use client';
import Image from 'next/image';
import React from 'react';

import Link from 'next/link';
import SocialButtons from './SocialButtons';
import { Button, Card, Title } from '@mantine/core';
import { IconArrowMoveRight, IconHeart } from '@tabler/icons-react';
import { links } from '@/exports';
import MyButton from '@/Ui/Button';

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="bg-purple-900 pt-16 sm:px-6 md:px-8 px-4">
      <div className="top flex flex-col md:flex-row item-center">
        <div className="right flex justify-center basis-[100%] md:basis-[30%]">
          <Image
            src={'/bmw.png'}
            width={200}
            height={200}
            priority
            alt="image"
          />
        </div>
        <div className="left grid gap-8 grid-cols-1 md:grid-cols-2 md:basis-[60%] basis-[100%]">
          <Card className=" border-none space-y-3" bg={'transparent'}>
            <Card.Section className="!text-center">
              <Title className="text-white">In Short</Title>
            </Card.Section>
            <Card.Section className="!text-center">
              <p className="text-white">
                The Foundation aims to promote growth and wellbeing of the girl
                child, single mothers and widows
              </p>
            </Card.Section>
            <Card.Section className="!text-center">
              <MyButton
                rightSection={
                  <IconHeart
                    size={15}
                    className="ml-2 fill-white group-hover:fill-black transition text-white group-hover:text-black "
                  />
                }
              >
                Support Us
              </MyButton>
            </Card.Section>
          </Card>
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
              <MyButton
                rightSection={
                  <IconArrowMoveRight
                    size={15}
                    className="ml-2 fill-white   text-white transition group-hover:!text-black "
                  />
                }
              >
                <Link href={'/contact'}>Contact</Link>
              </MyButton>
            </Card.Section>
          </Card>
        </div>
      </div>
      <div className="top mt-8 ">
        <div className="semiTop flex flex-col md:flex-row gap-4 justify-between">
          <div className="left space-y-4 flex flex-col items-center">
            <div>
              <p className="text-white text-center">Social networks of </p>
              <p className="text-white text-center">
                BEHIND MARYGIFT WALLS FOUNDATION
              </p>
            </div>
            <SocialButtons />
          </div>
          <div className="right flex flex-col items-center w-full basis-[60%] space-y-4">
            {links?.slice(0, 3)?.map((link) => (
              <Link
                href={link.link}
                key={link.link}
                className=" w-full block relative "
              >
                <p className=" text-yellow-400 !w-full text-bold text-3xl">
                  {link.label}
                </p>
                <div className="absolute w-full h-[2px] inset-x-0 bg-yellow-400 -bottom-1 " />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="bottom flex flex-col md:flex-row items-center justify-between mt-8 pb-4 text-white sm:mt-16">
        <p>© {year} All rights reserved.</p>
        <p className="text-center">BEHIND MARYGIFT WALLS FOUNDATION</p>
      </div>
    </div>
  );
};

export default Footer;
