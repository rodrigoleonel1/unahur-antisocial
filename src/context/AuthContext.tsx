import { createContext, useContext, useState } from "react";
import type { AuthContextType, LoginData, Usuario } from "../types/Usuario";
import { obtenerUsuarioPorNickName } from "../services/UsuarioService"


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  async function iniciar(data: LoginData): Promise<boolean> {

    try {

      const usuario = await obtenerUsuarioPorNickName(data.nickName);

      if (
        data.nickName === usuario.nickName &&
        data.password === usuario._id
      ) {
        setUser(usuario);
        localStorage.setItem("user", JSON.stringify(usuario));
        return true;
      }

      return false;
    } catch {
      return false;
    }
  }

  function salir() {
    setUser(null);
    localStorage.removeItem("user");
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    iniciar,
    salir,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }

  return context;
}
