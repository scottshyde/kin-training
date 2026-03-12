import type { Metadata } from "next";
import { SessionWrapper } from "@/components/SessionWrapper";
import "./globals.css";

// Fonts will be loaded via CSS imports in globals.css

export const metadata: Metadata = {
  title: "KIN Home Training Portal",
  description: "Sales training portal for KIN Home - Closer Manual, Builder Playbook, Setter Manual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
