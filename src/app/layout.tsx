import './globals.css';

import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import React from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import theme from './theme';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'ARO Connection',
  description: 'ARO Connection',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Header />
            <div className='main'>{children}</div>
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
        <script
          defer
          type='application/javascript'
          src='https://cdn.pacdora.com/Pacdora-v1.1.4.js'
        ></script>
      </body>
    </html>
  );
}
