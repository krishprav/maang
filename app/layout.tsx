import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from './components/Navigation';
import ChatBot from "./components/ChatBot";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "AI Mentor - FAANG Interview & DSA Practice Prep",
  description:
    "Prepare for coding interviews with an AI mentor. Practice DSA problems, DSA sheets, and company-specific DSA questions to excel in FAANG technical interviews.",
  keywords:
    "DSA, DSA practice questions, DSA company wise, DSA sheet, coding interviews, FAANG interview prep, technical interviews, AI mentor",
  openGraph: {
    title: "AI Mentor - FAANG Interview & DSA Practice Prep",
    description:
      "Prepare for coding interviews with an AI mentor. Practice DSA problems, DSA sheets, and company-specific DSA questions to excel in FAANG technical interviews.",
    url: "https://yourwebsite.com", 
    siteName: "AI Mentor",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Mentor Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Mentor - FAANG Interview & DSA Practice Prep",
    description:
      "Prepare for coding interviews with an AI mentor. Practice DSA problems, DSA sheets, and company-specific DSA questions to excel in FAANG technical interviews.",
    site: "@YourTwitterHandle",
    creator: "@YourTwitterHandle",
    images: ["https://yourwebsite.com/twitter-image.jpg"], 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${jetbrainsMono.className} bg-gradient-to-br from-gray-900 to-gray-950 min-h-screen`}
      >
        <Navigation />
        <main className="pt-20 pb-8">{children}</main>
        <ChatBot />
      </body>

    </html>
  );
}
