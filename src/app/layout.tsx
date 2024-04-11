import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dog App",
  description: "Discover new dog breeds!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Link href="/" className="flex items-center justify-between p-4">
          <Image
            className="relative cursor-pointer dark:invert"
            src="/dog-api-logo.svg"
            alt="Next.js Logo"
            width={40}
            height={40}
            priority
          />
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Dog App
          </h1>
        </Link>
        {children}
      </body>
    </html>
  );
}
