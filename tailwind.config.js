/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        btn: 25,
      },
      colors: {
        bgSecondary: '#f7f7f7',
        yellowPrimary: '#ffdeac',
        onYellow: '#333333',
        purplePrimary: '#C8D6FF',
        bgGreen: '#D5FAD2',
        greenPrimary: '#58CB4F',
        bgAqua: '#7FF1F1',
      },
    },
  },
  plugins: [],
}
