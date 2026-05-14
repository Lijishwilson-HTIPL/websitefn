import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hephzibah Technologies",
    template: "Hephzibah Technologies",
  },
  description:
    "Hephzibah Technologies delivers AI staff augmentation, compliance-aware product development, and managed IT services—LIMS, eQMS, and CSA—built for life sciences.",
  keywords: [
    "AI staff augmentation life sciences",
    "LIMS managed services",
    "eQMS implementation",
    "CSA consulting biotech",
    "GxP AI developer",
    "life science AI product development",
    "pharma IT services",
  ],
  authors: [{ name: "Hephzibah Technologies" }],
  creator: "Hephzibah Technologies",
  metadataBase: new URL("https://www.hephzibahtech.in"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.hephzibahtech.in",
    siteName: "Hephzibah Technologies",
    title: "Hephzibah Technologies | AI-Powered Technology Partner for Life Sciences",
    description:
      "AI staff augmentation, compliance-aware product development, and managed IT services for pharma, biotech, and regulated labs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hephzibah Technologies",
    description: "AI-Powered Technology Partner for Life Sciences",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
