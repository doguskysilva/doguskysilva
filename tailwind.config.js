/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
