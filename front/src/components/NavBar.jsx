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
import { React, useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { DarkModeToggle, NotificationButton } from "./atoms";
import Breadcrumbs from "./BreadCrumb";
import { FaUser } from "react-icons/fa";
import NotificacionList from "./molecules/NotificationList";
import { useNotifications } from "../hooks/useNotifications";
import { useAxios } from "../context/AxiosProvider";
import { useIsTabActive } from "../hooks/useIsTabActive";

const baseURL = import.meta.env.VITE_API_URL;

const navigationItems = [
  { name: "Inicio", link: "/" },
  { name: "Cuencas", link: "/lista-cuencas"},
  { name: "Crear Cuenca", link: "/create-cuenca" },
  { name: "Datos", link: "/datos-view" },


  
];

const menuItems = [
  // { name: "Perfil", link: "#" },
  { name: "Administrador", link: "/administrador" },
  { name: "Configuración", link: "/configuracion" },
  { name: "Cerrar sesión", link: "/confirm-logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const logo = "/logo.png";

export default function NavBar() {
  const location = useLocation();
  const [reloadNotifications, setReloadNotifications] = useState(0); // Estado para controlar recarga
  
  const { notificaciones, loadingNotifications, unreadPresent } = useNotifications({
    count_limit: 5,
    shouldReload: reloadNotifications,  // Pasar la dependencia para recargar
  });
  const isTabActive = useIsTabActive()

  const { isAuthenticated, username, loading, permisos } = useAuth();
  const [showNotis, setShowNotis] = useState(false);

  const axios = useAxios();

  const markNotificationsAsRead = (notis) => {
    const notReadNotis = notis.filter((n) => !n.is_read);
    if (notReadNotis.length > 0)
      axios.put(baseURL + "/markasread", notReadNotis);
  };

  const toggleNotifications = () => {
    setShowNotis(!showNotis)
    markNotificationsAsRead(notificaciones)
  }

  useEffect(() => {
    // Configurar el intervalo solo si la pestaña está activa
    if (isTabActive) {
      const interval = setInterval(() => {
        setReloadNotifications((prev) => prev + 1);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isTabActive]); 

  
  
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
              <NotificationButton onClick={toggleNotifications} newNotifications={unreadPresent} reload={reloadNotifications}/>
              <NotificacionList showNotis={showNotis} notificaciones={notificaciones} loading={loadingNotifications}/>

              <div>
                {isAuthenticated ? (
                  <Menu as="div" className="relative">
                    {/* Menu de usuario */}
                    <MenuButton className="dark-bg relative flex rounded-md px-3 py-2 text-sm font-medium text-neutral-800 dark:text-white">
                      <span className="absolute -inset-1.5" /> {username}
                      <FaUser className="size-6 p-1" />
                    </MenuButton>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg normal-bg"
                    >
                      {menuItems.map(
                        (item) =>
                          (item.name !== "Administrador" || permisos.admin) && (
                            <MenuItem key={item.name}>
                              <Link
                                to={item.link}
                                className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-700"
                              >
                                {item.name}
                              </Link>
                            </MenuItem>
                          )
                      )}
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
      <div className="bg-neutral-200 dark:bg-neutral-800">
        {/* <div className="mx-auto max-w-7xl flex items-center shadow-md">
          <Breadcrumbs />
        </div> */}
      </div>
      <div className="bg-neutral-200 dark:bg-neutral-900 transition-colors duration-300 overflow-auto h-[calc(100vh-64px)] scrollbar-custom overflow-y-scroll">
        <Outlet />
      </div>
    </>
  );
}
