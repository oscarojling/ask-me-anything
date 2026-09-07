import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ask-me-anything-red.vercel.app"),
  title: "Ask Oscar Anything",
  description:
    "Ask questions about Oscar Öjling — frontend developer and Futuregames student. Built with Next.js, Drizzle, and Claude.",
  openGraph: {
    title: "Ask Oscar Anything",
    description:
      "Ask questions about Oscar Öjling — frontend developer and Futuregames student.",
    url: "https://ask-me-anything-red.vercel.app",
    siteName: "Ask Oscar Anything",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ask Oscar Anything",
    description:
      "Ask questions about Oscar Öjling — frontend developer and Futuregames student.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
