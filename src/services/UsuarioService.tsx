import type {Usuario} from "../types/Usuario";

import { URL } from "../api";

const API_URL = `${URL}/usuarios`;

export async function obtenerUsuarios(): Promise<Usuario[]> {
  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los usuarios");
  }

  const productos: Usuario[] = await respuesta.json();

  return productos;
}

export async  function obtenerUsuarioPorNickName(nickName: string): Promise<Usuario> {
  const respuesta = await fetch(`${API_URL}/${nickName}`);

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener el usuario");
  }

  return await respuesta.json();
}

export async function crearUsuario(nickName: string, password: string, email: string): Promise<Usuario> {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      nickName: nickName,
      password: password,
      email: email
    })
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo crear el usuario")
  }

  return await respuesta.json()
}

export async function seguirUsuario( nickFollower: string, nickFollowed: string): Promise<void> {
  const respuesta = await fetch(`${API_URL}/${nickFollower}/seguir`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "nickName": `${nickFollowed}`,
    }),
  });

  // if (!respuesta.ok) {
  //   throw new Error("No se pudo seguir al usuario");
  // }
    if (!respuesta.ok) {
    const error = await respuesta.json();
    console.log(error);
    throw new Error(error.message);
  }

}

export async function dejarDeSeguirUsuario(nickFollower: string, nickFollowed: string): Promise<void> {
  const respuesta = await fetch(
    `${API_URL}/${nickFollower}/dejar-de-seguir`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "nickName": `${nickFollowed}`,
      }),
    }
  );

  if (!respuesta.ok) {
    throw new Error("No se pudo dejar de seguir al usuario");
  }
}