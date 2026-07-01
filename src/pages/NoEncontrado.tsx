import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import TagBoton from "../components/TagBoton";

export default function NoEncontrado() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <span className="font-display uppercase font-semibold text-2xl">
          Error
        </span>

        <h1 className="font-display text-8xl font-bold text-zinc-900 dark:text-white leading-none">
          404
        </h1>

        <div className="w-24 h-px bg-zinc-300 dark:bg-gray-700 my-4" />

        <h2 className="font-display text-xl font-semibold mb-2 uppercase">
          Página no encontrada
        </h2>

        <p className="text-sm text-zinc-500 dark:text-gray-500 mb-6 px-6">
          No se encontro la pagina que estabas buscando. Puede que el link esté
          roto o que la publicación ya no exista.
        </p>

        <div className="flex gap-2 mb-8">
          <TagBoton descripcion="#error404" activo={false} />
          <TagBoton descripcion="#no-encontrado" activo={false} />
          <TagBoton descripcion="#no-disponible" activo={false} />
        </div>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 cursor-pointer"
        >
          <Home size={16} />
          <span className="font-display">Volver al inicio</span>
        </button>
      </div>
    </div>
  );
}
