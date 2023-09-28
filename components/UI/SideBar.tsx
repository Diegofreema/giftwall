'use client';

import { Menu, Stack, Center, Button, Container, Avatar } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconHeartHandshake } from '@tabler/icons-react';
import Link from 'next/link';

const links = [
  {
    label: 'About Us',
    link: '/about-us',
    links: [
      {
        label: 'Our Team',
        link: '/our-team',
      },
      {
        label: 'Become a Volunteer',
        link: '/become-a-volunteer',
      },
      {
        label: 'Our priorities',
        link: '/our-priorities',
      },
    ],
  },
  {
    label: 'Events',
    link: '/events',
  },
  {
    label: 'BMWF Projects',
    link: '/bmwf-projects',
  },
  {
    label: 'Services',
    link: '/services',
    links: [
      {
        label: 'Girl Child Education',
        link: '/girl-child-education',
      },
      {
        label: 'Empowerment',
        link: '/empowerment',
      },
      {
        label: 'Operation Feed The Hungry',
        link: '/operation-feed-the-hungry',
      },
      {
        label: 'Good Health For Women',
        link: '/good-health-for-women',
      },
    ],
  },
  {
    label: 'Gallery',
    link: '/gallery',
  },
  {
    label: 'FAQ',
    link: '/faq',
  },
  {
    label: 'Articles',
    link: '/articles',
  },
];

export function SideMenu() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    <Link href={link.link} className="w-fit">
      {link.label}
    </Link>;
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.label} className="!w-fit">
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
            <Link href={link.link}>
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
      <Link key={link.label} href={link.link}>
        {link.label}
      </Link>
    );
  });

  return (
    <aside className="!h-full">
      <Stack
        gap={'md'}
        className="!text-purple-900 h-screen flex flex-col items-center"
        align="center"
        justify="center"
      >
        {items}
        <Button
          className="!rounded-3xl !bg-yellow-400 text-white w- "
          rightSection={<IconHeartHandshake size={20} />}
        >
          Support Us
        </Button>
      </Stack>
    </aside>
  );
}
