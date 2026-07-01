import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { obtenerComentariosPorPost } from "../services/ComentarioService";
import { obtenerPostPorId } from "../services/PostService";
import type { Post } from "../types/Post";
import type { Comentario } from "../types/Comentario";
import Loader from "../components/Loader";
import ComponenteError from "../components/ComponenteError";
import ComentarioForm from "../components/ComentarioForm";
import DetalleComentario from "../components/DetalleComentario";
import PostCard from "../components/PostCard";

export default function DetallePost() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [noEncontrado, setNoEncontrado] = useState<boolean>(false);

  useEffect(() => {
    async function obtenerData() {
      if (!id) {
        setError("No existe la publicacion");
        setLoading(false);
        return;
      }

      try {
        const dataPost = await obtenerPostPorId(id);
        setPost(dataPost);
        const comentariosPost = await obtenerComentariosPorPost(id);
        setComentarios(comentariosPost);
      } catch (err) {
        if (err instanceof Error && err.message === "NO-EXISTE") {
          setNoEncontrado(true);
        } else {
          setError(
            "No se pudo cargar la publicacion, hubo un problema con la base de datos",
          );
        }
      } finally {
        setLoading(false);
      }
    }
    obtenerData();
  }, [id]);

  if (loading) return <Loader />;

  if (error) return <ComponenteError mensaje={error} />;

  if (noEncontrado) return <Navigate to="/404" replace />;

  if (!post) return <Navigate to="/404" replace />;

  return (
    <section className="mx-auto max-w-2xl p-4 space-y-6">
      {/* Volver */}
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={16} /> Volver al feed
      </Link>

      {/* Post */}
      <PostCard
        key={post._id}
        post={post}
        cantidadComentarios={comentarios.length}
        conComentarios={false}
      />

      {/* Comentarios */}
      <section className="space-y-4">
        <div className=" flex items-center gap-2">
          <MessageCircle size={18} />
          <h2 className="font-display text-lg font-semibold ">
            Comentarios ({comentarios.length})
          </h2>
        </div>

        {/* Crear comentario */}
        {isAuthenticated ? (
          <ComentarioForm
            postId={post._id}
            onNuevoComentario={(nuevoComentario) => {
              setComentarios((comentariosAnteriores) => [
                nuevoComentario,
                ...comentariosAnteriores,
              ]);
            }}
          />
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-200 dark:border-gray-800/60 p-4 text-center text-sm text-zinc-400 dark:text-gray-600 bg-zinc-300/20 dark:bg-gray-900/20">
            <Link to="/iniciar" className="text-blue-500 hover:underline">
              Iniciá sesión
            </Link>{" "}
            para dejar un comentario.
          </div>
        )}

        {/* Lista de comentarios */}
        {comentarios.length === 0 ? (
          <p className=" text-zinc-600 dark:text-gray-500">
            Todavia no hay comentarios, podes ser el primero.
          </p>
        ) : (
          <ul className="space-y-2">
            {comentarios.map((comentario) => (
              <div key={comentario._id} className="animacion-comentario">
                <DetalleComentario comentario={comentario} />
              </div>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
