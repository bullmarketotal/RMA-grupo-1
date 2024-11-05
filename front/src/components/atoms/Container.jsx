import React from "react";

const Container = ({ children }) => {
  return (
    <div className="container mx-auto max-w-7xl pb-8 mt-4 px-4 sm:px-6 lg:px-8 transition-colors duration-300 bg-gray-100 dark:bg-gray-900">
      <div className="drop-shadow-md rounded-lg p-6 transition-colors duration-300 bg-zinc-50 dark:bg-gray-700">
        {children}
      </div>
    </div>
  );
};

export default Container;
