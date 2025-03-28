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
        <footer className="mt-12 text-center text-gray-600 text-sm p-8 border-t">
          <div className="max-w-4xl mx-auto">
            <p className="mb-4">© 2023 IP Subnet Calculator. All rights reserved.</p>
            <p className="mb-4">
              This IP subnet calculator is provided for educational purposes. While we strive for accuracy, please verify critical network configurations independently.
            </p>

          </div>
        </footer>
      </body>
    </html>
  );
}
