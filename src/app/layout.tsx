import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from 'next/link';
import Image from 'next/image';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Revolution 5",
  description: "The Fifth Revolution of the Heart and Mind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        
        <header className="bg-white shadow-md">
          <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
            
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Revolution 5</span>
                {/* UPDATED: Increased logo dimensions again for more impact. */}
                <Image
                  src="/logo-r5.png"
                  alt="Revolution 5 Logo"
                  width={240}
                  height={64}
                  priority
                />
              </Link>
            </div>
            
            <div className="flex gap-x-8">
              <Link href="/" className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-700">
                Home
              </Link>
              <Link href="/quest" className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-700">
                The Quest
              </Link>
              <Link href="/work-in-action" className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-700">
                Our Work
              </Link>
              <Link href="/genesis" className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-700">
                Our Genesis
              </Link>
              <Link href="/connect" className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-700">
                Connect
              </Link>
            </div>
          </nav>
        </header>
        
        <div className="flex-grow">
          {children}
        </div>

        <footer className="bg-gray-800 text-white mt-auto">
          <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
            <div className="flex justify-center space-x-6 md:order-2">
                <Link href="/" className="text-gray-400 hover:text-gray-300">
                    Return to Home
                </Link>
            </div>
            <div className="mt-8 md:order-1 md:mt-0">
                <p className="text-center text-xs leading-5 text-gray-400">
                    &copy; 2025 Market Catalyst Ltd. All rights reserved.
                </p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}