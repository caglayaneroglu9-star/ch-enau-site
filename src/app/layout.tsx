import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CH Energie & Automation | Industrial Automation Experts",
  description: "Specialized in High-Speed Tobacco & Packaging Machinery Automation, Beckhoff TwinCAT, Siemens TIA Portal, Servo Tuning, and 24/7 Diagnostics globally.",
  keywords: [
    "PLC Programming",
    "Industrial Automation",
    "Tobacco Machinery",
    "Cigarette Packaging Machines",
    "Machine Modernization",
    "TwinCAT Programming",
    "Siemens PLC",
    "Beckhoff Automation",
    "Motion Control Systems",
    "Electrical Troubleshooting",
    "GD Maker Packer",
    "Sasib Packer",
    "Molins repair"
  ].join(", "),
  authors: [{ name: "CH Energie & Automation" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="bg-primary-navy text-white min-h-full flex flex-col font-body">
        <Navbar />
        {/* Floating gradient light background accents */}
        <div className="fixed top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--color-industrial-blue)_0%,_transparent_60%)] opacity-15 pointer-events-none z-0" />
        <main className="flex-grow z-10 pt-20">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
