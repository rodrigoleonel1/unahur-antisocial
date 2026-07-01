import {
  House,
  CirclePlus,
  UserRound,
  LogIn,
  UserRoundPlus,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { ThemeBoton } from "./ThemeBoton";
import { useAuth } from "../context/AuthContext";

export const estiloLink = (isActive: boolean) =>
  `flex items-center justify-center w-12 h-12 rounded-xl transition-colors ${
    isActive
      ? "bg-zinc-300 dark:bg-gray-800 text-gray-900 dark:text-white"
      : "text-zinc-600 dark:text-gray-500 hover:bg-zinc-200 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white"
  }`;

type NavLinkItem = {
  link: string;
  icon: typeof House;
  publico?: boolean;
  protegido?: boolean;
  invitado?: boolean;
};

export default function Navbar() {
  const { isAuthenticated, user, salir } = useAuth();

  const links: NavLinkItem[] = [
    { link: "/", icon: House, publico: true },
    { link: "/publicar", icon: CirclePlus, protegido: true },
    { link: `/perfil/${user?.nickName}`, icon: UserRound, protegido: true },
    { link: "/iniciar", icon: LogIn, invitado: true },
    { link: "/registrar", icon: UserRoundPlus, invitado: true },
  ];

  const linksVisibles = links.filter((l) => {
    if (l.publico) return true;
    if (l.protegido) return isAuthenticated;
    if (l.invitado) return !isAuthenticated;
    return false;
  });

  return (
    <>
      {/* Vista pc */}
      <nav className="hidden md:flex flex-col items-center justify-between fixed left-0 top-0 h-screen w-20 py-6 border-r border-zinc-300 dark:border-gray-800 z-50 bg-zinc-100/70 dark:bg-gray-950/50 backdrop-blur-md ">
        <ul className="flex flex-col items-center gap-1">
          {linksVisibles.map(({ link, icon: Icon }) => (
            <li key={link}>
              <NavLink
                to={link}
                end={link === "/"}
                className={({ isActive }) => estiloLink(isActive)}
              >
                <Icon size={24} strokeWidth={2} />
              </NavLink>
            </li>
          ))}

          {isAuthenticated && (
            <button
              onClick={salir}
              className={`${estiloLink(false)} cursor-pointer`}
            >
              <LogOut className="text-red-800" size={24} strokeWidth={2} />
            </button>
          )}
        </ul>
        <ThemeBoton />
      </nav>

      {/* Vista mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-zinc-100/70 dark:bg-gray-950/50 backdrop-blur-md z-50 flex items-center justify-around px-6">
        {linksVisibles.map(({ link, icon: Icon }) => (
          <NavLink
            key={link}
            to={link}
            end={link === "/"}
            className={({ isActive }) => estiloLink(isActive)}
          >
            <Icon size={26} strokeWidth={2} />
          </NavLink>
        ))}

        {isAuthenticated && (
          <button
            onClick={salir}
            className={`${estiloLink(false)} cursor-pointer`}
          >
            <LogOut size={24} strokeWidth={2} />
          </button>
        )}
        <ThemeBoton mobile />
      </nav>
    </>
  );
}
