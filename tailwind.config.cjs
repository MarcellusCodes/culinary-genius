/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { primary: "#98f6bd", secondary: "#3628ca" },
    },
  },
  plugins: [],
};

module.exports = config;
