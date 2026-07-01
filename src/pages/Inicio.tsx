import { useEffect, useMemo, useState } from "react";
import type { Post } from "../types/Post";
import type { Tag } from "../types/Tag";
import { obtenerComentariosPorPost } from "../services/ComentarioService";
import { obtenerPosts } from "../services/PostService";
import { obtenerTags } from "../services/TagService";
import ComponenteError from "../components/ComponenteError";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import TagBoton from "../components/TagBoton";
import ComponenteAnimado from "../components/ComponenteAnimado";

const POSTS_POR_PAGINA = 4;

export default function Inicio() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [filtro, setFiltro] = useState<string | null>(null);
  const [cantidadComentarios, setCantidadComentarios] = useState<
    Record<string, number>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    async function obtenerData() {
      try {
        const dataPosts = await obtenerPosts();
        setPosts(dataPosts);
        const dataTags = await obtenerTags();
        setTags(dataTags);
        const contadorComentarios: Record<string, number> = {};
        for (const post of dataPosts) {
          const comentarios = await obtenerComentariosPorPost(post._id);
          contadorComentarios[post._id] = comentarios.length;
        }
        setCantidadComentarios(contadorComentarios);
      } catch {
        setError(
          "No se pudo cargar el feed, hubo un problema con la base de datos",
        );
      } finally {
        setLoading(false);
      }
    }
    obtenerData();
  }, []);

  const postsFiltrados = useMemo(() => {
    if (!filtro) {
      return posts;
    } else {
      return posts.filter((p) => p.tags.some((t) => t.description === filtro));
    }
  }, [posts, filtro]); // Se utiliza el useMemo para que los postFiltrados cambien solo cuando cambia el filtro o los posts

  const postsPaginados = postsFiltrados.slice(0, pagina * POSTS_POR_PAGINA);
  const hayMasPosts = postsPaginados.length < postsFiltrados.length;

  if (loading) return <Loader />;

  if (error) return <ComponenteError mensaje={error} />;

  return (
    <section className="max-w-2xl mx-auto p-4 space-y-4">
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-2">
          <TagBoton
            descripcion="todos"
            activo={filtro === null}
            onClick={() => {
              setFiltro(null);
              setPagina(1); // Se resetea la pagina al resetear filtro
            }}
          />
          {tags.map((tag) => (
            <TagBoton
              key={tag._id}
              descripcion={`#${tag.description}`}
              activo={filtro === tag.description}
              onClick={() => {
                setFiltro(filtro === tag.description ? null : tag.description);
                setPagina(1); // Se resetea la pagina al resetear filtro
              }}
            />
          ))}
        </div>
      )}

      {postsFiltrados.length === 0 && filtro ? (
        <h4 className="font-medium rounded-lg border border-dashed py-2 text-center text-red-500">
          No hay publicaciones con el tag #{filtro}.
        </h4>
      ) : (
        postsPaginados.map((post) => (
          <ComponenteAnimado key={post._id}>
            <PostCard
              post={post}
              cantidadComentarios={cantidadComentarios[post._id] ?? 0}
            />
          </ComponenteAnimado>
        ))
      )}

      {hayMasPosts ? (
        <button
          onClick={() => setPagina((p) => p + 1)}
          className="w-full py-2 border border-dashed rounded-lg transition-colors cursor-pointer text-blue-700 bg-blue-500/10  hover:bg-transparent hover:text-blue-500 font-medium"
        >
          Ver más
        </button>
      ) : (
        <h4 className="font-medium rounded-lg border border-dashed py-2 text-center text-zinc-600 dark:text-gray-500">
          No hay más publicaciones.
        </h4>
      )}
    </section>
  );
}
