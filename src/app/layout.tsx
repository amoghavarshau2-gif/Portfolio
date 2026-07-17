import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amoghavarsha - Creative Designer, Photographer & Finance Expert",
  description: "Portfolio of Amoghavarsha, showcasing work in UI/UX Design, Professional Photography, and Financial Consulting.",
  keywords: ["UI/UX Designer", "Graphic Designer", "Professional Photographer", "Accountant", "Finance Professional", "Portfolio", "Amoghavarsha"],
  icons: {
    icon: "/Amogh1.jpeg",
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
