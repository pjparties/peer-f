/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#F5F3E7",
        homebg: "#C7D7B7",
        secondary: "#214842",
        accent: "#258F67",
        // accentdark: "#EFC368",
        zinc: "#333333",
        accentdark: "#258F90",
        omeglebg: "#9EBCA6",
        user1: "#04027d",
        user2: "#f166ae",
        warning: "#e63946",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}