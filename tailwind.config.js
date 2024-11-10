/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mine: {
          dark: '#005046',
          light: '#e2ffd4',
        },
        theirs: {
          dark: '#363638',
          light: '#ffffff',
        },
      },
    },
  },
  plugins: [],
};
