/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosretGreen: "#00FF85",
        cosretBlue: "#6197FF",
        "cosretBlue-300": "#F7FAFF",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
