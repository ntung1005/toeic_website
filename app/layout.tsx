import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TOEIC Starter",
  description: "Website học TOEIC cho người mới bắt đầu",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "TOEIC Starter",
    statusBarStyle: "default"
  }
};

export const viewport: Viewport = {
  themeColor: "#245b57",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
