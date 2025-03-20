import { sendEmail } from '@/utils/send-mail.utils';
import { NextResponse } from 'next/server';

const subscribers = ['user1@tonnipaul.com', 'user2@tonnipaul.com'];

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.slug || !body?.title) {
      return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
    }

    const blogTitle = body.title;
    const blogUrl = `https://your-nextjs-app.com/blog/${body.slug}`;

    await sendEmail({
      subject: `New Blog Post: ${blogTitle}`,
      html: `<p>A new blog post has been published: <strong>${blogTitle}</strong></p>
             <p>Read it here: <a href="${blogUrl}">${blogUrl}</a></p>`,
      bcc: subscribers.map((email) => ({ address: email, name: '' })),
      to: {
        name: 'Paul AA',
        address: 'ariyoadeoyepaul@gmail.com',
      },
      text: `<p>A new blog post has been published: <strong>${blogTitle}</strong></p>
             <p>Read it here: <a href="${blogUrl}">${blogUrl}</a></p>`,
    });

    return NextResponse.json(
      { message: 'Emails sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
