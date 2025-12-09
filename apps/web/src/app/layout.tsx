import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Synergy Vets | Global Veterinary Careers Platform",
  description:
    "Synergy Vets connects veterinary teams and professionals worldwide with immersive recruitment experiences, staff portals, and global insights.",
  metadataBase: new URL("https://www.synergyvets.com"),
  openGraph: {
    title: "Synergy Vets | Veterinary Careers Reimagined",
    description:
      "Discover global veterinary opportunities, staff announcements, and tailored recruitment solutions in one futuristic experience.",
    url: "https://www.synergyvets.com",
    siteName: "Synergy Vets",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Synergy Vets global network preview",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Synergy Vets | Veterinary Careers Reimagined",
    description:
      "Synergy Vets delivers modern recruitment, staff portals, and candidate experiences for the veterinary world.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} bg-grid antialiased`}
      >
        <Theme appearance="dark" accentColor="cyan" grayColor="gray" panelBackground="translucent">
          <Providers>{children}</Providers>
        </Theme>
      </body>
    </html>
  );
}
