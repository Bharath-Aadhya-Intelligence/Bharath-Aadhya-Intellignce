import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bharath Aadhya Intelligence — Enterprise IT Solutions & Software Engineering",
  description:
    "Bharath Aadhya Intelligence provides enterprise-grade IT services, custom software engineering, cloud architectures, and intelligent digital solutions for growing enterprises.",
  icons: {
    icon: "/icon.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-brand-teal/30 selection:text-brand-navy">
        {children}
      </body>
    </html>
  );
}
