import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PC Builder",
  description: "Build the PC of your dreams.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body>{children}</body>
    </html>
  );
}
