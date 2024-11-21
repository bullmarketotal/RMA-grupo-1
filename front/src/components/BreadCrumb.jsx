import React from "react";
import { Link } from "react-router-dom";
import { useBreadcrumbs } from "../context/BreadcrumbsContext";

const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <nav className="bg-gray-100 p-2 rounded-md shadow-md">
      <ol className="list-reset flex">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>
            {index > 0 && <span className="mx-2">/</span>}
            <Link to={breadcrumb.path} className="text-blue-500">
              {breadcrumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
