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
      </Container>
    </>
  );
}
