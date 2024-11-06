// tailwind.config.js
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {},
      spacing: {
        //128: "32rem",
      },
      fontFamily: {
        sans: ["Helvetica Neue", "Arial", "sans-serif"],
      },
      animation: {
        'spin-slow': 'spin 32s linear infinite', 
      }
    },
  },
  darkMode: "class",
  plugins: [],
};
