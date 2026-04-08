/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0d16',
        foreground: '#f2f3f7',
        primary: {
          DEFAULT: '#f0b429',
          foreground: '#0a0d16',
        },
        card: '#171c2b',
        border: '#252b3d',
        muted: '#252b3d',
        'muted-foreground': '#707991',
        gold: {
          light: '#f7d68a',
          DEFAULT: '#f0b429',
          dark: '#a17b11',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
