import React from 'react';
import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const lato = Lato({ 
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Panteras BSB",
    default: "Panteras BSB | Acompanhantes de Luxo em Brasília",
  },
  description: "O diretório mais exclusivo de Brasília. Segurança, discrição e perfis verificados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${playfair.variable} ${lato.variable} font-sans bg-[#050505] text-slate-200 antialiased selection:bg-gold-500 selection:text-black`}>
        {children}
      </body>
    </html>
  );
}