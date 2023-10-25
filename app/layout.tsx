import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './globals.css';

import { HeaderMenu } from '@/components/UI/Header';

import Footer from '@/components/UI/Footer';
import Provider from '@/components/Provider';
import { Toaster } from '@/components/UI/toaster';
import { CrispProvider } from '@/components/Crisp/CrispProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Behind Marygift Walls Foundation',
  description: 'A foundation that helps teenage girls and women',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === 'production' && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3715294239275186"
            crossOrigin="anonymous"
          ></script>
        )}
      </head>
      <body className={inter.className}>
        <Provider>
          <MantineProvider>
            <CrispProvider />
            <HeaderMenu />
            {children}
            <Footer />
            <Toaster />
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
}
