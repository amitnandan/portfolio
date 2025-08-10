import type { Metadata } from "next";
import "./globals.css";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Amit Nandan — Portfolio",
    template: "%s · Amit Nandan",
  },
  description: "Software Engineer — Backend & Full-Stack",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Amit Nandan — Portfolio",
    description: "Software Engineer — Backend & Full-Stack",
    // Use dynamic OG route instead of static /og.png
    images: [`${siteUrl}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amit Nandan — Portfolio",
    description: "Software Engineer — Backend & Full-Stack",
    images: [`${siteUrl}/opengraph-image`],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-white bg-[#0B0F14]">
        <main>{children}</main>
      </body>
    </html>
  );
}
