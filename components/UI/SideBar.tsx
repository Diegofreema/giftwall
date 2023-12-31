'use client';

import { ScrollArea } from '@mantine/core';
import { LinksGroup } from './LinkGroup';

const link = [
  {
    label: 'About Us',
    link: '/about-us',
    links: [
      {
        label: 'Our Team',
        link: '/about-us/our-team',
      },
      {
        label: 'Become a Volunteer',
        link: '/about-us/become-a-volunteer',
      },
      {
        label: 'Our priorities',
        link: '/about-us/our-priorities',
      },
      {
        label: 'Food Outreach',
        link: '/services/food-outreach',
      },
    ],
  },
  {
    label: 'Events',
    link: '/events',
  },
  {
    label: 'BMWF Projects',
    link: '#',
    links: [
      {
        label: 'Feed One For All',
        link: '/bmwf-projects/feed-one-feed-all',
      },
      {
        label: 'Street To Classroom',
        link: '/bmwf-projects/street-to-classroom',
      },
      {
        label: 'Clean And Healthy Girl',
        link: '/bmwf-projects/clean-healthy-girl',
      },
    ],
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
        label: 'Good Health For Women',
        link: '/services/good-health-for-women',
      },
      {
        label: 'Food Outreach',
        link: '/services/food-outreach',
      },
    ],
  },
  {
    label: 'Gallery',
    link: '#',
    links: [
      {
        label: 'Images',
        link: '/gallery/image',
      },
      {
        label: 'Videos',
        link: '/gallery/video',
      },
    ],
  },
  {
    label: 'FAQ',
    link: '/faq',
  },
  {
    label: 'Blog',
    link: '/blog',
  },
];

export function SideMenu({ close }: { close: () => void }) {
  const links = link.map((item) => (
    <LinksGroup close={close} {...item} key={item.label} />
  ));

  return (
    <nav>
      <ScrollArea>
        <div className="flex flex-col  pt-[30px] ">{links}</div>
      </ScrollArea>
    </nav>
  );
}
