import { sendEmail } from '@/utils/send-mail.utils';
import { NextResponse } from 'next/server';
import Mail from 'nodemailer/lib/mailer';
import { render } from '@react-email/render';
import ContactEmail from '@/components/email-templates/contact-us.template';
import { BRAND_NAME } from '@/utils/constants';

export const POST = async (req: Request) => {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const from: Mail.Address = {
      name: BRAND_NAME,
      address: process.env.MAIL_USERNAME as string,
    };

    const adminEmail: Mail.Address = {
      name: 'Admin',
      address: process.env.ADMIN_EMAIL as string,
    };

    const emailHtml = await render(
      ContactEmail({ name, email: email.toLowerCase(), message })
    );

    await sendEmail({
      from,
      to: [adminEmail],
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: emailHtml,
    });

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send message', error: error },
      { status: 500 }
    );
  }
};
