/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1678CB",
        border: "#B4B4B4",
      },
      boxShadow: {
        all: "1px -10px 25px 0px rgba(0,0,0,0.1),-1px 10px 25px 0px rgba(0,0,0,0.1);",
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
};
