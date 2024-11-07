import React from "react";

const Container = ({ children }) => {
  return (
    <div className="container mx-auto max-w-7xl pb-8 mt-4 px-4 sm:px-6 lg:px-8 dark-bg">
      <div className="drop-shadow-md rounded-lg p-6 normal-bg">{children}</div>
    </div>
  );
};

export default Container;
