import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { fromEmail } from './constants';

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_PORT === '465',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
} as SMTPTransport.Options);

type MailInfo = {
  to: Mail.Address | Mail.Address[];
  subject: string;
  text: string;
  html?: string;
  bcc?: Mail.Address | Mail.Address[];
};

export const sendEmail = async (mail: MailInfo) => {
  return await transport.sendMail({ ...mail, from: fromEmail });
};
