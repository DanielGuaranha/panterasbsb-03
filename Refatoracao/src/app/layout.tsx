import React from 'react';
import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

// Otimização de Fontes do Next.js (Zero Layout Shift)
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-serif',
  display: 'swap'
});

const lato = Lato({ 
  subsets: ['latin'], 
  weight: ['300', '400', '700'],
  variable: '--font-sans',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    template: '%s | Panteras BSB',
    default: 'Panteras BSB | Acompanhantes de Luxo em Brasília',
  },
  description: 'O diretório mais exclusivo de Brasília. Segurança, discrição e perfis verificados.',
  metadataBase: new URL('https://panterasbsb.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={cn(
        "min-h-screen bg-midnight font-sans antialiased selection:bg-gold-500 selection:text-black",
        playfair.variable,
        lato.variable
      )}>
        {/* Header Component (Server Component) entraria aqui */}
        {children}
        {/* Footer Component entraria aqui */}
      </body>
    </html>
  );
}