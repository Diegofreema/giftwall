'use client';
import { twMerge } from 'tailwind-merge';
import { Menu, Group, Center, Button, Container, Avatar } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconHeartHandshake } from '@tabler/icons-react';
import Link from 'next/link';

import { links } from '@/exports';
import { MobileHeader } from '../Home/MobileHeader';
import { useParams, usePathname } from 'next/navigation';

export function HeaderMenu() {
  const pathname = usePathname();
  console.log(pathname);

  const [opened, { toggle }] = useDisclosure(false);
  // const isActive = pathname ===
  const items = links.map((link) => {
    <Link
      href={link.link}
      className={twMerge(
        pathname === link.link ? 'text-yellow-400' : 'text-white'
      )}
    >
      {link.label}
    </Link>;
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.label}>
        <Link href={item.link}>{item.label}</Link>
      </Menu.Item>
    ));

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
              href={link.link}
              className={twMerge(
                pathname.includes(link.link) ? 'text-yellow-400' : 'text-white'
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
    <header className="bg-purple-900 py-2 z-20 fixed inset-x-0 top-0">
      <Container size="lg">
        <div className="flex justify-between items-center">
          <Link href={'/'}>
            <Avatar size={100} src={'/bmw.png'} />
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
          <MobileHeader />
        </div>
      </Container>
    </header>
  );
}
