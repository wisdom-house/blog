import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        'app-gray': {
          50: '#F4F7FC',
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
        'a-h1': 'clamp(1.25rem, 7vw, 3.125rem)',
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

  plugins: [],
} satisfies Config;
