import type { Metadata } from "next";
import { Cormorant_Garamond, Lora, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const fontHeading = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const fontBody = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const fontDevanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.murtiwallah.com"),
  alternates: { canonical: "/" },
  title: {
    default: "Murtiwallah — Handcrafted Idols & Temple Décor, Wholesale & Retail",
    template: "%s | Murtiwallah",
  },
  description:
    "India's largest wholesale destination for premium handcrafted idols and spiritual décor — from home temples to hotel lobbies to Pan-India dealer shelves.",
  openGraph: {
    type: "website",
    siteName: "Murtiwallah",
    title: "Murtiwallah — Handcrafted Idols & Temple Décor",
    description:
      "India's largest wholesale destination for premium handcrafted idols and spiritual décor.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Murtiwallah — Handcrafted Idols & Temple Décor",
    description:
      "India's largest wholesale destination for premium handcrafted idols and spiritual décor.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontHeading.variable} ${fontBody.variable} ${fontDevanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
