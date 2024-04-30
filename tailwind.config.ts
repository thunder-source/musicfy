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
        // --accent-a_0 var(--accent-a10)
        // --accent-a_1 var(--accent-a11)
        // --accent-a_2 var(--accent-a12),
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
