import { render } from '@react-email/render';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Mail from 'nodemailer/lib/mailer';

import NewCommentEmail, {
  newCommentPlainText,
} from '@/components/email-templates/new-comment.template';
import { routes } from '@/lib/routes';
import { client } from '@/sanity/lib/client';
import { devEmail } from '@/utils/constants';
import { sendEmail } from '@/utils/send-mail.utils';

const getPostUrl = async (slug: string) => {
  const headerList = await headers();
  const protocol = headerList.get('x-forwarded-proto') || 'http';
  const host = headerList.get('host');

  return `${protocol}://${host}${routes.post(slug)}`;
};

export async function POST(request: Request) {
  const { _id, name, email, comment, status, post_title, slug } =
    await request.json();

  const post_url = await getPostUrl(slug);

  if (!client) {
    return NextResponse.json(
      { message: 'Sanity client not configured' },
      { status: 500 }
    );
  }

  if (!_id || !name || !email || !comment) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 }
    );
  }

  try {
    const result = await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
      status,
    });

    const adminEmail: Mail.Address = {
      name: 'Admin',
      address: process.env.ADMIN_EMAIL as string,
    };

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
      text: newCommentPlainText({ name, email, comment, post_title, post_url }),
      html: emailHtml,
    });

    return NextResponse.json(
      {
        message: 'Comment submitted successfully',
        data: {
          comment: result.comment,
          createdAt: result._createdAt,
          name: result.name,
          id: result._id,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Couldn't submit comment", error: err },
      { status: 500 }
    );
  }
}
