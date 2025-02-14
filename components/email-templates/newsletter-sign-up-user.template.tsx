import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind as TailwindConfig } from '@react-email/tailwind';
import { EmailHeader } from './email-header.template';
import { EmailFooter } from './email-footer.template';

interface NewsletterSignupUserProps {
  name: string;
}

export default function NewsletterSignupUser({
  name,
}: NewsletterSignupUserProps) {
  return (
    <Html>
      <Head />
      <TailwindConfig>
        <Body className="bg-gray-100 text-gray-900 font-sans">
          <Container className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg">
            {/* Header */}
            <EmailHeader />

            <Section className="my-6 text-center">
              <Text className="text-2xl font-bold text-[#ef4136] mb-4">
                Welcome to Our Newsletter, {name}!
              </Text>
              <Text className="text-lg text-gray-700">
                Thank you for subscribing! You&apos;ll now receive the latest
                updates, exclusive content, and special offers directly in your
                inbox.
              </Text>
              <Text className="text-lg text-gray-700">
                Stay tuned for exciting news and valuable insights!
              </Text>
            </Section>

            {/* Footer */}
            <EmailFooter />
          </Container>
        </Body>
      </TailwindConfig>
    </Html>
  );
}
