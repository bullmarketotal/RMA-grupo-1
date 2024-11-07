import React from "react";

const LoadingDots = () => {
  return (
    <div className="flex space-x-2 justify-center items-center dark-bg">
      <span className="sr-only">Loading...</span>
      <div className="shadow-md w h-8 w-8 bg-sky-700 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="shadow-md h-8 w-8 bg-sky-800 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="shadow-md h-8 w-8 bg-sky-900 rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingDots;
