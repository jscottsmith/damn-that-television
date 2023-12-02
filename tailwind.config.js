const defaultTheme = require('tailwindcss/defaultTheme');

const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '');
const em = (px, base) => `${round(px / base)}em`;
const rem = (px) => `${round(px / 16)}rem`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './routes/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './slices/**/*.{js,ts,jsx,tsx}',
    './helpers/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      // Prose -- see base styles here:
      // https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              textDecoration: 'none',
            },
            // lineHeight: round(24 / 16),
            h1: {
              fontFamily: theme('fontFamily.futura'),
              fontWeight: 700,
            },
            h2: {
              fontFamily: theme('fontFamily.futura'),
              fontWeight: 700,
            },
            h3: {
              fontFamily: theme('fontFamily.futura'),
              fontWeight: 400,
            },
            blockquote: {
              fontSize: em(24, 16),
              fontFamily: theme('fontFamily.futura'),
              fontWeight: 300,
              fontStyle: 'normal',
            },
            li: {
              margin: em(4, 16),
            },
          },
        },

        slate: {
          css: {
            '--tw-prose-links': theme('colors.miami-old'),
            '--tw-prose-invert-links': theme('colors.miami-old'),
            '--tw-prose-body': theme('colors.slate.600'),
            '--tw-prose-invert-body': theme('colors.slate.400'),
            '--tw-prose-headings': theme('colors.slate.700'),
            '--tw-prose-invert-headings': theme('colors.slate.300'),
            // '--tw-prose-lead': theme('colors.slate.500'),
            // '--tw-prose-invert-lead': theme('colors.slate.900'),
            '--tw-prose-code': theme('colors.slate.700'),
            '--tw-prose-invert-code': theme('colors.slate.300'),
            '--tw-prose-bold': theme('colors.slate.700'),
            '--tw-prose-invert-bold': theme('colors.slate.300'),
            // '--tw-prose-counters': colors.slate[500],
            // '--tw-prose-bullets': colors.slate[300],
            // '--tw-prose-hr': colors.slate[200],
            // '--tw-prose-quotes': colors.slate[900],
            // '--tw-prose-quote-borders': colors.slate[200],
            // '--tw-prose-captions': colors.slate[500],
            // '--tw-prose-kbd': colors.slate[900],
            // '--tw-prose-kbd-shadows': hexToRgb(colors.slate[900]),
            // '--tw-prose-code': colors.slate[900],
            // '--tw-prose-pre-code': colors.slate[200],
            // '--tw-prose-pre-bg': colors.slate[800],
            // '--tw-prose-th-borders': colors.slate[300],
            // '--tw-prose-td-borders': colors.slate[200],
            // '--tw-prose-invert-body': colors.slate[300],
            // '--tw-prose-invert-headings': colors.white,
            // '--tw-prose-invert-lead': colors.slate[400],
            // '--tw-prose-invert-links': colors.white,
            // '--tw-prose-invert-bold': colors.white,
            // '--tw-prose-invert-counters': colors.slate[400],
            // '--tw-prose-invert-bullets': colors.slate[600],
            // '--tw-prose-invert-hr': colors.slate[700],
            // '--tw-prose-invert-quotes': colors.slate[100],
            // '--tw-prose-invert-quote-borders': colors.slate[700],
            // '--tw-prose-invert-captions': colors.slate[400],
            // '--tw-prose-invert-kbd': colors.white,
            // '--tw-prose-invert-kbd-shadows': hexToRgb(colors.white),
            // '--tw-prose-invert-code': colors.white,
            // '--tw-prose-invert-pre-code': colors.slate[300],
            // '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            // '--tw-prose-invert-th-borders': colors.slate[600],
            // '--tw-prose-invert-td-borders': colors.slate[700],
          },
        },
      }),

      animation: {
        'spin-slow': 'spin 40s linear infinite',
      },
      fontFamily: {
        futura: 'futura-pt, sans-serif',
        poppins: 'poppins, sans-serif',
      },
      boxShadow: {
        'hard-xs': '0.125rem 0.125rem 0 0 var(--tw-shadow-color)',
        'hard-sm': '0.25rem 0.25rem 0 0 var(--tw-shadow-color)',
        hard: '0.5rem 0.5rem 0 0 var(--tw-shadow-color)',
      },
      spacing: {
        '2xs': '0.125rem',
        xs: '0.25rem',
        sm: '0.5rem',
        base: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem',
        '5xl': '8rem',
        '6xl': '10rem',
        '7xl': '12rem',
        '8xl': '14rem',
        '10xl': '16rem',
        '11xl': '18rem',
        '12xl': '20rem',
      },
      colors: {
        softy: '#f5b8b5',
        'miami-old': '#4eb1b6',
        deep: '#2c2f34',

        night: '#635e7f',
        teal: '#32aba8',
        peach: '#f6d0d0',

        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD3E1',
          400: '#9BA5B8',
          500: '#656E83',
          DEFAULT: '#656E83',
          600: '#3A4155',
          700: '#232839',
          800: '#141826',
          900: '#0C0E19',
          950: '#060710',
        },

        salmon: {
          50: '#fdf9f9',
          100: '#faf3f3',
          200: '#f3e0e0',
          300: '#ebcdce',
          400: '#dda8a9',
          500: '#ce8284',
          DEFAULT: '#ce8284',
          600: '#b97577',
          700: '#9b6263',
          800: '#7c4e4f',
          900: '#654041',
        },
        plum: {
          50: '#f5f5f6',
          100: '#ecebed',
          200: '#cfced3',
          300: '#b3b1b9',
          400: '#797684',
          500: '#403b4f',
          DEFAULT: '#403b4f',
          600: '#3a3547',
          700: '#302c3b',
          800: '#26232f',
          900: '#1f1d27',
        },
        pepto: {
          50: '#fefafc',
          100: '#fdf4f8',
          200: '#fae4ee',
          300: '#f7d4e3',
          400: '#f0b4cf',
          500: '#ea94ba',
          DEFAULT: '#ea94ba',
          600: '#d385a7',
          700: '#b06f8c',
          800: '#8c5970',
          900: '#73495b',
        },
        lunar: {
          50: '#f7f7f9',
          100: '#f0eff3',
          200: '#d9d6e1',
          300: '#c2bdce',
          400: '#948caa',
          500: '#665b85',
          DEFAULT: '#665b85',
          600: '#5c5278',
          700: '#4d4464',
          800: '#3d3750',
          900: '#322d41',
        },
        lit: {
          50: '#fff8f6',
          100: '#fff1ed',
          200: '#ffdcd2',
          300: '#ffc6b7',
          400: '#ff9c82',
          500: '#ff714c',
          DEFAULT: '#ff714c',
          600: '#e66644',
          700: '#bf5539',
          800: '#99442e',
          900: '#7d3725',
        },
        miami: {
          50: '#f8fdfd',
          100: '#f1fbfc',
          200: '#dcf6f7',
          300: '#c7f1f2',
          400: '#9ce6e8',
          500: '#72dbde',
          DEFAULT: '#72dbde',
          600: '#67c5c8',
          700: '#56a4a7',
          800: '#448385',
          900: '#386b6d',
        },
        club: {
          50: '#f7f8ff',
          100: '#f0f1ff',
          200: '#d9dcff',
          300: '#c1c7ff',
          400: '#939eff',
          500: '#6574ff',
          DEFAULT: '#6574ff',
          600: '#5b68e6',
          700: '#4c57bf',
          800: '#3d4699',
          900: '#31397d',
        },
        lavender: {
          50: '#f9faff',
          100: '#f4f5ff',
          200: '#e3e5fe',
          300: '#d1d6fe',
          400: '#afb7fd',
          500: '#8d98fc',
          DEFAULT: '#8d98fc',
          600: '#7f89e3',
          700: '#6a72bd',
          800: '#555b97',
          900: '#454a7b',
        },
        cream: {
          50: '#fffefb',
          100: '#fefdf7',
          200: '#fdf9ec',
          300: '#fcf5e1',
          400: '#f9eeca',
          500: '#f7e7b3',
          DEFAULT: '#f7e7b3',
          600: '#ded0a1',
          700: '#b9ad86',
          800: '#948b6b',
          900: '#797158',
        },
        fab: {
          50: '#fffff8',
          100: '#fffff1',
          200: '#fffedc',
          300: '#fffdc7',
          400: '#fffc9e',
          500: '#fffb74',
          DEFAULT: '#fffb74',
          600: '#e6e268',
          700: '#bfbc57',
          800: '#999746',
          900: '#7d7b39',
        },
        ghost: {
          50: '#fbfcfc',
          100: '#f7f8f9',
          200: '#eceeef',
          DEFAULT: '#edf8ff',
          300: '#e0e3e5',
          400: '#c9cfd2',
          500: '#b2babf',
          600: '#a0a7ac',
          700: '#868c8f',
          800: '#6b7073',
          900: '#575b5e',
        },
        'soft-pink': {
          50: '#fffbfb',
          100: '#fef8f8',
          200: '#fdeded',
          300: '#fbe3e1',
          400: '#f8cdcb',
          500: '#f5b8b5',
          600: '#dda6a3',
          700: '#b88a88',
          800: '#936e6d',
          900: '#785a59',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
