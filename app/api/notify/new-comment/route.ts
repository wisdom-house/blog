import { render } from '@react-email/render';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import NewCommentEmail, {
  newCommentPlainText,
} from '@/components/email-templates/new-comment.template';
import { routes } from '@/lib/routes';
import { adminEmail, devEmail } from '@/utils/constants';
import { sendEmail } from '@/utils/send-mail.utils';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { client } from '@/sanity/lib/client';

const getPostUrl = async (slug: string) => {
  const headerList = await headers();
  const protocol = headerList.get('x-forwarded-proto') || 'http';
  const host = headerList.get('host');

  return `${protocol}://${host}${routes.post(slug)}`;
};

const API_SECRET = process.env.SANITY_WEBHOOK_SECRET as string;

export async function POST(request: Request) {
  const comment_data = await request.json();
  const { _id, name, email, comment } = comment_data;

  const signature = request.headers.get(SIGNATURE_HEADER_NAME) as string;

  const isValid = isValidSignature(
    JSON.stringify({ name, email }),
    signature,
    API_SECRET
  );

  if (!isValid) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 403,
    });
  }

  if (!_id || !name || !email || !comment) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 }
    );
  }

  const postData = await client.fetch(
    `*[_id == $postId] {
      title,
      slug
    }[0]`,
    { postId: comment_data.post._ref }
  );

  const post_title = postData.title;
  const post_slug = postData.slug?.current;
  const post_url = await getPostUrl(post_slug);

  try {
    const emailHtml = await render(
      NewCommentEmail({
        name,
        email: email.toLowerCase(),
        comment,
        post_title,
        post_url,
      })
    );

    await sendEmail({
      to: [adminEmail],
      subject: 'New Comment Alert: A User Commented on Your Post!',
      bcc: [devEmail],
      text: newCommentPlainText({
        name,
        email,
        comment,
        post_title: '',
        post_url,
      }),
      html: emailHtml,
    });

    return NextResponse.json(
      {
        message: 'Comment submitted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Couldn't send notification", error },
      { status: 500 }
    );
  }
}
