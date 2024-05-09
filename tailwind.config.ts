import { accentColors } from '@radix-ui/themes/props';

const plugin = require('tailwindcss/plugin');
const { blackA, mauve, violet, indigo, purple } = require('@radix-ui/colors');

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        ...blackA,
        ...mauve,
        ...violet,
        ...purple,
        ...indigo,
        // ...accentColors,
        accent_1: 'var(--accent-1)',
        accent_2: 'var(--accent-2)',
        accent_3: 'var(--accent-3)',
        accent_4: 'var(--accent-4)',
        accent_5: 'var(--accent-5)',
        accent_6: 'var(--accent-6)',
        accent_7: 'var(--accent-7)',
        accent_8: 'var(--accent-8)',
        accent_9: 'var(--accent-9)',
        accent_10: 'var(--accent-10)',
        accent_11: 'var(--accent-11)',
        accent_12: 'var(--accent-12)',
        accent_a1: 'var(--accent-a1)',
        accent_a2: 'var(--accent-a2)',
        accent_a3: 'var(--accent-a3)',
        accent_a4: 'var(--accent-a4)',
        accent_a5: 'var(--accent-a5)',
        accent_a6: 'var(--accent-a6)',
        accent_a7: 'var(--accent-a7)',
        accent_a8: 'var(--accent-a8)',
        accent_a9: 'var(--accent-a9)',
        accent_a10: 'var(--accent-a10)',
        accent_a11: 'var(--accent-a11)',
        accent_a12: 'var(--accent-a12)',
        accent_contrast: 'var(--accent-contrast)',
        accent_surface: 'var(--accent-surface)',
        accent_indicator: 'var(--accent-indicator)',
        accent_track: 'var(--accent-track)',
        gray_1: 'var(--gray-1)',
        gray_2: 'var(--gray-2)',
        gray_3: 'var(--gray-3)',
        gray_4: 'var(--gray-4)',
        gray_5: 'var(--gray-5)',
        gray_6: 'var(--gray-6)',
        gray_7: 'var(--gray-7)',
        gray_8: 'var(--gray-8)',
        gray_9: 'var(--gray-9)',
        gray_10: 'var(--gray-10)',
        gray_11: 'var(--gray-11)',
        gray_12: 'var(--gray-12)',
        gray_a1: 'var(--gray-a1)',
        gray_a2: 'var(--gray-a2)',
        gray_a3: 'var(--gray-a3)',
        gray_a4: 'var(--gray-a4)',
        gray_a5: 'var(--gray-a5)',
        gray_a6: 'var(--gray-a6)',
        gray_a7: 'var(--gray-a7)',
        gray_a8: 'var(--gray-a8)',
        gray_a9: 'var(--gray-a9)',
        gray_a10: 'var(--gray-a10)',
        gray_a11: 'var(--gray-a11)',
        gray_a12: 'var(--gray-a12)',
        gray_contrast: 'var(--gray-contrast)',
        gray_surface: 'var(--gray-surface)',
        gray_indicator: 'var(--gray-indicator)',
        gray_track: 'var(--gray_tra-track)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
      },
      keyframes: {
        enterFromRight: {
          from: { opacity: '0', transform: 'translateX(200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        enterFromLeft: {
          from: { opacity: '0', transform: 'translateX(-200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        exitToRight: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(200px)' },
        },
        exitToLeft: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(-200px)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'rotateX(-10deg) scale(0.9)' },
          to: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
        },
        scaleOut: {
          from: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
          to: { opacity: '0', transform: 'rotateX(-10deg) scale(0.95)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
      },
      animation: {
        scaleIn: 'scaleIn 200ms ease',
        scaleOut: 'scaleOut 200ms ease',
        fadeIn: 'fadeIn 200ms ease',
        fadeOut: 'fadeOut 200ms ease',
        enterFromLeft: 'enterFromLeft 250ms ease',
        enterFromRight: 'enterFromRight 250ms ease',
        exitToLeft: 'exitToLeft 250ms ease',
        exitToRight: 'exitToRight 250ms ease',
      },
      borderRadius: {
        radius_1: 'calc(3px * var(--scaling) * var(--radius-factor))',
        radius_2: 'calc(4px * var(--scaling) * var(--radius-factor))',
        radius_3: 'calc(6px * var(--scaling) * var(--radius-factor))',
        radius_4: 'calc(8px * var(--scaling) * var(--radius-factor))',
        radius_5: 'calc(12px * var(--scaling) * var(--radius-factor))',
        radius_6: 'calc(16px * var(--scaling) * var(--radius-factor))',
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: (value) => ({
          perspective: value,
        }),
      });
    }),
  ],
};
