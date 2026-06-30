import type { Post } from "../types/Post";
import { URL } from "../api";

const API_URL = `${URL}/publicaciones`;

export async function obtenerPosts(): Promise<Post[]> {
  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los posts");
  }

  const posts: Post[] = await respuesta.json();

  return posts;
}

export async function obtenerPostPorId(id: string): Promise<Post> {
  const respuesta = await fetch(`${API_URL}/${id}`);

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener el post");
  }

  return await respuesta.json();
}

export async function obtenerPostsDeUsuario(nickName: string): Promise<Post[]> {
  const posts = await obtenerPosts();

  return posts.filter(post => post.user.nickName === nickName);
}

export async function crearPost(postData: { description: string; id: string }): Promise<Post> {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo crear la publicación");
  }

  return await respuesta.json();
}

export async function asociarImagenAPost(id: string, urls: string[]): Promise<Post> {
  const respuesta = await fetch(`${API_URL}/${id}/imagenes`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ urls }), 
  });

  if (!respuesta.ok) {
    throw new Error("No se pudieron asociar las imágenes al posteo.");
  }

  return await respuesta.json();
}