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

export const newCommentPlainText = ({
  name,
  email,
  comment,
  post_title,
  post_url,
}: NewCommentEmailProps) => {
  return `📝 New Comment Notification  

You have received a new comment on your post.  

👤 **Name:** ${name}  
✉️ **Email:** ${email}  
📌 **Post:** ${post_title.toUpperCase()}  
🔗 **Post URL:** ${post_url}  

💬 **Comment:**  
"${comment}"  

Make sure to review and engage with the commenter!  
`;
};

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
        <Body className="bg-gray-50 text-gray-900 font-sans">
          <Container className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            {/* Header */}
            <EmailHeader />

            <Section className="my-8">
              <Text className="text-2xl font-extrabold text-center text-[#ef4136]">
                📝 New Comment on Your Post!
              </Text>
              <Text className="text-lg text-gray-700 text-center mt-2">
                You have received a new comment. Here are the details:
              </Text>

              <div className="border border-gray-200 p-4 mt-6 rounded-lg bg-gray-50">
                <Text className="text-lg">
                  <strong className="text-secondary">👤 Name:</strong> {name}
                </Text>
                <Text className="text-lg">
                  <strong className="text-secondary">✉️ Email:</strong> {email}
                </Text>
                <Text className="text-lg">
                  <strong className="text-secondary">📌 Post:</strong>{' '}
                  <Link href={post_url} className="text-[#ef4136] underline">
                    {post_title}
                  </Link>
                </Text>
              </div>

              <Text className="text-lg text-secondary mt-6 font-semibold">
                💬 Comment:
              </Text>
              <Text className="border border-gray-300 p-4 rounded-lg bg-gray-50">
                {comment}
              </Text>

              <Text className="text-lg text-gray-700 mt-6">
                Make sure to review and engage with the commenter!
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
