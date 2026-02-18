/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gylvvncapsrtcvqhsowc.supabase.co', // Seu projeto Supabase
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Apenas para mocks iniciais
      },
    ],
    // Evita custos excessivos de otimização na Vercel delegando para o Supabase/CDN quando possível
    unoptimized: false, 
  },
  // Segurança: Remove cabeçalho que expõe a tecnologia
  poweredByHeader: false, 
};

export default nextConfig;