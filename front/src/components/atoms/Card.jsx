import React from "react";

const Card = ({ children }) => {
  return (
    <div className="w-full max-w-full overflow-x-auto py-2 normal-bg">
      {children}
    </div>
  );
};

export default Card;
