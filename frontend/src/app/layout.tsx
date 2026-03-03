import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MailMitra - Cold Email Generator for Indian Freelancers",
  description: "Generate personalized, human-sounding cold emails in seconds. Built for Indian freelancers and agencies. 5 free emails daily.",
  keywords: ["cold email", "email generator", "freelancer", "India", "B2B", "lead generation"],
  openGraph: {
    title: "MailMitra - Cold Email Generator",
    description: "Stop sending cold emails that get ignored. Generate personalized emails in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
