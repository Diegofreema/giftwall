'use client';
import { twMerge } from 'tailwind-merge';
import { Menu, Group, Center, Button, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconHeartHandshake } from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';
import { links } from '@/exports';
import { MobileHeader } from '../Home/MobileHeader';
import { usePathname, useRouter } from 'next/navigation';

import { motion } from 'framer-motion';
const MotionLink = motion(Link);
export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const navigate = () => {
    router.push('https://flutterwave.com/donate/hooymfuxdq9k');
  };
  console.log(pathname);
  const notDonatePage = pathname !== '/donate';
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    <Link
      as={link.link}
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
    const servicesPath =
      link.link === '/services' ||
      link.link === '/gallery' ||
      link.link === '/bmwf-projects';
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
              as={link.link}
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
            <div className="w-10 h-10 md:w-[100px] md:h-[100px] relative">
              <Image alt="avatar" src={'/bmw.png'} fill priority />
            </div>
          </Link>

          <Group gap={8} visibleFrom="md" className="text-white">
            {items}
            {notDonatePage && (
              <Button
{/*                 onClick={navigate} */}
                className="!rounded-3xl !bg-yellow-400"
                rightSection={<IconHeartHandshake size={20} />}
              >
                Support Us
              </Button>
            )}
          </Group>

          <MobileHeader />
        </motion.div>
      </Container>
    </header>
  );
}
