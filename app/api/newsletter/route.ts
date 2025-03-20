import { render } from '@react-email/render';
import { NextResponse } from 'next/server';
import Mail from 'nodemailer/lib/mailer';

import NewsletterSignupAdmin, {
  newsletterSignupAdminText,
} from '@/components/email-templates/newsletter-sign-up-admin.template';
import NewsletterSignupUser, {
  newLetterSignUpPlainText,
} from '@/components/email-templates/newsletter-sign-up-user.template';
import { client } from '@/sanity/lib/client';
import { adminEmail, devEmail } from '@/utils/constants';
import { sendEmail } from '@/utils/send-mail.utils';

export async function POST(request: Request) {
  const { name, email } = await request.json();

  if (!client) {
    return NextResponse.json(
      { message: 'Sanity client not configured' },
      { status: 500 }
    );
  }

  if (!name || !email) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 }
    );
  }

  try {
    const result = await client.create({
      _type: 'newsletter',
      name,
      email,
    });

    const userEmail: Mail.Address = {
      name,
      address: email,
    };

    const userEmailHtml = await render(
      NewsletterSignupUser({
        name,
      })
    );

    await sendEmail({
      to: [userEmail],
      subject: `You're Subscribed! Welcome to Our Newsletter`,
      text: newLetterSignUpPlainText(name),
      html: userEmailHtml,
    });

    const emailHtml = await render(
      NewsletterSignupAdmin({
        name,
        email: email.toLowerCase(),
      })
    );

    await sendEmail({
      to: [adminEmail],
      subject: `New Newsletter Signup: ${name.toUpperCase()} has subscribed!`,
      text: newsletterSignupAdminText(name, email),
      html: emailHtml,
      bcc: [devEmail],
    });

    return NextResponse.json(
      {
        message: 'Signed up successfully',
        data: {
          createdAt: result._createdAt,
          name: result.name,
          id: result._id,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Couldn't complete request", error: err },
      { status: 500 }
    );
  }
}
