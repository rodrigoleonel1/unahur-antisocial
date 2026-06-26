import { useEffect, useState } from "react";
import type { Usuario } from "../types/Usuario";
import { obtenerUsuarioPorNickName } from "../services/UsuarioService";

export default function UsuarioPerfil({ nickName }: { nickName: string }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        async function cargarUsuario() {
            const usuario = await obtenerUsuarioPorNickName(nickName);
            setUsuario(usuario);
        }

        console.log(usuario)
        cargarUsuario();
        }, []
    );

    if (!usuario) {
        return <p>Cargando...</p>;
}
return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex justify-center">
      <div className="w-full max-w-xl px-4 py-6">

        {/* HEADER PERFIL */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{usuario.nickName}</h1>
          </div>

          <img className="w-18 h-18 rounded-full bg-gray-700" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Imagen de perfil"/>
        </div>

        {/* FOLLOWERS / FOLLOWING */}
        <div className="flex gap-4 mt-4 text-sm text-gray-400">
          <p>
            <span className="text-black dark:text-white font-semibold">
              {usuario.followers.length}
            </span>{" "}
             Seguidores
          </p>
          <p>
            <span className="text-black dark:text-white font-semibold">
              {usuario.following.length}
            </span>{" "}
             Siguiendo
          </p>
        </div>

        {/* BOTÓN FOLLOW */}
        <div className="mt-5">
          <button className="w-full bg-emerald-700 text-white py-2 rounded-full font-semibold hover:bg-emerald-800 transition">
            Seguir
          </button>
        </div>

        {/* SEPARADOR */}
        <div className="border-b border-gray-800 my-6" />

        {/* POSTS (placeholder) */}
        <div className="text-gray-500 text-sm">
          Acá van los posts del usuario...
        </div>
      </div>
    </div>
  );

}