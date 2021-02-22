const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    "./pages/**/*.js",
    "./_components/**/*.js",
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
