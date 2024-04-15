import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Arimo&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Toaster />
        <div className="flex w-full justify-end gap-2 px-4 py-2 text-blue-500">
          <Link locale="en" href="/">
            To English
          </Link>
          <Link locale="fi" href="/">
            To Finnish
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
