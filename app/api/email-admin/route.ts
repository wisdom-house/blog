import { commentNotificationTemplate } from '@/lib/mail-templates/new-comment-notification';
import { sendEmail } from '@/utils/send-mail.utils';
import { NextResponse } from 'next/server';
import Mail from 'nodemailer/lib/mailer';

export async function POST(req: Request) {
  try {
    const { name, email, comment, post_title } = await req.json();

    if (!name || !email || !comment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { subject, text, html } = commentNotificationTemplate({
      name,
      email,
      comment,
      post_title,
      post_url: '',
    });

    const from: Mail.Address = {
      name: 'no-reply@wisdomhint.com',
      address: process.env.MAIL_USERNAME as string,
    };

    const adminEmail: Mail.Address = {
      name: 'Admin',
      address: process.env.ADMIN_EMAIL as string,
    };

    await sendEmail({
      from,
      to: [adminEmail],
      subject,
      text,
      html,
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
