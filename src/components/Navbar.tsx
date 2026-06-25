import {
  House,
  CirclePlus,
  UserRound,
  LogIn,
  UserRoundPlus,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { ThemeBoton } from "./ThemeBoton";
import { useAuth } from "../context/AuthContext";

const linksPublicos = [
  { link: "/", icon: House },
  { link: "/iniciar", icon: LogIn },
  { link: "/registrar", icon: UserRoundPlus },
];

const linksProtegidos = [
  { link: "/", icon: House },
  { link: "/publicar", icon: CirclePlus },
  { link: "/perfil", icon: UserRound },
];

export const estiloLink = (isActive: boolean) =>
  `flex items-center justify-center w-12 h-12 rounded-xl transition-colors ${
    isActive
      ? "bg-zinc-300 dark:bg-gray-800 text-gray-900 dark:text-white"
      : "text-zinc-600 dark:text-gray-500 hover:bg-zinc-200 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white"
  }`;

export default function Navbar() {
  const { usuario } = useAuth();
  const links = usuario ? linksProtegidos : linksPublicos;

  return (
    <>
      {/* Vista pc */}
      <nav className="hidden md:flex flex-col items-center justify-between fixed left-0 top-0 h-screen w-20 py-6 border-r border-zinc-300 dark:border-gray-800 z-50 bg-zinc-100/70 dark:bg-gray-950/50 backdrop-blur-md">
        <ul className="flex flex-col items-center gap-1">
          {links.map(({ link, icon: Icon }) => (
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
        </ul>
        <ThemeBoton />
      </nav>

      {/* Vista mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-zinc-100/70 dark:bg-gray-950/50 backdrop-blur-md z-50 flex items-center justify-around px-6">
        {links.map(({ link, icon: Icon }) => (
          <NavLink
            key={link}
            to={link}
            end={link === "/"}
            className={({ isActive }) => estiloLink(isActive)}
          >
            <Icon size={26} strokeWidth={2} />
          </NavLink>
        ))}
        <ThemeBoton mobile />
      </nav>
    </>
  );
}
