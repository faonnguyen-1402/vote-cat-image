import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
// import './globals.css';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        {children}
        <Toaster position='top-right' reverseOrder={false} />
      </body>
    </html>
  );
}
