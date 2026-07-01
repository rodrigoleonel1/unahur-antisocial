import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext"

export default function InicioSesion() {

  const navigate = useNavigate();
  const { iniciar, user } = useAuth();

  const [nickName, setnickName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [nickNameError, setnickNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  if (user) {
    return <Navigate to={`/perfil/${user.nickName}`} replace />;
  }

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

  
  event.preventDefault();

  const nickVacio = nickName.trim() === "";
  const passwordVacia = password.trim() === "";

  setnickNameError(nickVacio);
  setPasswordError(passwordVacia);

  if (nickVacio || passwordVacia) {
    return;
  }

  const loginOk = await iniciar({
    nickName,
    password,
  });

  if (loginOk) {
    setError("");
    navigate("/");

  } else {
    setError("Email o contraseña inválidos");
  }

}


  return <>
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Iniciar sesión</h1>
          <p className="mt-2">
            Ingresa tus credenciales para continuar.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="emailORnickName" className="block mb-2">
              Email o nickName
            </label>
            <input
              id="emailOrNick"
              type="name"
              placeholder={nickNameError ? "Debe ingresar un email o usuario valido" : "nombre de usuario"}
              className={`w-full rounded-md p-2 border transition border-2
              ${nickNameError ?
                  "border-red-300 focus:ring-1 focus:ring-red-300 outline-none" :
                  "border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"}`}
              value={nickName}
              onChange={(e) => {
                setnickName(e.target.value);
                setnickNameError(false);
              }}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder={passwordError ? "Debe ingresar una contraseña" : "********"}
              className={`w-full rounded-md p-2 border transition border-2
              ${passwordError ?
                  "border-red-300 focus:ring-1 focus:ring-red-300 outline-none" :
                  "border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"}`}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordError(false);
              }}
            />
          </div>
          <button
            type="submit"
            className="
            w-full
            mt-2
            py-3
            rounded-md
            bg-gray-800
            text-white
            font-semibold
            transition
            hover:bg-gray-700
            active:bg-bg-gray-300
            active:scale-95"
          >
            Iniciar sesion
          </button>

        </form>
        <div className="mt-4 text-center">
          <p>
            ¿No tienes una cuenta?
          </p>

          <button
            type="submit"
            className="
            w-full
            mt-3
            py-3
            rounded-md
            font-semibold
            active:bg-emerald-800
            active:scale-95
            bg-emerald-700 text-white hover:bg-emerald-800 transition"
            onClick={() => navigate("/registrar")}
          >
            Registrarse
          </button>
        </div>

      </div>
    </div>
  </>;
}

