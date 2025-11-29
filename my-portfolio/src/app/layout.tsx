// src/app/layout.tsx

import type { Metadata } from "next";
// Import the new font and keep the old one
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";

// Configure both fonts
const inter = Inter({ subsets: ["latin"] });
const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  weight: "400", // You can add more weights if needed
});

export const metadata: Metadata = {
  metadataBase: new URL("https://htawsif.vercel.app/"), // REPLACE with your actual Vercel domain
  title: {
    default: "Mohammed Sydul Hasan Tawsif | Computer Science",
    template: "%s | Tawsif's Portfolio", // This adds a suffix to other pages automatically
  },
  description:
    "Portfolio of Mohammed Sydul Hasan Tawsif, a Computer Science graduate specializing in Network Security, NDN, and Distributed Systems.",
  keywords: [
    "Computer Science",
    "Networking",
    "NDN",
    "Research",
    "Simulations",
    "ns-3",
    "SUMO",
    "ndnSIM",
    "Named Data Networking",
    "Blockchain",
  ],
  authors: [{ name: "Mohammed Sydul Hasan Tawsif" }],
  creator: "Mohammed Sydul Hasan Tawsif",
  openGraph: {
    title: "Mohammed Sydul Hasan Tawsif | Academic Portfolio",
    description: "Researcher in Computer Networking and Security.",
    url: "https://htawsif.vercel.app/",
    siteName: "Tawsif Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark light" />
      </head>
      {/* Add the new font class to the body */}
      <body
        className={`${inter.className} ${sourceSerif4.className} bg-background text-foreground transition-colors`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="fixed top-0 left-0 right-0 z-50">
            <Header />
          </div>
          <div className="pt-16">
            <main className="min-h-[calc(100vh-65px)]">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
