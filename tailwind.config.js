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
        orange: '#E55934',
        darkGreen: '#1b2623'
      },
      fontFamily: {
        'sans': ['Bebas Neue', ...defaultTheme.fontFamily.sans],
      },
      height: {
        '1/8': '12.5%',
        '7/8': '87.5%'
      },
      animation: {
        slideIn: 'slideIn 250ms ease-in-out',
        slideOut: 'slideOut 250ms ease-in-out',
        slideOpen: 'slideOpen 2ms ease-in-out'
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' }
        },
        slideOpen: {
          '0%': { transform: 'height: 0px' },
          '100%': { transform: 'height: 100%' }
        }
      }
    },
  },
  plugins: [],
}