import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandYoutube,
} from '@tabler/icons-react';
import Link from 'next/link';

type Props = {};

const socials = [
  {
    href: 'https://www.facebook.com/Marygiftwalls/',
    Icon: IconBrandFacebook,
  },
  {
    href: 'https://www.linkedin.com/in/behindmarygiftwallsfoundation/',
    Icon: IconBrandLinkedin,
  },
  {
    href: 'https://www.youtube.com/@UnstoppableSunshine1',
    Icon: IconBrandYoutube,
  },
  {
    href: 'https://www.instagram.com/behindmarygiftwallsfoundation/',
    Icon: IconBrandInstagram,
  },
  {
    href: 'https://www.tiktok.com/search?q=Unstoppable%20Sunshine&t=1695898560369',
    Icon: IconBrandTiktok,
  },
];

const SocialButtons = (props: Props) => {
  return (
    <div className="flex space-x-2 items-center">
      {socials.map(({ Icon, href }) => (
        <Link
          href={href}
          target="_blank"
          key={href}
          className="border border-white p-2 rounded-full inline-block"
        >
          <Icon
            color="white"
            className="transition duration-300 scale-95 hover:scale-110"
            size={20}
          />
        </Link>
      ))}
    </div>
  );
};

export default SocialButtons;
