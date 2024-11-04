import React, { useState } from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-700">
      {items.map((item, index) => (
        <div key={item.name} className="flex items-center">
          {index > 0 && <span className="mx-2">/</span>}
          {item.link ? (
            <Link
              to={item.link}
              className="text-sm font-medium hover:text-blue-500"
            >
              {item.name}
            </Link>
          ) : (
            <span className="font-medium">{item.name}</span> // Texto sin enlace para el elemento actual
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
