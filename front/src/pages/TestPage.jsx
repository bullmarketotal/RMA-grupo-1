import { Radio, RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Breadcrumb from "../components/BreadCrumb";
import { Container, Header } from "../components/atoms";
const options = [{ name: "Grafico" }, { name: "Tabla" }];
import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { useTheme } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Example() {
  const breadcrumbItems = [
    { name: "Inicio", link: "/" },
    { name: "Nodos", link: "/list-sensor" },
    { name: "Detalles del Nodo", link: "" }, // Este es el elemento actual sin enlace
  ];

  const [isChecked, setIsChecked] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <>
      <Container>
        <Header title="Test" />
        <Breadcrumb items={breadcrumbItems} />
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          <div className="bg-red-300 p-4">Elemento 1</div>
          <div className="bg-red-300 p-4">Elemento 2</div>

          <div className="row-span-full bg-red-500 p-4">
            Elemento 3 (todas las filas)
          </div>

          <div className="bg-red-300 p-4">Elemento 4</div>
          <div className="bg-red-300 p-4">Elemento 5</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-48">
          <div className="bg-blue-500 p-4 row-span-2">Elemento 1</div>
          <div className="bg-blue-300 p-4">Elemento 2</div>
          <div className="bg-blue-300 p-4">Elemento 3</div>
          <div className="bg-blue-300 p-4">Elemento 4</div>
        </div>

        <div className="grid grid-cols-3 grid-rows-2 gap-4 h-64">
          <div className="bg-red-300 p-4">Elemento 1</div>
          <div className="bg-red-300 p-4">Elemento 2</div>
          <div className="bg-red-500 p-4 row-span-2">
            Elemento 3 (Ocupa 2 filas)
          </div>
          <div className="bg-red-300 p-4">Elemento 4</div>
          <div className="bg-red-300 p-4">Elemento 5</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-64">
          <div className="bg-sky-300 p-4 col-span-2">Elemento 1</div>
          <div className="bg-sky-500 p-4 row-span-2">Elemento 2</div>
          <div className="bg-sky-300 p-4">Elemento 3</div>
          <div className="bg-sky-300 p-4">Elemento 4</div>
        </div>
      </Container>
    </>
  );
}
