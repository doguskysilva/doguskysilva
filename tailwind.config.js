const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/**/*.html',
     './src/**/*.js',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      // Build your palette here
      white: colors.white,
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.coolGray,
      red: colors.red,
      lightBlue: colors.lightBlue,
      blue: colors.blue,
      cyan: colors.cyan,
      blueGray: colors.blueGray,
      yellow: colors.amber,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
