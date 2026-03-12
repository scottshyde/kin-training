import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'kin-green': '#006039',
        'kin-gold': '#C5A258',
        'kin-black': '#0D1117',
        'kin-cream': '#F5F0E8',
        'dark-sidebar': '#0D1117',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'heading-1': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'heading-2': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-3': ['1.875rem', { lineHeight: '1.2', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.6' }],
      },
    },
  },
  plugins: [],
};

export default config;
