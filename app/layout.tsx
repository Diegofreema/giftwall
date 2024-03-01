import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './globals.css';

import Footer from '@/components/UI/Footer';
import Provider from '@/components/Provider';
import { Toaster } from '@/components/UI/toaster';
import { CrispProvider } from '@/components/Crisp/CrispProvider';
import { cn } from '@/lib/utils';
import { AuthDialog } from '@/components/Auth';
import { HeaderMenu } from '@/components/UI/Header';

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
      <body className={cn(inter.className, 'min-h-screen ')}>
        <Provider>
          <MantineProvider>
            <ClerkProvider>
              <CrispProvider />
              <HeaderMenu />
              <AuthDialog />
              {children}
              <Footer />
              <Toaster />
            </ClerkProvider>
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
}
