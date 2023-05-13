/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'green-dark': '#015F43',
        'green': '#00875F',
        'green-light':'#00B37E',
        'red-dark':'#AA2834',
        'red':'#F75A68',
        'gray1': '#121214',
        'gray2': '#202024',
        'gray3': '#29292E',
        'gray4': '#323238',
        'gray5': '#7C7C8A',
        'gray6': '#C4C4CC',
        'gray7': '#E5E5E5',
        'gray8': '#E1E1E6',
        'white': '#FFFFFF',
      },
      fontFamily: {
        primary: ['Roboto', 'sans-serif']
      },
      fontSize: {
        sm: '0.875rem',
        base: '1rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '2rem'
      },
      lineHeight: {
        base: '160%'
      }
    },
  },
  plugins: [],
}
