import { useState } from "react";
import { Send } from "lucide-react";
import { crearComentario } from "../services/ComentarioService";
import { useAuth } from "../context/AuthContext";
import type { Comentario } from "../types/Comentario";
import { useAlert } from "../context/AlertContext";

interface ComentarioFormProps {
  postId: string;
  onNuevoComentario?: (comentario: Comentario) => void;
}

export default function ComentarioForm({
  postId,
  onNuevoComentario,
}: ComentarioFormProps) {
  const { usuario } = useAuth();
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);
  const { mostrarAlerta } = useAlert();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!texto.trim() || !usuario) return;

    try {
      setLoading(true);
      const nuevoComentario = await crearComentario({
        text: texto,
        user: usuario.id,
        post: postId,
      });
      setTexto("");
      if (onNuevoComentario) {
        onNuevoComentario(nuevoComentario);
      }
      mostrarAlerta("Comentario enviado", "exito", 1500);
    } catch {
      mostrarAlerta(
        "No se pudo enviar el comentario, intenta de nuevo",
        "error",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribi un comentario..."
        maxLength={300}
        className="flex-1 rounded-lg border px-3 py-2 border-zinc-200 dark:border-gray-800/60 bg-zinc-300/20 dark:bg-gray-900/20 placeholder:text-zinc-400/60 dark:placeholder:text-gray-600/60 outline-none focus:outline-solid focus:outline-2 focus:outline-blue-500/80"
      />
      <button
        type="submit"
        disabled={!texto.trim() || loading}
        className="flex items-center gap-1.5 rounded-lg bg-blue-500 px-4 py-2.5 font-semibold transition disabled:opacity-60 text-white cursor-pointer"
      >
        <Send size={16} />
        <span className="hidden sm:inline font-display">
          {loading ? "Enviando..." : "Enviar"}
        </span>
      </button>
    </form>
  );
}
