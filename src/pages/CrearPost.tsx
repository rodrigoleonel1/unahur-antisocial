import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";
import { crearTag, obtenerTags } from "../services/TagService";
import { crearPost, asociarImagenAPost } from "../services/PostService";
import type { Tag } from "../types/Tag";
import Loader from "../components/Loader";
import ComponenteError from "../components/ComponenteError";
import ComponenteAnimado from "../components/ComponenteAnimado";
import { Plus, Trash2, Image, Tag as TagIcon } from "lucide-react";
import TagBoton from "../components/TagBoton";

export default function CrearPost() {
  const { user } = useAuth();
  const { mostrarAlerta } = useAlert();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [tagsDisponibles, setTagsDisponibles] = useState<Tag[]>([]);
  const [tagsSeleccionados, setTagsSeleccionados] = useState<string[]>([]);
  const [urlsImagenes, setUrlsImagenes] = useState<string[]>([""]);
  const [nuevaEtiqueta, setNuevaEtiqueta] = useState("");
  const [creandoTag, setCreandoTag] = useState(false);
  const [errorTag, setErrorTag] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorForm, setErrorForm] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    async function cargarEtiquetas() {
      try {
        const dataTags = await obtenerTags();
        setTagsDisponibles(dataTags);
      } catch {
        setError("No se pudieron cargar las etiquetas para la publicación.");
      } finally {
        setLoading(false);
      }
    }
    cargarEtiquetas();
  }, []);

  const manejarCambioUrl = (index: number, valor: string) => {
    const nuevasUrls = [...urlsImagenes];
    nuevasUrls[index] = valor;
    setUrlsImagenes(nuevasUrls);
  };

  const agregarCampoImagen = () => {
    setUrlsImagenes([...urlsImagenes, ""]);
  };

  const eliminarCampoImagen = (index: number) => {
    const nuevasUrls = urlsImagenes.filter((_, i) => i !== index);
    setUrlsImagenes(nuevasUrls.length === 0 ? [""] : nuevasUrls);
  };

  const manejarSeleccionTag = (tagId: string) => {
    setTagsSeleccionados((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  const manejarCrearTag = async () => {
    const nombreLimpio = nuevaEtiqueta.trim();
    setErrorTag(null);

    if (nombreLimpio.length < 2) {
      setErrorTag("La etiqueta debe tener al menos 2 caracteres");
      return;
    }

    if (nombreLimpio.length > 20) {
      setErrorTag("La etiqueta debe tener como máximo 20 caracteres");
      return;
    }

    const yaExiste = tagsDisponibles.some(
      (tag) => tag.description.toLowerCase() === nombreLimpio.toLowerCase(),
    );

    if (yaExiste) {
      setErrorTag("Esa etiqueta ya existe, seleccionala de la lista");
      return;
    }

    try {
      setCreandoTag(true);
      const tagCreado = await crearTag(nombreLimpio);
      setTagsDisponibles((prev) => [...prev, tagCreado]);
      setTagsSeleccionados((prev) => [...prev, tagCreado._id]);
      setNuevaEtiqueta("");
    } catch (err) {
      setErrorTag(
        err instanceof Error ? err.message : "No se pudo crear la etiqueta",
      );
    } finally {
      setCreandoTag(false);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setErrorForm(null);

    const descripcionLimpia = description.trim();

    if (descripcionLimpia === "") {
      setErrorForm("La descripción no puede estar vacía");
      return;
    }

    if (descripcionLimpia.length < 5) {
      setErrorForm("La descripción debe tener al menos 5 caracteres");
      return;
    }

    if (tagsSeleccionados.length === 0) {
      setErrorForm("Debés seleccionar al menos una etiqueta para publicar");
      return;
    }

    if (!user || !user._id) {
      setErrorForm("Debes iniciar sesión para publicar");
      return;
    }

    try {
      setEnviando(true);

      const datosParaElBackend = {
        description: descripcionLimpia,
        user: user._id,
        tags: tagsSeleccionados,
      };

      const nuevoPost = await crearPost(datosParaElBackend);

      const imagenesValidas = urlsImagenes.filter((url) => url.trim() !== "");

      if (imagenesValidas.length > 0 && nuevoPost._id) {
        await asociarImagenAPost(nuevoPost._id, imagenesValidas);
      }

      mostrarAlerta("Publicación creada con éxito", "exito");
      setDescription("");
      setUrlsImagenes([""]);
      setTagsSeleccionados([]);
      navigate("/");
    } catch (err) {
      setErrorForm(
        err instanceof Error ? err.message : "Error al crear la publicación",
      );
    } finally {
      setEnviando(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ComponenteError mensaje={error} />;

  return (
    <section className="max-w-2xl mx-auto p-4 space-y-4">
      <ComponenteAnimado>
        <div className="rounded-lg border p-6 border-zinc-300 dark:border-gray-800/60 bg-zinc-200 dark:bg-gray-900 space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">
              Nueva Publicación
            </h1>
            <p className="text-sm text-zinc-600 dark:text-gray-500">
              Expresate y compartilo en el feed.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Contenido principal del Post */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-gray-300">
                ¿Qué tenés ganas de contar?{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escribí el cuerpo de tu posteo aquí..."
                maxLength={1000}
                rows={4}
                className="w-full rounded-lg border px-3 py-2 border-zinc-200 dark:border-gray-800/60 bg-zinc-300/20 dark:bg-gray-900/20 placeholder:text-zinc-400/60 dark:placeholder:text-gray-600/60 outline-none focus:outline-solid focus:outline-2 focus:outline-blue-500/80 text-sm resize-none"
                required
              />
              {errorForm && <p className="text-sm text-red-500">{errorForm}</p>}
            </div>

            {/* Selector de Etiquetas */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700 dark:text-gray-300">
                <TagIcon size={16} /> Seleccionar Etiquetas{" "}
                <span className="text-red-500 text-xs">
                  (el post debe tener al menos una etiqueta*)
                </span>
              </label>
              <div className="flex flex-wrap gap-2 pt-1">
                {tagsDisponibles.map((tag) => (
                  <TagBoton
                    key={tag._id}
                    descripcion={`#${tag.description}`}
                    activo={tagsSeleccionados.includes(tag._id)}
                    onClick={() => manejarSeleccionTag(tag._id)}
                  />
                ))}
              </div>

              {/* Crear nueva etiqueta */}
              <div className="flex gap-2 items-center pt-1">
                <input
                  type="text"
                  value={nuevaEtiqueta}
                  onChange={(e) => setNuevaEtiqueta(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      manejarCrearTag();
                    }
                  }}
                  placeholder="Crear nueva etiqueta"
                  maxLength={20}
                  className="flex-1 rounded-lg border px-3 py-2 border-zinc-200 dark:border-gray-800/60 bg-zinc-300/20 dark:bg-gray-900/20 placeholder:text-zinc-400/60 dark:placeholder:text-gray-600/60 outline-none focus:outline-solid focus:outline-2 focus:outline-blue-500/80 text-sm"
                />
                <button
                  type="button"
                  onClick={manejarCrearTag}
                  disabled={creandoTag || nuevaEtiqueta.trim() === ""}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-400 transition-colors px-2 py-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={14} /> {creandoTag ? "Creando..." : "Crear"}
                </button>
              </div>
              {errorTag && <p className="text-sm text-red-500">{errorTag}</p>}
            </div>

            {/* Carga de URLs de Imágenes */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700 dark:text-gray-300">
                <Image size={16} /> Links de Imágenes (Opcional)
              </label>
              <div className="space-y-2">
                {urlsImagenes.map((url, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => manejarCambioUrl(index, e.target.value)}
                      placeholder="https://imagen-ejemplo.com/foto.jpg"
                      className="flex-1 rounded-lg border px-3 py-2 border-zinc-200 dark:border-gray-800/60 bg-zinc-300/20 dark:bg-gray-900/20 placeholder:text-zinc-400/60 dark:placeholder:text-gray-600/60 outline-none focus:outline-solid focus:outline-2 focus:outline-blue-500/80 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => eliminarCampoImagen(index)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Eliminar este enlace"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={agregarCampoImagen}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-400 transition-colors pt-1 cursor-pointer"
              >
                <Plus size={14} /> Cargar otra imagen
              </button>
            </div>

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={
                !description.trim() ||
                tagsSeleccionados.length === 0 ||
                enviando
              }
              className="w-full py-2 rounded-lg transition-colors cursor-pointer text-white bg-blue-500 hover:bg-blue-600 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed font-display"
            >
              {enviando ? "Publicando..." : "Crear posteo"}
            </button>
          </form>
        </div>
      </ComponenteAnimado>
    </section>
  );
}
