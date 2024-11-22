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
import { React } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { DarkModeToggle, NotificationButton } from "./atoms";
import Breadcrumbs from "./BreadCrumb";

const navigationItems = [
  { name: "Inicio", link: "/" },
  { name: "Crear Nodo", link: "/create-sensor" },
  { name: "Nodos", link: "/lista-nodos" },
  { name: "Datos", link: "/datos-view" },
  
];

const menuItems = [
  { name: "Perfil", link: "#" },
  { name: "Configuración", link: "/configuracion" },
  { name: "Cerrar sesión", link: "/confirm-logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const logo = "/logo.png";

export default function NavBar() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Disclosure as="nav" className="bg-neutral-100 dark:bg-neutral-800">
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
                            ? "bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-white"
                            : "text-neutral-800 dark:text-neutral-300 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-white",
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

              <div>
                {isAuthenticated ? (
                  <Menu as="div" className="relative">
                    {/* Menu de usuario */}
                    <MenuButton className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 dark:bg-neutral-800 bg-white text-neutral-800 dark:text-white focus:ring-offset-neutral-800">
                      <span className="absolute -inset-1.5" />
                      <img
                        alt=""
                        src="Imagen de usuario"
                        className="h-8 w-8 rounded-full"
                      />
                    </MenuButton>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-neutral-50 dark:bg-neutral-800"
                    >
                      {menuItems.map((item) => (
                        <MenuItem key={item.name}>
                          <Link
                            to={item.link}
                            className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-700"
                          >
                            {item.name}
                          </Link>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                ) : (
                  <Link
                    to="/login"
                    className="rounded-md px-3 py-2 text-sm font-medium bg-neutral-200 dark:bg-neutral-900 text-neutral-800 hover:text-neutral-50  hover:bg-sky-500 dark:text-neutral-200 dark:hover:bg-neutral-700"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>

            {/* Menu pantallas pequeñas */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="text-neutral-400 hover:bg-neutral-700 dark:text-neutral-900 dark:hover:bg-neutral-200 group relative inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Abrir menú principal</span>
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
                    ? "bg-neutral-200 dark:bg-neutral-900 text-neutral-800 dark:text-white"
                    : "text-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
      <div className="flex h-4 justify-center bg-neutral-100 dark:bg-neutral-800 items-center">
        <Breadcrumbs />
      </div>
      <div className="bg-neutral-200 dark:bg-neutral-900 transition-colors duration-300 overflow-auto h-[calc(100vh-80px)] scrollbar-custom overflow-y-scroll">
        <Outlet />
      </div>
    </>
  );
}
