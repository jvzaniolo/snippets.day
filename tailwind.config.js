const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** {import('tailwindcss').ThemeConfig} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        moon: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#121516',
        },
        primary: colors.orange,
        'light-hover': 'rgba(18, 21, 22, 0.075)',
        'dark-hover': 'rgba(248, 249, 250, 0.1)',
      },
    },
    fontFamily: {
      sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      serif: ['Merriweather', ...defaultTheme.fontFamily.serif],
      mono: ['Source Code Pro', ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [],
};
