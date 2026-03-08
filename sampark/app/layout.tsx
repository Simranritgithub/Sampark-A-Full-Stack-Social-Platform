import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "./context/Themecontext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sampark",
  description: "Connect • Share • Engage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
     <body
  className={`
    ${geistSans.variable}
    ${geistMono.variable}
    antialiased
    min-h-screen
    bg-gradient-to-br
    from-[#9929EA]
    via-[#9929EA]/30
    to-[#FF5FCF]/30

    dark:from-[#0f0f0f]
    dark:via-[#1a1a1a]
    dark:to-[#000000]
  `}
>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        
      </body>
    </html>
  );
}
