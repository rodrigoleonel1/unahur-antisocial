import { createContext, useContext, useState } from "react";
import Alerta from "../components/Alerta";

interface AlertContextType {
  mostrarAlerta: (
    mensaje: string,
    tipo: "error" | "exito",
    duracion?: number,
  ) => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerta, setAlerta] = useState<{
    mensaje: string;
    tipo: "error" | "exito";
    duracion?: number;
  } | null>(null);

  function mostrarAlerta(
    mensaje: string,
    tipo: "error" | "exito" = "error",
    duracion = 3000,
  ) {
    setAlerta({ mensaje, tipo, duracion });
  }

  return (
    <AlertContext.Provider value={{ mostrarAlerta }}>
      {children}
      {alerta && (
        <Alerta
          mensaje={alerta.mensaje}
          tipo={alerta.tipo}
          duracion={alerta.duracion}
          onCerrar={() => setAlerta(null)}
        />
      )}
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert debe usarse dentro de AlertContext");
  return context;
};
