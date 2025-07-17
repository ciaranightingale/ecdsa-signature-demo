/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          900: '#0f1419',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
        },
        'hot-pink': {
          500: '#ec4899',
          400: '#f472b6',
          300: '#f9a8d4',
        },
        'baby-pink': {
          500: '#f8bbd9',
          400: '#fbcfe8',
          300: '#fce7f3',
        },
        'baby-blue': {
          500: '#38bdf8',
          400: '#60a5fa',
          300: '#93c5fd',
        },
      }
    },
  },
  plugins: [],
}