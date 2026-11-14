/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          600: '#2563EB',
          700: '#1D4ED8',
        },
        emerald: {
          500: '#10B981',
        },
        slate: {
          50: '#F8FAFC',
          900: '#0F172A',
          500: '#64748B',
        },
        amber: {
          500: '#F59E0B',
        },
        red: {
          500: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
