import type { Usuario } from "../types/Usuario";

export default function UsuarioPerfil({nickName,esMiPerfil, yaLoSigo, toggleFollow }: { nickName: Usuario; esMiPerfil: boolean; yaLoSigo: boolean; toggleFollow: () => void;}) {
return (
  <div>
        {/* HEADER PERFIL */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">@{nickName.nickName}</h1>
          </div>

          <img className="w-18 h-18 rounded-full bg-gray-700" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Imagen de perfil"/>
        </div>

        {/* FOLLOWERS / FOLLOWING */}
        <div className="flex gap-4 mt-4 text-sm text-gray-400">
          <p>
            <span className="text-black dark:text-white font-semibold">
              {nickName.followers.length}
            </span>{" "}
             Seguidores
          </p>
          <p>
            <span className="text-black dark:text-white font-semibold">
              {nickName.following.length}
            </span>{" "}
             Siguiendo
          </p>
        </div>

        {/* BOTÓN FOLLOW / Editar perfil */}
        <div className="mt-5">
          {esMiPerfil ? (
            <button className="w-full bg-emerald-700 text-white py-2 rounded-full font-semibold hover:bg-emerald-800 transition">
              Editar perfil
            </button>
          ) : (
            <button
              onClick={toggleFollow}
              className={`w-full py-2 rounded-full font-semibold transition ${
                yaLoSigo
                  ? "bg-gray-700 hover:bg-gray-800 text-white"
                  : "bg-emerald-700 hover:bg-emerald-800 text-white"
              }`}
            >
              {yaLoSigo ? "Dejar de seguir" : "Seguir"}
            </button>
          )}
        </div>

        {/* SEPARADOR */}
        <div className="border-b border-gray-800 my-6" />
    </div>
  );
}