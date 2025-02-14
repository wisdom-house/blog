import { socials } from '@/components/footer';
import { Link, Section, Text } from '@react-email/components';

export const EmailFooter = () => (
  <Section className="text-center mt-6">
    <Text className="text-sm text-gray-600">Follow us on social media:</Text>
    <div className="flex flex-col justify-center gap-2 mt-2">
      {socials.map(({ route, label }) => (
        <Link
          key={label}
          href={route}
          className="text-[#ef4136] hover:text-[#ef4136]/70 transition-all text-sm"
        >
          {label}
        </Link>
      ))}
    </div>
    <Section className="mt-4 text-xs text-gray-500">
      <Text>
        &copy; {new Date().getFullYear()} Wisdom House International. All Rights
        Reserved.
      </Text>
    </Section>
  </Section>
);
