/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colosseum: {
          950: '#09090b', // Deep obsidian dark
          900: '#121216',
          850: '#18181f',
          800: '#22222b',
          700: '#32323f',
          600: '#464656',
          500: '#68687c',
          400: '#9b9ba8',
          300: '#c5c5d0',
          200: '#e4e4eb',
          100: '#f4f4f7',
          50: '#ffffff',
        },
        crimson: {
          950: '#2b070f',
          900: '#4c0d1b',
          800: '#881329',
          700: '#be123c',
          600: '#e11d48',
          500: '#f43f5e',
          400: '#fb7185',
          300: '#fda4af',
          200: '#fecdd3',
          100: '#ffe4e6',
        },
        gold: {
          950: '#261802',
          900: '#452a04',
          800: '#7a4b08',
          700: '#b47306',
          600: '#d97706',
          500: '#f59e0b',
          400: '#fbbf24',
          300: '#fcd34d',
          200: '#fef08a',
          100: '#fef9c3',
        },
        bronze: {
          900: '#2a1a14',
          800: '#45261b',
          700: '#693826',
          600: '#944c31',
          500: '#bc6340',
          400: '#d98564',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Barlow Condensed', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'arena': '0 10px 30px -5px rgba(0, 0, 0, 0.7), 0 0 20px 0 rgba(212, 155, 18, 0.1)',
        'arena-glow': '0 0 35px rgba(197, 30, 47, 0.25), 0 0 15px rgba(229, 179, 38, 0.2)',
        'gold-glow': '0 0 25px rgba(229, 179, 38, 0.3)',
      },
      backgroundImage: {
        'radial-vignette': 'radial-gradient(circle at center, transparent 0%, rgba(8, 5, 4, 0.85) 100%)',
      }
    },
  },
  plugins: [],
}
