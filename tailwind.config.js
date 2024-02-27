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
      },
    },
  },
  plugins: [],
}
