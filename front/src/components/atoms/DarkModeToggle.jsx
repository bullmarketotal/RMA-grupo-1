import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={
        "shadow-lg sm:mr-2 relative inline-flex items-center justify-between h-8 w-16 rounded-full transition-colors duration-300 bg-gray-300 dark:bg-gray-400"
      }
    >
      <FaSun
        className={`absolute right-2 w-4 h-4 text-yellow-500 transition-opacity duration-300 ${
          isDarkMode ? "opacity-0" : "opacity-100"
        }`}
      />
      <FaMoon
        className={`absolute left-2 w-4 h-4 text-gray-700 transition-opacity duration-300 ${
          isDarkMode ? "opacity-100" : "opacity-0"
        }`}
      />
      <span
        className={
          "absolute w-8 h-8 rounded-full border-solid border-1 border-gray-300 dark:border-gray-500 shadow-md transition-transform duration-300 transform translate-x-0 bg-gray-50 dark:translate-x-8 dark:bg-gray-900"
        }
      />
    </button>
  );
};

export default DarkModeToggle;
