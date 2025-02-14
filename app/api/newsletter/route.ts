import { NextResponse } from 'next/server';
import Mail from 'nodemailer/lib/mailer';

import NewsletterSignupAdmin from '@/components/email-templates/newsletter-sign-up-admin.template';
import NewsletterSignupUser from '@/components/email-templates/newsletter-sign-up-user.template';
import { client } from '@/sanity/lib/client';
import { sendEmail } from '@/utils/send-mail.utils';
import { render } from '@react-email/render';

export async function POST(request: Request) {
  const { name, email } = await request.json();

  if (!client) {
    console.log('Sanity client not configured');
    return NextResponse.json(
      { message: 'Sanity client not configured' },
      { status: 500 }
    );
  }

  if (!name || !email) {
    console.log('Missing required fields');
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

    console.log('Comment created successfully:', result);

    const from: Mail.Address = {
      name: 'no-reply@wisdomhint.com',
      address: process.env.MAIL_USERNAME as string,
    };

    const adminEmail: Mail.Address = {
      name: 'Admin',
      address: process.env.ADMIN_EMAIL as string,
    };

    const userEmail: Mail.Address = {
      name,
      address: email,
    };

    const userEmailHtml = await render(
      NewsletterSignupUser({
        name,
      })
    );

    const newsletterSignupUserText = `Welcome to Our Newsletter, ${name}!

Thank you for subscribing! You'll now receive the latest updates, exclusive content, and special offers directly in your inbox.

Stay tuned for exciting news and valuable insights!

Best regards,  
[Your Brand Name]`;

    await sendEmail({
      from,
      to: [userEmail],
      subject: `You're Subscribed! Welcome to Our Newsletter`,
      text: newsletterSignupUserText,
      html: userEmailHtml,
    });

    const emailHtml = await render(
      NewsletterSignupAdmin({
        name,
        email: email.toLowerCase(),
      })
    );

    const newsletterSignupAdminText = `New Newsletter Subscription

A new user has just subscribed to the newsletter!

Name: ${name}  
Email: ${email}

Make sure to engage with them and provide valuable content.

Best,  
Your Newsletter Team`;

    await sendEmail({
      from,
      to: [adminEmail],
      subject: `New Newsletter Signup: ${name.toUpperCase()} has subscribed!`,
      text: newsletterSignupAdminText,
      html: emailHtml,
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
