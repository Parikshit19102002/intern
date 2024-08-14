/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/react-calendar/dist/Calendar.css", // If needed for specific CSS imports
  ],

  theme: {
    extend: {},
    
  },
  plugins: [
    require('daisyui'),
  ],
};
