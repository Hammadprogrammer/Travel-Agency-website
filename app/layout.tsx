import type { Metadata } from "next";
import { Lato, Open_Sans } from "next/font/google";
import Navbar from '../shared-component/navbar/header';
import Footer from "../shared-component/footer/footer";
import "./globals.css";

// Open Sans font
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"], // jo weights chahiye wo likh do
});

// Lato font
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"], // optional weights
});

export const metadata: Metadata = {
  title: "Al-Muallim",
  description:
    "Best travel agency offering Umrah, Hajj, and international tour packages. Trusted services, affordable prices & hassle-free travel experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${lato.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
