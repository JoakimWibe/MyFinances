/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          100: '#f1f5f9',
          200: '#e2e8f0',
          800: '#1e293b',
        },
        gray: {
          300: '#d1d5db',
          600: '#4b5563',
        },
        emerald: {
          200: '#a7f3d0',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        red: {
          500: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.375rem',
      }
    }
  },
  plugins: [],
}