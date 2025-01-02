import { type Metadata } from 'next';

import { Montserrat } from 'next/font/google';

import { pageTitle } from '@/utils/pageTitle';

import '@/styles/globals.css';

const font = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: pageTitle(),

  description:
    'Stay informed and entertained with Wisdom House Blog! Discover the latest news, trending entertainment stories, captivating gossip, lifestyle tips, educational insights, and more. Your one-stop destination for diverse and engaging content.',

  icons: '/assets/logo.png',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}
