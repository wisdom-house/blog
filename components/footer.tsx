import Link from 'next/link';
import SvgIcon from './icon';
import { IconName } from '@/types/icon.type';
import NewsletterSignUp from './forms/newsletter-sign-up.form';
import {
  BRAND_NAME,
  // FACEBOOK,
  INSTAGRAM,
  // TIKTOK,
  TWITTER,
} from '@/utils/constants';
import { routes } from '@/lib/routes';

export const socials = [
  // { route: FACEBOOK, label: 'Facebook', icon: 'facebook' },
  { route: INSTAGRAM, label: 'Instagram', icon: 'instagram' },
  { route: TWITTER, label: 'X (Twitter)', icon: 'twitter' },
  // { route: TIKTOK, label: 'TikTok', icon: 'tiktok' },
];

const quickLinks = [
  { href: routes.about(), label: 'About Us' },
  { href: routes.contact(), label: 'Contact' },
];

const Footer = () => {
  return (
    <footer className="app-padding bg-app-black text-app-white py-16 px-8 md:px-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
        {/* Newsletter Section */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-4">
            Stay Updated
          </h2>
          <p className="text-sm text-app-white/80 mb-4">
            Subscribe to our newsletter for the latest news, insights, and
            exclusive offers.
          </p>
          <NewsletterSignUp />
        </div>

        {/* Quick Links Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-primary mb-4">
            Quick Links
          </h2>
          <ul className="space-y-3">
            {quickLinks.map(({ href, label }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-sm text-app-white/80 hover:text-tertiary transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-primary mb-4">Follow Us</h2>
          <div className="flex justify-center md:justify-start gap-5">
            {socials.map(({ route, label, icon }) => (
              <Link
                href={route}
                key={label}
                aria-label={label}
                className="hover:text-tertiary transition-colors duration-200"
                target="_blank"
              >
                <SvgIcon
                  name={icon as IconName}
                  className="w-7 h-7 hover:scale-110 transition-transform"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-app-white/80">
        <p>
          &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
        </p>
        <p className="mt-2">
          Powered by{' '}
          <Link
            href="https://tonnipaul.com"
            className="text-primary font-semibold hover:underline"
          >
            TonniPaul Inc.
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
