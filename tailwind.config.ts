import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#050505',
        obsidian: '#121212',
        gold: {
          100: '#F9F1D8',
          200: '#F0DEAA',
          300: '#E6CB7D',
          400: '#DDB856',
          500: '#D4AF37',
          600: '#AA8C2C',
          700: '#806921',
          800: '#604c0f',
          900: '#3a2e09',
        },
        glass: 'rgba(20, 20, 20, 0.7)',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F9F1D8 50%, #AA8C2C 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.7s ease-out',
        'fade-in-up-mobile': 'fadeInUpMobile 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUpMobile: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
