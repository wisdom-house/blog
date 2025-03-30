import Mail from 'nodemailer/lib/mailer';

const BRAND_NAME = "Wisdom House Int'l";

const DATE_FORMAT = 'D MMM, YYYY';

const INSTAGRAM = 'https://www.instagram.com/wisdomhint_';
const TWITTER = 'https://x.com/wisdomhint';
const FACEBOOK = '#';
const TIKTOK = '#';

const SUPPORT_EMAIL = process.env.ADMIN_EMAIL as string;

const BASE_URL = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;

const adminEmail: Mail.Address = {
  name: 'Admin',
  address: process.env.ADMIN_EMAIL as string,
};

const devEmail: Mail.Address = {
  name: 'Developer',
  address: process.env.DEV_EMAIL as string,
};

const fromEmail: Mail.Address = {
  name: 'no-reply@wisdomhint.com',
  address: process.env.MAIL_USERNAME as string,
};

export {
  INSTAGRAM,
  TWITTER,
  FACEBOOK,
  TIKTOK,
  BRAND_NAME,
  DATE_FORMAT,
  SUPPORT_EMAIL,
  BASE_URL,
  adminEmail,
  devEmail,
  fromEmail,
};
