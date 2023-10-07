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
    link: '#',
    links: [
      {
        label: 'Girl Child Education',
        link: '/services/girl-child-education',
      },
      {
        label: 'Empowerment',
        link: '/services/empowerment',
      },
      {
        label: 'Operation Feed The Hungry',
        link: '/services/operation-feed-the-hungry',
      },
      {
        label: 'Good Health For Women',
        link: '/services/good-health-for-women',
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
];

export function SideMenu({ close }: { close: () => void }) {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    <Link href={link.link} className="w-fit" onClick={close}>
      {link.label}
    </Link>;
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.label} className="!w-fit" onClick={close}>
        <Link href={item.link} onClick={close}>
          {item.label}
        </Link>
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 3 }}
          withinPortal
        >
          <Menu.Target>
            <Link href={link.link} onClick={close}>
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
      <Link key={link.label} href={link.link} onClick={close}>
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
          className="!rounded-3xl !bg-yellow-400 text-white  "
          rightSection={<IconHeartHandshake size={20} />}
          onClick={close}
        >
          Support Us
        </Button>
      </Stack>
    </aside>
  );
}
