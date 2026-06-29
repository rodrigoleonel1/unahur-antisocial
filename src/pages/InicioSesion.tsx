import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function InicioSesion() {

  const navigate = useNavigate();
  const { iniciar, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(""); //errores globales


  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {


    event.preventDefault();

    const emailVacio = email.trim() === "";
    const passwordVacia = password.trim() === "";

    setEmailError(emailVacio);
    setPasswordError(passwordVacia);

    if (emailVacio || passwordVacia) {
      return;
    }

    const loginOk = iniciar({
      email,
      password,
    });

    if (loginOk) {
      setError("");
      navigate("/inicio");
    } else {
      setError("Email o contraseña invalidos");
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/mi-perfil" replace />;
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
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder={emailError ? "Debe ingresar un email valido" : "ejemplo@gmail.com"}
              className={`w-full rounded-md p-2 border transition
              ${emailError ? "border-red-500 placeholder-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
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
              className={`w-full rounded-md p-2 border transition
              ${passwordError ? "border-red-500 placeholder-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"}`}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordError(false);
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full border rounded-md py-2"
          >
            Iniciar sesion
          </button>

        </form>
        <div className="mt-6 text-center">
          <p>
            ¿No tienes una cuenta?
          </p>

          <button
            type="submit"
            className="
            w-full
            py-3
            rounded-md
            bg-blue-600
            text-white
            font-semibold
            transition
            hover:bg-blue-700
            active:bg-blue-800
            active:scale-95"
          >
            Registrarse
          </button>
        </div>

      </div>
    </div>
  </>;
}

