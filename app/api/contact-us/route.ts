import ContactEmail, {
  contactEmailText,
} from '@/components/email-templates/contact-us.template';
import { adminEmail, devEmail } from '@/utils/constants';
import { sendEmail } from '@/utils/send-mail.utils';
import { render } from '@react-email/render';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailHtml = await render(
      ContactEmail({ name, email: email.toLowerCase(), message })
    );

    await sendEmail({
      to: [adminEmail],
      subject: 'New Contact Form Submission',
      text: contactEmailText({ name, email, message }),
      html: emailHtml,
      bcc: [devEmail],
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
