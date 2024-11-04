import React from "react";

const Card = ({ children }) => {
  return (
    <div className="w-full max-w-full overflow-x-auto py-2 transition-colors duration-300 bg-zinc-50 dark:bg-gray-700">
      {children}
    </div>
  );
};

export default Card;
