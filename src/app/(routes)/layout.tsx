import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { SessionProvider } from 'next-auth/react';
import LayoutContent from './LayoutContent'; // We'll create this next

// Font setup
const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning data-theme='dark'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Theme>
            <LayoutContent modal={modal}>{children}</LayoutContent>
          </Theme>
        </SessionProvider>
      </body>
    </html>
  );
}
