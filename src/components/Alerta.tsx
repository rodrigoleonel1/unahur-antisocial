import { useEffect } from "react";

interface Props {
  mensaje: string;
  tipo?: "error" | "exito";
  onCerrar: () => void;
  duracion?: number;
}

export default function Alerta({
  mensaje,
  tipo = "error",
  onCerrar,
  duracion = 3000,
}: Props) {
  useEffect(() => {
    const timeout = setTimeout(onCerrar, duracion);
    return () => clearTimeout(timeout);
  }, [onCerrar, duracion]);

  const colores = {
    error: "bg-red-500",
    exito: "bg-green-500",
  };

  return (
    <span
      className={`fixed bottom-5 inset-x-0 mx-auto w-fit md:inset-x-auto md:right-5 md:mx-0 z-50 ${colores[tipo]} animacion-alerta text-white text-sm font-medium p-3 rounded-lg font-display`}
    >
      {mensaje}
    </span>
  );
}
