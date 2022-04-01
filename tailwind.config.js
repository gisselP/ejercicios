const { fontFamily } = require('tailwindcss/defaultTheme')
/** @type { import('@types/tailwindcss/tailwind-config').TailwindConfig } */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', ...fontFamily.mono],
      poppins: ['Poppins', ...fontFamily.sans],
    },
  },
  plugins: [],
}