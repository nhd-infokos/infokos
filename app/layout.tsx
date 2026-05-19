import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cari Kos Modern - Carikos",
  description: "Cari kos modern yang tenang, nyaman, dan siap jadi tempat pulang terbaikmu setiap hari.",
  icons: {
    icon: "/img-webp/favicon-nhd.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${poppins.variable} font-sans antialiased bg-white text-black`}
      >
        {children}
      </body>
    </html>
  );
}
