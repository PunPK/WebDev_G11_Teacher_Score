const withMT = require("@material-tailwind/react/utils/withMT");

const config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/**/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jade: {
          100: "#d3eaeb",
          200: "#a7d5d6",
          300: "#7ac1c2",
          400: "#4eacad",
          500: "#229799",
          600: "#1b797a",
          700: "#145b5c",
          800: "#0e3c3d",
          900: "#071e1f",
        },
        green: {
          100: "#d2f0d6",
          200: "#a5e0ad",
          300: "#77d185",
          400: "#4ac15c",
          500: "#1db233",
          600: "#178e29",
          700: "#116b1f",
          800: "#0c4714",
          900: "#06240a"
        },
      },
    },
  },
  plugins: [],
};

module.exports = withMT(config);
