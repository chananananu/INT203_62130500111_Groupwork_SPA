module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        pk: '#FFD8D8',
        yl: '#FFEEDA',
        bl: '#E5ECFF',
        grs: '#8E8E8E',
        gr: '#9CA3AF',
        pkd: '#FFBBBB',
        pkdd: '#D7A0A0'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
