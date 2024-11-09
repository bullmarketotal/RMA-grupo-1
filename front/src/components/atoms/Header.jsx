import React from "react";

const Header = ({ title }) => {
  return (
    <div>
      <h1 className="pb-4 text-3xl text-sky-800 dark:text-sky-100">{title}</h1>
    </div>
  );
};
export default Header;
