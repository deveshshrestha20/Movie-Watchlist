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
    },
  },
  plugins: [],
}
