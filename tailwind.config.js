/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mine: {
          dark: '#005046',
          light: '',
        },
        theirs: {
          dark: '#363638',
          light: '',
        },
      },
    },
  },
  plugins: [],
};
