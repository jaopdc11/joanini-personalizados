import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'warm-white': '#FFFBFC',
        cream: '#FFF5F2',
        'pink-mist': '#FBDDE0',
        'pink-dusty': '#F2C5CA',
        'pink-deep': '#D89BA0',
        'pink-candy': '#FF9FB3',
        peach: '#FFD6BA',
        butter: '#FFEFC5',
        sage: '#B8C5B0',
        'sage-deep': '#7E8F73',
        ink: '#5C4C4C',
        'ink-soft': '#8A7575',
        kraft: '#E8D9C2',
        'kraft-light': '#F5EBD9',
        'kraft-deep': '#C9B392',
        'sticky-yellow': '#FFE38A',
        'sticky-pink': '#FFB8C5',
        'sticky-mint': '#C9E5C8',
        'sticky-blue': '#BDD9E8',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Caveat"', 'cursive'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 8px 24px -8px rgba(201,168,168,0.45)' },
          '50%': { transform: 'scale(1.04)', boxShadow: '0 12px 32px -8px rgba(201,168,168,0.65)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'scroll-hint': {
          '0%': { transform: 'translateY(0)', opacity: '0.6' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '0.6' },
        },
        'heart-float': {
          '0%': { transform: 'translateY(0) rotate(-6deg)', opacity: '0' },
          '20%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-120px) rotate(8deg)', opacity: '0' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        'sparkle': {
          '0%, 100%': { transform: 'scale(0.8)', opacity: '0.4' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
        },
        'tape-curl': {
          '0%, 100%': { transform: 'rotate(var(--tw-rotate, 0deg)) translateY(0)' },
          '50%': { transform: 'rotate(var(--tw-rotate, 0deg)) translateY(-2px)' },
        },
        'marker-bob': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
      },
      animation: {
        'pulse-soft': 'pulse-soft 2.6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'scroll-hint': 'scroll-hint 2s ease-in-out infinite',
        'heart-float': 'heart-float 6s ease-in-out infinite',
        'wiggle': 'wiggle 4s ease-in-out infinite',
        'sparkle': 'sparkle 2.4s ease-in-out infinite',
        'tape-curl': 'tape-curl 5s ease-in-out infinite',
        'marker-bob': 'marker-bob 0.6s ease-in-out',
      },
      backgroundImage: {
        'paper-texture': `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.36 0 0 0 0 0.30 0 0 0 0 0.30 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
        'kraft-fiber': `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='k'><feTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.55 0 0 0 0 0.42 0 0 0 0 0.28 0 0 0 0.18 0'/></filter><rect width='100%25' height='100%25' filter='url(%23k)'/></svg>")`,
        'notebook-lines': `repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, rgba(216,155,160,0.18) 31px, rgba(216,155,160,0.18) 32px)`,
      },
      boxShadow: {
        sticky: '6px 8px 14px -8px rgba(92,76,76,0.35), 1px 2px 4px -2px rgba(92,76,76,0.18)',
        page: '0 24px 50px -28px rgba(92,76,76,0.35), 0 6px 14px -10px rgba(92,76,76,0.18)',
      },
    },
  },
  plugins: [],
} satisfies Config
