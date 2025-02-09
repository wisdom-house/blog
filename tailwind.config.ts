import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      animation: {
        'app-ping': 'app-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-right': 'pulseRight 1.5s ease-in-out infinite',
        'pulse-left': 'pulseLeft 1.5s ease-in-out infinite',
      },

      colors: {
        'app-gray': {
          50: '#f6f6f7',
        },
        primary: {
          DEFAULT: '#ef4136',
        },
        secondary: {
          DEFAULT: '#02498e',
        },
        tertiary: {
          DEFAULT: '#fdb813',
        },

        'app-background': {
          DEFAULT: 'var(--background)',
        },

        'app-foreground': {
          DEFAULT: 'var(--foreground)',
        },

        'app-text': {
          DEFAULT: 'var(--text)',
        },

        'app-black': {
          DEFAULT: '#161618',
          600: '#1b1b1f',
        },

        'app-white': {
          DEFAULT: '#dfdfd6',
        },

        error: 'red',
      },

      fontSize: {
        'a-10': '0.625rem',
        'a-12': '0.75rem',
        'a-14': '0.875rem',
        'a-16': '1rem',
        'a-18': '1.125rem',
        'a-20': '1.25rem',
        'a-24': '1.5rem',
        'a-30': '1.875rem',
        'a-35': '2.1875rem',
        'a-40': '2.5rem',
        'a-50': '3.125rem',
        'a-h1': 'clamp(1.25rem, 7vw, 2rem)',
      },

      keyframes: {
        'app-ping': {
          '0%': {
            transform: 'scale(0.5)',
            opacity: '0.5',
          },
          '75%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(0.5)',
            opacity: '0.5',
          },
        },
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        pulseRight: {
          '0%, 100%': { transform: 'translateX(0)', opacity: '1' },
          '50%': { transform: 'translateX(10px)', opacity: '0.7' },
        },
        pulseLeft: {
          '0%, 100%': { transform: 'translateX(0)', opacity: '1' },
          '50%': { transform: 'translateX(-10px)', opacity: '0.7' },
        },
      },

      screens: {
        xs: '300px',
        lmd: '800px',
        xl: '1300px',
      },

      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;
