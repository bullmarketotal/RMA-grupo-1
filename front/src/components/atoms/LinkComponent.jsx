import React from "react";
import { Link } from "react-router-dom";
import { useBreadcrumbs } from "../../context/BreadcrumbsContext";

const LinkComponent = ({ children, to, breadcrumbPath, className }) => {
  const { setBreadcrumbs } = useBreadcrumbs();

  const handleClick = () => {
    setBreadcrumbs(breadcrumbPath);
  };
  return (
    <Link to={to} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};

export default LinkComponent;
