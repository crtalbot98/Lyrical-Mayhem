const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/*.tsx',
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      colors: {
        raisinBlack: '#22181C',
        languidLavender: '#E0D3DE',
        yellowCrayola: '#FFE66D',
        blackChocolate: '#1D1B17',
        orangePantone: '#FB6107'
      },
      fontFamily: {
        'sans': ['Bebas Neue', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}