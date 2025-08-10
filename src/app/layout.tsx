import "./globals.css";

export const metadata = {
  title: "Amit Nandan — Portfolio",
  description: "Software Engineer — Backend & Full-Stack",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-white bg-[#0B0F14]">
        <main>{children}</main>
      </body>
    </html>
  );
}
