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

export const newsletterSignupAdminText = (name: string, email: string) => {
  return `📩 New Newsletter Subscription Alert!  

A new user has just subscribed to the newsletter.  

👤 **Name:** ${name}  
✉️ **Email:** ${email}  

Ensure they receive a warm welcome and valuable content!  

Best,  
Your Newsletter Team`;
};

export default function NewsletterSignupAdmin({
  name,
  email,
}: NewsletterSignupAdminProps) {
  return (
    <Html>
      <Head />
      <TailwindConfig>
        <Body className="bg-gray-50 text-gray-900 font-sans">
          <Container className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            {/* Header */}
            <EmailHeader />

            <Section className="my-8">
              <Text className="text-2xl font-extrabold text-center text-[#ef4136]">
                📩 New Newsletter Signup!
              </Text>
              <Text className="text-lg text-gray-700 text-center mt-2">
                A new user has just subscribed to the newsletter. Here are their
                details:
              </Text>

              <div className="border border-gray-200 p-4 mt-6 rounded-lg bg-gray-50">
                <Text className="text-lg">
                  <strong className="text-[#02498e]">👤 Name:</strong> {name}
                </Text>
                <Text className="text-lg">
                  <strong className="text-[#02498e]">✉️ Email:</strong> {email}
                </Text>
              </div>

              <Text className="text-lg text-gray-700 mt-6">
                Make sure to engage with them and provide valuable content!
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
