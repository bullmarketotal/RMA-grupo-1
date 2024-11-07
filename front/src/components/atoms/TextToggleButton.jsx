import React from "react";

const TextToggleButton = ({ textLeft, textRight, isToggled, onToggled }) => {
  return (
    <button
      onClick={onToggled}
      className="relative inline-flex items-center h-10 w-40 rounded-lg border-2 border-sky-500 shadow-sm normal-bg"
    >
      <span
        className={`absolute h-10 w-20 bg-sky-500 border-2 border-sky-500 dark:border-gray-500 transition-transform duration-300 transform ${
          isToggled
            ? "translate-x-full rounded-r-lg"
            : "-translate-x-[2px] rounded-l-lg"
        }`}
      />
      <span className="normal-text absolute left-4">{textLeft}</span>
      <span className="normal-text absolute right-4">{textRight}</span>
    </button>
  );
};

export default TextToggleButton;
