const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/*.tsx',
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      colors: {
        black: '#000009',
        gray: '#1F2C28',
        lightGray: '#293834',
        lightGreen: '#317B22',
        lightText: '#DAF7DC',
        orange: '#E55934'
      },
      fontFamily: {
        'sans': ['Bebas Neue', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}