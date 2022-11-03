/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:{
        'new-grey': '#E5E5E5',
      }
    },
    fontFamily:{
      poppins:['Poppins']
    }
  },
  plugins: [],
}
