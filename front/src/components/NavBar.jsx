import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { DarkModeToggle, NotificationButton } from "./atoms";

const navigationItems = [
  { name: "Inicio", link: "/" },
  { name: "Crear Nodo", link: "/create-sensor" },
  { name: "Nodos", link: "/list-sensor" },
  { name: "Datos", link: "/datos-view" },
];
const menuItems = [
  { name: "Perfil", link: "#" },
  { name: "Configuración", link: "#" },
  { name: "Sing Out", link: "#" },
  { name: "Test", link: "/testpage" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const logo = "/logo.png";

export default function NavBar() {
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <>
      <Disclosure as="nav" className={"normal-bg"}>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Botones de navegación */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-4 items-center">
                <img alt="Your Company" src={logo} className="h-8 w-auto" />
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.link}
                        className={classNames(
                          location.pathname === item.link
                            ? `${
                                isDarkMode
                                  ? "bg-gray-900 text-white"
                                  : "bg-gray-100 text-gray-800"
                              }`
                            : `${
                                isDarkMode
                                  ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                                  : "text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                              }`,
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Botón modo oscuro/claro */}
              <DarkModeToggle />

              {/* Campana de notificaciones */}
              <NotificationButton />

              {/* Menu de usuario */}
              <Menu as="div" className="relative">
                <div>
                  <MenuButton
                    className={`${
                      isDarkMode
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-800"
                    } relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
                  >
                    <span className="absolute -inset-1.5" />
                    <img
                      alt=""
                      src="Imagen de usuario" //TODO Cargar la imagen desde la base de datos
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className={`${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  } absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in`}
                >
                  {menuItems.map((item) => (
                    <MenuItem key={item.name}>
                      <Link
                        to={item.link}
                        className={`${
                          isDarkMode
                            ? "text-gray-200 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        } block px-4 py-2 text-sm data-[focus]:outline-none`}
                      >
                        {item.name}
                      </Link>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>

            {/* Menu pantallas pequeñas*/}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton
                className={`text-gray-400 hover:bg-gray-700 dark:text-gray-900 dark:hover:bg-gray-200" group relative inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Abrir menu principal</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigationItems.map((item) => (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.link}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  location.pathname === item.link
                    ? `${
                        isDarkMode
                          ? "bg-gray-900 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`
                    : `${
                        isDarkMode
                          ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                          : "text-gray-800 hover:bg-gray-200 hover:text-gray-900"
                      }`,
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
      <div className="dark-bg transition-colors duration-300 overflow-auto h-[calc(100vh-64px)] scrollbar-custom overflow-y-scroll">
        <Outlet />
      </div>
    </>
  );
}
