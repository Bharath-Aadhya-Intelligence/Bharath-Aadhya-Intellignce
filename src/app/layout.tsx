import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import CookieConsentProvider from "@/components/cookie-consent/CookieConsentProvider";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Bharath Aadhya Intelligence - Empowering the Smarter India",
  description: "Bharath Aadhya Intelligence (BAI) delivers end-to-end IT services that drive digital transformation, accelerate growth, and build the technology backbone of tomorrow's India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CookieConsentProvider>{children}</CookieConsentProvider>
      </body>
    </html>
  );
}
