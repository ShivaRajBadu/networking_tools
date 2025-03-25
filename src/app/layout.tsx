import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Network Tools',
  description: 'A collection of networking tools for students, administrators and professionals',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="container mx-auto  py-8">
          {children}
        </main>
        <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
          <div className="container mx-auto">
            Network Tools © {new Date().getFullYear()}
          </div>
        </footer>
      </body>
    </html>
  );
}
