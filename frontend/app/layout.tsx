import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './main.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeVoyage - AI-Powered Migration Planning",
  description: "Analyze codebases, research best practices, estimate effort, and create migration roadmaps using multi-agent AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}