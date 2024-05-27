/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    './node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', "sans-serif"],
        'source': ['Source Sans 3', "sans-serif"],
      },
      gridTemplateRows: {
        'custom': 'repeat(12, minmax(0, 10rem))', // Her satır için 5rem yükseklik
      }
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}

