import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Star } from "lucide-react";
import { tiempoRelativo } from "../utils/tiempoRelativo";
import type { Post } from "../types/Post";
import TagBoton from "./TagBoton";

interface PostCardProps {
  post: Post;
  cantidadComentarios?: number;
  conComentarios?: boolean;
}

export default function PostCard({
  post,
  cantidadComentarios = 0,
  conComentarios = true,
}: PostCardProps) {
  const destacado = cantidadComentarios > 5;

  return (
    <>
      <article
        className={`px-6 py-4 border rounded-lg bg-zinc-200 dark:bg-gray-900 transition-colors ${
          destacado
            ? "border-blue-500"
            : "border-zinc-300 dark:border-gray-800/60"
        }`}
      >
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <div className="flex items-center w-full justify-between gap-2">
            <Link
              to={`/perfil/${post.user.nickName}`}
              className="font-semibold truncate text-blue-500 uppercase hover:text-blue-300 transition font-display"
            >
              @{post.user.nickName}
            </Link>
            {destacado && (
              <h4 className="flex items-center  text-xs font-medium text-blue-500 mb-1 uppercase">
                Post destacado
                <Star size={12} fill="currentColor" className="-mt-0.5" />
              </h4>
            )}
            <span className="text-xs text-zinc-600 dark:text-gray-500">
              hace {tiempoRelativo(post.fechaPublicacion)}
            </span>
          </div>

          <p className="tracking-tight">{post.description}</p>

          {post.images.length > 0 && (
            <div
              className={`grid gap-1 rounded-lg overflow-hidden ${post.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
            >
              {post.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`imagen ${i + 1}`}
                  className="w-full object-cover max-h-72"
                />
              ))}
            </div>
          )}

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <TagBoton key={tag._id} descripcion={`#${tag.description}`} />
              ))}
            </div>
          )}

          {conComentarios && (
            <>
              <div className="border-b border-zinc-600/50 dark:border-gray-500/50 my-2" />
              <div className="flex items-center justify-between">
                <Link
                  to={`/publicacion/${post._id}`}
                  className="flex items-center gap-1 text-zinc-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  <MessageCircle size={16} />
                  <span className="text-sm">
                    {cantidadComentarios === 0
                      ? "Sin comentarios"
                      : `${cantidadComentarios} ${cantidadComentarios === 1 ? "comentario" : "comentarios"}`}
                  </span>
                </Link>

                <Link
                  to={`/publicacion/${post._id}`}
                  className="inline-flex items-center gap-1 text-sm text-zinc-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  Ver más <ArrowRight size={16} />
                </Link>
              </div>
            </>
          )}
        </div>
      </article>
    </>
  );
}
