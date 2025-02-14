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

interface NewsletterSignupAdminProps {
  name: string;
  email: string;
}

export default function NewsletterSignupAdmin({
  name,
  email,
}: NewsletterSignupAdminProps) {
  return (
    <Html>
      <Head />
      <TailwindConfig>
        <Body className="bg-gray-100 text-gray-900 font-sans">
          <Container className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg">
            {/* Header */}
            <EmailHeader />

            <Section className="my-6">
              <Text className="text-2xl font-bold text-center text-[#ef4136] mb-4">
                New Newsletter Subscription
              </Text>
              <div className="space-y-4">
                <Text className="text-lg">
                  <strong className="text-[#02498e]">Name:</strong> {name}
                </Text>
                <Text className="text-lg">
                  <strong className="text-[#02498e]">Email:</strong> {email}
                </Text>
                <Text className="text-lg text-gray-700">
                  A new user has just subscribed to the newsletter!
                </Text>
              </div>
            </Section>

            {/* Footer */}
            <EmailFooter />
          </Container>
        </Body>
      </TailwindConfig>
    </Html>
  );
}
