import "./globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "JJ CONNECTIONS",
  description: "Luxury watch catalog powered by Next.js and Strapi",
  
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
        <html lang="es" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}