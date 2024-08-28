/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navbar': "#323031",
        'maincolor': "#151513"
      },
      zIndex: {
        '1':'1',
        '2':'2',
      }
    },
  },
  plugins: [],
}
