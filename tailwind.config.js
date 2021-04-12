module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        pk: '#FFD8D8',
        yl: '#FFEEDA',
        bl: '#E5ECFF',
        pkd: '#FFBBBB',
        gr: '#9CA3AF'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
