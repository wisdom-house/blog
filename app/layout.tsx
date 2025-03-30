import { type Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Kumbh_Sans } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

import { pageTitle } from '@/utils/pageTitle';

import '@/styles/globals.css';
import { Toaster } from 'sonner';

const font = Kumbh_Sans({
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
        <ThemeProvider attribute="class">{children}</ThemeProvider>

        <Toaster position="top-right" expand richColors />

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
