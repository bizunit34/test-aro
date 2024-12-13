import './globals.css';

import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
// import fs from 'fs';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
// import path from 'path';
import React from 'react';

import { ToastProvider } from '@/components';

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
  // const publicDirectory = path.join(process.cwd(), 'public', 'splash');

  // try {
  //   const files = fs.readdirSync(publicDirectory);
  //   // console.log('files: ', files);

  //   for (const file of files) {
  //     if (file.includes('untitled')) {
  //       const oldPath: string = path.join(publicDirectory, file);
  //       const newFileName: number = +file.replace(/[^0-9]/g, '');
  //       const newPath: string = path.join(
  //         publicDirectory,
  //         `${newFileName}.png`,
  //       );
  //       fs.rename(oldPath, newPath, (err) => {
  //         if (err) {
  //           console.error('Error renaming file:', err);
  //         }
  //       });
  //     }
  //   }
  // } catch (error) {
  //   console.error(error);
  // }

  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ToastProvider>
              <Header />
              <div className='main'>{children}</div>
              <Footer />
            </ToastProvider>
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
