module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {},
      spacing: {},
      fontFamily: {
        sans: ["Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 32s linear infinite",
      },
    },
  },
  darkMode: "class",
  safelist: [
    "bg-red-500",
    "bg-sky-500",
    "bg-green-500",
    "bg-gray-500",
    "bg-yellow-500",
    "border-t-yellow-500",
    "border-t-gray-500",
    "border-t-red-500",
    "border-t-sky-500",
    "border-t-green-500",
    "border-t-organge-500",
    "bg-orange-500",
    "text-orange-500",
  ],
  plugins: [],
};
