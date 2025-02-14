import { render } from '@react-email/render';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Mail from 'nodemailer/lib/mailer';

import NewCommentEmail from '@/components/email-templates/new-comment.template';
import { routes } from '@/lib/routes';
import { client } from '@/sanity/lib/client';
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

  console.log('POST URL', post_url);

  if (!client) {
    console.log('Sanity client not configured');
    return NextResponse.json(
      { message: 'Sanity client not configured' },
      { status: 500 }
    );
  }

  if (!_id || !name || !email || !comment) {
    console.log('Missing required fields');
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

    console.log('Comment created successfully:', result);

    const from: Mail.Address = {
      name: 'no-reply@wisdomhint.com',
      address: process.env.MAIL_USERNAME as string,
    };

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

    const text = `You have received a new comment on your post.

Name: ${name}
Email: ${email}
Comment: ${comment}
Post: ${post_title.toUpperCase()}
    `;

    await sendEmail({
      from,
      to: [adminEmail],
      subject: 'New Comment Alert: A User Commented on Your Post!',
      bcc: [
        {
          name: 'Paul AA',
          address: 'ariyoadeoyepaul@gmail.com',
        },
        {
          name: 'Hello Paul',
          address: 'hello@tonnipaul.com',
        },
      ],
      text,
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
    console.error('Error in comment submission:', err);

    return NextResponse.json(
      { message: "Couldn't submit comment", error: err },
      { status: 500 }
    );
  }
}
