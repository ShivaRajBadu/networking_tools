import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IP Subnet Calculator | IPv4 & IPv6 Subnet Calculator Tool",
  description: "Free online IP subnet calculator for IPv4 and IPv6 addresses. Calculate network address, broadcast address, usable host ranges, subnet masks, and more.",
  keywords: ['IP subnet calculator', 'IPv4 calculator', 'IPv6 calculator', 'CIDR calculator', 'network calculator', 'subnet mask', 'IP address', 'networking tools'],
  openGraph: {
    title: 'IP Subnet Calculator | IPv4 & IPv6 Subnet Calculator Tool',
    description: 'Free online IP subnet calculator for IPv4 and IPv6 addresses. Calculate network address, broadcast address, usable host ranges, subnet masks, and more.',
    type: 'website',
    url: 'https://yourwebsite.com/ip-subnet-calculator',
  },
  alternates: {
    canonical: 'https://yourwebsite.com/ip-subnet-calculator',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
