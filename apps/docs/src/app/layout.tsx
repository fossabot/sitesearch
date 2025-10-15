import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Algolia SiteSearch",
    template: "%s | Algolia SiteSearch",
  },
  description: "Opinionated Search Experiences powered by Algolia",
  openGraph: {
    title: "Algolia SiteSearch",
    description: "Opinionated Search Experiences powered by Algolia",
    images: "/open-graph.png",
    siteName: "Algolia SiteSearch",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Algolia SiteSearch",
    description: "Opinionated Search Experiences powered by Algolia",
    images: "/open-graph.png",
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{
            enabled: false,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
