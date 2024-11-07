import React from "react";

const Header = ({ title }) => {
  return (
    <div>
      <h1 className="text-4xl text-sky-900 dark:text-sky-100">{title}</h1>
      <div className="my-2 h-px bg-sky-900/30 dark:bg-sky-100/30" />
      
    </div>
  );
};
export default Header;
