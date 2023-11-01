'use client';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { twMerge } from 'tailwind-merge';
import { Menu, Group, Center, Button, Container, Avatar } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronDown,
  IconHeartHandshake,
  IconLogin2,
} from '@tabler/icons-react';
import Link from 'next/link';

import { links } from '@/exports';
import { MobileHeader } from '../Home/MobileHeader';
import { usePathname } from 'next/navigation';

import { motion } from 'framer-motion';
const MotionLink = motion(Link);
export function HeaderMenu() {
  const pathname = usePathname();

  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    <Link
      href={link.link}
      className={twMerge(
        'hover:!text-yellow-400 transition inline-block',
        pathname === link.link || pathname.includes(link.link)
          ? 'text-yellow-400'
          : 'text-white'
      )}
    >
      {link.label}
    </Link>;

    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.label}>
        <Link
          className="hover:bg-purple-900 hover:text-white p-1 block transition"
          href={item.link}
        >
          {item.label}
        </Link>
      </Menu.Item>
    ));
    const servicesPath = link.link === '/services';
    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <Link
              onClick={(event) => {
                if (servicesPath) {
                  event.preventDefault();
                }
              }}
              href={link.link}
              className={twMerge(
                pathname.includes(link.link) ? 'text-yellow-400' : 'text-white',
                ' transition inline-block'
              )}
            >
              <Center>
                <span>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link
        key={link.label}
        href={link.link}
        className={twMerge(
          pathname.includes(link.link) ? 'text-yellow-400' : 'text-white'
        )}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <header className="bg-purple-900   py-2 z-20 fixed inset-x-0 top-0">
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          className="flex justify-between items-center"
        >
          <Link href={'/'}>
            <Avatar size={80} src={'/bmw.png'} />
          </Link>

          <Group gap={8} visibleFrom="md" className="text-white">
            {items}
            <Button
              className="!rounded-3xl !bg-yellow-400"
              rightSection={<IconHeartHandshake size={20} />}
            >
              Support Us
            </Button>
          </Group>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button className="" rightSection={<IconLogin2 size={20} />}>
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
          <MobileHeader />
        </motion.div>
      </Container>
    </header>
  );
}
