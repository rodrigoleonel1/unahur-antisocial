import { Link } from "react-router-dom";
import type { Comentario } from "../types/Comentario";
import { tiempoRelativo } from "../utils/tiempoRelativo";

export default function DetalleComentario({
  comentario,
}: {
  comentario: Comentario;
}) {
  return (
    <li
      key={comentario._id}
      className="rounded-lg border p-4 border-zinc-300 dark:border-gray-800/60 bg-zinc-200 dark:bg-gray-900 space-y-1"
    >
      <div className="flex items-center justify-between">
        <Link
          to={`/perfil/${comentario.user.nickName}`}
          className="font-semibold truncate text-blue-500 uppercase hover:text-blue-300 transition font-display"
        >
          @{comentario.user.nickName}
        </Link>
        <span className="text-xs">
          {tiempoRelativo(comentario.fechaPublicacion)}
        </span>
      </div>
      <p className="text-sm">{comentario.text}</p>
    </li>
  );
}
