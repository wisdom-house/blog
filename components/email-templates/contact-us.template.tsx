import { IContactForm } from '@/types/contact.type';
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

export default function ContactEmail({ name, email, message }: IContactForm) {
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
                New Contact Form Submission
              </Text>
              <div className="space-y-4">
                <Text className="text-lg">
                  <strong className="text-secondary">Name:</strong> {name}
                </Text>
                <Text className="text-lg">
                  <strong className="text-secondary">Email:</strong> {email}
                </Text>
                <Text className="text-lg">
                  <strong className="text-secondary">Message:</strong>
                </Text>
                <Text className="border border-gray-300 p-4 rounded-lg bg-gray-50">
                  {message}
                </Text>
              </div>
            </Section>

            <EmailFooter />
          </Container>
        </Body>
      </TailwindConfig>
    </Html>
  );
}
