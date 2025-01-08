import { type Metadata } from 'next';

import { Open_Sans } from 'next/font/google';

import { pageTitle } from '@/utils/pageTitle';

import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';

const font = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: pageTitle(),

  description:
    'Stay informed and entertained with Wisdom House Blog! Discover the latest news, trending entertainment stories, captivating gossip, lifestyle tips, educational insights, and more. Your one-stop destination for diverse and engaging content.',

  icons: '/assets/logo.png',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} antialiased`}>
        <ThemeProvider attribute="class" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
