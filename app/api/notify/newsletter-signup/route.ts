import { render } from '@react-email/render';
import { NextResponse } from 'next/server';
import Mail from 'nodemailer/lib/mailer';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

import NewsletterSignupAdmin, {
  newsletterSignupAdminText,
} from '@/components/email-templates/newsletter-sign-up-admin.template';
import NewsletterSignupUser, {
  newLetterSignUpPlainText,
} from '@/components/email-templates/newsletter-sign-up-user.template';
import { adminEmail, devEmail } from '@/utils/constants';
import { sendEmail } from '@/utils/send-mail.utils';

const API_SECRET = process.env.SANITY_WEBHOOK_SECRET as string;

export async function POST(request: Request) {
  const { name, email } = await request.json();

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

  if (!name || !email) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 }
    );
  }

  try {
    const userEmail: Mail.Address = {
      name,
      address: email,
    };

    // Render the email template for the user
    const userEmailHtml = await render(
      NewsletterSignupUser({
        name,
      })
    );

    // Send email to the user
    await sendEmail({
      to: [userEmail],
      subject: `You're Subscribed! Welcome to Our Newsletter`,
      text: newLetterSignUpPlainText(name),
      html: userEmailHtml,
    });

    // Render the admin notification template
    const emailHtml = await render(
      NewsletterSignupAdmin({
        name,
        email: email.toLowerCase(),
      })
    );

    // Send email to the admin
    await sendEmail({
      to: [adminEmail],
      subject: `New Newsletter Signup: ${name.toUpperCase()} has subscribed!`,
      text: newsletterSignupAdminText(name, email),
      html: emailHtml,
      bcc: [devEmail],
    });

    return NextResponse.json(
      {
        message: 'Email sent successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Couldn't complete request", error },
      { status: 500 }
    );
  }
}
