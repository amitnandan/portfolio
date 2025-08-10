import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://your-domain.com"; // replace with your live domain

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
    images: [
      {
        url: "/og.png", // place this in /public
        width: 1200,
        height: 630,
        alt: "Amit Nandan — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amit Nandan — Portfolio",
    description: "Software Engineer — Backend & Full-Stack",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico", // in /public
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
