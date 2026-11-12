import type { Metadata } from "next";
import {
  Italiana,
  Manrope,
  Playfair_Display,
  Source_Sans_3,
} from "next/font/google";
import "./globals.css";
import Header from "./Components/Header";
import { Suspense } from "react";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: "400",
});

const sourceSansPro = Source_Sans_3({
  variable: "--font-source-sans-pro",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: { default: "Holidaze", template: "%s | Holidaze" },
  description: "Find and book unique venues for your next holiday.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfairDisplay.variable} ${italiana.variable} ${sourceSansPro.variable} h-full antialiased`}
    >
      <body className="bg-background flex min-h-full flex-col dark:bg-black">
        <Suspense fallback={<div className="h-18" />}>
          <Header />
        </Suspense>
        <hr className="border-border-control dark:border-white" />
        {children}
      </body>
    </html>
  );
}
