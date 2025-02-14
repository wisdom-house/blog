import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
} from '@react-email/components';
import { Tailwind as TailwindConfig } from '@react-email/tailwind';
import { EmailHeader } from './email-header.template';
import { EmailFooter } from './email-footer.template';

interface NewCommentEmailProps {
  name: string;
  email: string;
  comment: string;
  post_title: string;
  post_url: string;
}

export default function NewCommentEmail({
  name,
  email,
  comment,
  post_title,
  post_url,
}: NewCommentEmailProps) {
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
                New Comment on Your Post
              </Text>
              <div className="space-y-4">
                <Text className="text-lg">
                  <strong className="text-secondary">Name:</strong> {name}
                </Text>
                <Text className="text-lg">
                  <strong className="text-secondary">Email:</strong> {email}
                </Text>
                <Text className="text-lg">
                  <strong className="text-secondary">Post:</strong>{' '}
                  <Link href={post_url} className="text-[#ef4136] underline">
                    {post_title}
                  </Link>
                </Text>
                <Text className="text-lg">
                  <strong className="text-secondary">Comment:</strong>
                </Text>
                <Text className="border border-gray-300 p-4 rounded-lg bg-gray-50">
                  {comment}
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
