import React from "react";
import { Link } from "react-router-dom";
import { useBreadcrumbs } from "../context/BreadcrumbsContext";

const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <nav className="h-full flex justify-center items-center">
      <ol className="normal-text text-sm font-medium list-reset flex font-poppins">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="relative">
            {index > 0 && <span className="mx-2">/</span>}
            <Link
              to={breadcrumb.path}
              className={`${
                index === breadcrumbs.length - 1
                  ? "font-bold"
                  : "hover:border-t-2 hover:border-sky-500 "
              } transition duration-300 ease-in-out`}
            >
              {breadcrumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
