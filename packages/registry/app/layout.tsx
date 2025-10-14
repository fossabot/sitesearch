import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SiteSearch Registry | Algolia",
  description:
    "🫆 Opinionated InstantSearch experience for your Site search needs, powered by Algolia's Instant Search and AskAI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL!,
    title: "SiteSearch Registry | Algolia",
    description:
      "🫆 Opinionated InstantSearch experience for your Site search needs, powered by Algolia's Instant Search and AskAI",
    siteName: "SiteSearch Registry | Algolia",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/open-graph.png`,
        width: 1200,
        height: 630,
        alt: "SiteSearch Registry | Algolia",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
