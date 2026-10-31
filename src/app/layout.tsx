import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import { Navbar } from "@/components/navbar";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PC Builder",
  description: "Build the PC of your dreams.",
};

async function NavbarAuth() {
  const session = await auth();
  if (session?.user) return <Navbar authenticated />;
  return <Navbar />;
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", inter.variable, "dark")}
    >
      <body>
        <Suspense fallback={<Navbar />}>
          <NavbarAuth />
        </Suspense>
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
