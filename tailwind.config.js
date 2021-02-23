const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    "./pages/**/*.js",
    "./_components/**/*.js",
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      blueGray: colors.blueGray,
      gray: colors.coolGray,
      blue: colors.blue,
      cyan: colors.cyan,
      lightBlue: colors.lightBlue,
      violet: colors.violet,
      indigo: colors.indigo
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
