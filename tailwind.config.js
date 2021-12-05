const plugin = require('tailwindcss/plugin')

module.exports = {
  important: true,
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Inter', 'sans-serif'],
    },
    extend: {},
  },
  variants: {
    borderColor: ({ after }) => after(['empty']),
    extend: {
      backgroundColor: ['odd', 'even'],
      padding: ['responsive', 'hover'],
      width: ['responsive', 'hover', 'focus'],
      translate: ['group-hover'],
      display: ['hover', 'group-hover'],
      borderRadius: ['hover', 'group-hover'],
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/aspect-ratio'),
    plugin(function ({ addVariant, e }) {
      addVariant('empty', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`empty${separator}${className}`)}:empty`
        })
      })
    }),
  ],
}
