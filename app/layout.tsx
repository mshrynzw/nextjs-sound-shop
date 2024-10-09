import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kaoru Yuki Sound",
  description: "Sound Presets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
