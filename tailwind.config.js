/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        indigo: {
          950: '#0f0a2e',
          900: '#160d3d',
          800: '#1e1150',
          700: '#2a1872',
          600: '#3b23a8',
          500: '#5436d6',
          400: '#7c5cee',
          300: '#a68df5',
          200: '#cdbffa',
          100: '#ece8fd',
        },
        electric: {
          DEFAULT: '#7c5cee',
          light: '#a68df5',
          glow: 'rgba(124,92,238,0.35)',
        },
        cream: '#f9f7ff',
        muted: '#8b85a8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(124,92,238,0.25)',
        'glow': '0 0 40px rgba(124,92,238,0.35)',
        'glow-lg': '0 0 60px rgba(124,92,238,0.4)',
        'card': '0 4px 32px rgba(0,0,0,0.3)',
        'card-hover': '0 12px 48px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh': 'radial-gradient(at 40% 20%, hsla(260,80%,30%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(280,60%,15%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(250,90%,20%,1) 0px, transparent 50%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-in-right': 'slideInRight 0.4s ease forwards',
        'slide-in-left': 'slideInLeft 0.4s ease forwards',
        'scale-in': 'scaleIn 0.35s ease forwards',
        'shimmer': 'shimmer 1.5s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideInRight: { '0%': { opacity: 0, transform: 'translateX(100%)' }, '100%': { opacity: 1, transform: 'translateX(0)' } },
        slideInLeft: { '0%': { opacity: 0, transform: 'translateX(-100%)' }, '100%': { opacity: 1, transform: 'translateX(0)' } },
        scaleIn: { '0%': { opacity: 0, transform: 'scale(0.92)' }, '100%': { opacity: 1, transform: 'scale(1)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        pulseGlow: { '0%,100%': { boxShadow: '0 0 20px rgba(124,92,238,0.2)' }, '50%': { boxShadow: '0 0 40px rgba(124,92,238,0.5)' } },
      },
    },
  },
  plugins: [],
}
