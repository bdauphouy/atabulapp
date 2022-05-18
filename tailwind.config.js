const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'black-perl': '#071435',
      'black-rose': '#68052E',
      'white-rock': '#F1EDE2',
      gray: '#8C8C8C',
      alto: '#CECECE',
      scarlet: '#FF3300',
      white: '#FFFFFF',
      black: '#000000',
    },
  },
  plugins: [
    plugin(({ addVariant, e }) => {
      addVariant('label-checked', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          const eClassName = e(`label-checked${separator}${className}`)
          return `input:where([type="checkbox"], [type="radio"]):checked + .${eClassName}`
        })
      })
      addVariant('label-disabled', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          const eClassName = e(`label-disabled${separator}${className}`)
          return `input:where([type="checkbox"], [type="radio"]):disabled + .${eClassName}`
        })
      })
    }),
  ],
}
