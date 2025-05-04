import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-flex",
});

export const metadata: Metadata = {
  title: "LoanCred - Fast, Transparent Loans at Your Fingertips",
  description: "Get instant approval on loans with minimal paperwork and competitive interest rates. Apply now and receive funds in 24 hours.",
  keywords: "loans, quick loans, personal finance, instant approval, loan lending, online loans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={robotoFlex.variable}>
      <body className="antialiased min-h-screen bg-white font-sans">
        {children}
      </body>
    </html>
  );
}
