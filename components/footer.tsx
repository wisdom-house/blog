import {
  BRAND_NAME,
  FACEBOOK,
  INSTAGRAM,
  TIKTOK,
  TWITTER,
} from '@/utils/constants';
import Link from 'next/link';
import React from 'react';
import SvgIcon from './icon';
import { IconName } from '@/types/icon.type';

const socials = [
  {
    route: FACEBOOK,
    label: 'Facebook',
    icon: 'facebook',
  },
  {
    route: INSTAGRAM,
    label: 'Instagram',
    icon: 'instagram',
  },
  {
    route: TWITTER,
    label: 'x (Twitter)',
    icon: 'twitter',
  },
  {
    route: TIKTOK,
    label: 'Tiktok',
    icon: 'tiktok',
  },
];

const Footer = () => {
  return (
    <footer className="app-padding py-5 bg-black flex justify-between gap-6 flex-wrap text-white">
      <p className="">
        &copy;
        {` ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.`}
      </p>

      <div className="flex gap-3 items-center">
        {socials.map(({ route, label, icon }) => (
          <Link href={route} key={label} aria-label={label}>
            <SvgIcon name={icon as IconName} className="w-6 h-6" />
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
