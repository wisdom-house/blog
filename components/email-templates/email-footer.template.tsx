import { FACEBOOK, INSTAGRAM, TIKTOK, TWITTER } from '@/utils/constants';
import { Link, Section, Text } from '@react-email/components';
import { FaFacebook, FaTiktok, FaInstagram, FaTwitter } from 'react-icons/fa';

const socials = [
  { route: FACEBOOK, label: 'Facebook', icon: <FaFacebook /> },
  { route: TWITTER, label: 'Twitter', icon: <FaTwitter /> },
  { route: INSTAGRAM, label: 'Instagram', icon: <FaInstagram /> },
  { route: TIKTOK, label: 'TikTok', icon: <FaTiktok /> },
];

export const EmailFooter = () => (
  <Section className="text-center mt-8 border-t border-gray-200 pt-6">
    <Text className="text-sm text-gray-600 font-medium">Connect with us:</Text>

    <div className="flex justify-center gap-5 mt-3">
      {socials.map(({ route, label, icon }) => (
        <Link
          key={label}
          href={route}
          className="text-[#ef4136] hover:text-[#ef4136]/70 transition-all text-xl"
          aria-label={label}
        >
          {icon}
        </Link>
      ))}
    </div>

    <Section className="mt-6 text-xs text-gray-500">
      <Text>
        &copy; {new Date().getFullYear()} Wisdom House International. All Rights
        Reserved.
      </Text>
    </Section>
    <Text className="mt-2 bg-[#ef4136] w-full py-4 text-white">
      Powered by{' '}
      <Link
        href="https://tonnipaul.com"
        className="font-semibold hover:underline text-white"
      >
        TonniPaul Inc.
      </Link>
    </Text>
  </Section>
);
