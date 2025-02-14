import Link from 'next/link';
import SvgIcon from './icon';
import { IconName } from '@/types/icon.type';
import NewsletterSignUp from './forms/newsletter-sign-up.form';
import {
  BRAND_NAME,
  FACEBOOK,
  INSTAGRAM,
  TIKTOK,
  TWITTER,
} from '@/utils/constants';
import { routes } from '@/lib/routes';

export const socials = [
  { route: FACEBOOK, label: 'Facebook', icon: 'facebook' },
  { route: INSTAGRAM, label: 'Instagram', icon: 'instagram' },
  { route: TWITTER, label: 'x (Twitter)', icon: 'twitter' },
  { route: TIKTOK, label: 'Tiktok', icon: 'tiktok' },
];

const quickLinks = [
  { href: routes.about(), label: 'About Us' },
  { href: routes.contact(), label: 'Contact' },
];

const Footer = () => {
  return (
    <footer className="app-padding bg-app-black text-app-white py-12 px-6 md:px-12">
      <div className="grid grid-cols-1 lmd:grid-cols-3 gap-8 md:gap-12">
        <div>
          <h2 className="text-lg font-semibold text-primary mb-4">
            Subscribe to our Newsletter
          </h2>
          <p className="text-sm mb-4">
            Get the latest updates, insights, and articles delivered to your
            inbox.
          </p>
          <NewsletterSignUp />
        </div>

        <div>
          <h2 className="font-semibold text-primary mb-4">Quick Links</h2>
          <ul className="space-y-2">
            {quickLinks.map(({ href, label }) => (
              <li key={label}>
                <Link href={href} className="hover:text-tertiary transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h2 className="font-semibold text-primary mb-4">Follow Us</h2>
          <div className="flex justify-center md:justify-start gap-4">
            {socials.map(({ route, label, icon }) => (
              <Link
                href={route}
                key={label}
                aria-label={label}
                className=" hover:text-tertiary transition"
              >
                <SvgIcon
                  name={icon as IconName}
                  className="w-6 h-6 hover:scale-110 transition-transform"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 mt-8 pt-6 text-center ">
        &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
