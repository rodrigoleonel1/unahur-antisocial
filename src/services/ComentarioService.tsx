import type { Comentario } from "../types/Comentario";
import { URL } from "../api";

const API_URL = `${URL}/comentarios`;

export async function obtenerComentarios(): Promise<Comentario[]> {
  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los comentarios");
  }

  const comentarios: Comentario[] = await respuesta.json();

  return comentarios;
}

export async function obtenerComentarioPorId(id: string): Promise<Comentario> {
  const respuesta = await fetch(`${API_URL}/${id}`);

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener el comentario");
  }

  return await respuesta.json();
}

export async function obtenerComentariosPorPost(
  postId: string,
): Promise<Comentario[]> {
  const respuesta = await fetch(`${API_URL}/publicacion/${postId}`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los comentarios del post");
  }

  return await respuesta.json();
}

export async function crearComentario(data: {
  text: string;
  user: string;
  post: string;
}): Promise<Comentario> {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo crear el comentario");
  }

  return await respuesta.json();
}
