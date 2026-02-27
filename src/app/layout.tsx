import type { Metadata } from "next";
import { Gabarito, Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const nunito = Nunito ({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "FWD Portal",
  description: "FWD Technologies: Employee Portal System",
  icons: {
    icon: '/assets/icons/favicon.ico',
    apple: '/assets/icons/apple-icon.png',
    shortcut: '/assets/icons/icon.svg'
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${gabarito.variable} ${nunito.variable} antialiased min-h-svh flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
