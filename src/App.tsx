import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Inicio from "./pages/Inicio";
import NoEncontrado from "./pages/NoEncontrado";
import CrearPost from "./pages/CrearPost";
import Perfil from "./pages/Perfil";
import DetallePost from "./pages/DetallePost";
import RegistroUsuario from "./pages/RegistroUsuario";
import InicioSesion from "./pages/InicioSesion";
import RutaProtegida from "./components/RutaProtegida";
import AuthProvider from "./context/AuthContext";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { AlertProvider } from "./context/AlertContext";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <AlertProvider>
        <AuthProvider>
          <BrowserRouter>
            <main className="md:ml-20 mb-16 min-h-screen">
              <Header />
              <Navbar />
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/iniciar" element={<InicioSesion />} />
                <Route path="/registrar" element={<RegistroUsuario />} />
                <Route path="/publicacion/:id" element={<DetallePost />} />

                {/* Estas 2 tienen que ser protegidas */}
                <Route element={<RutaProtegida />}>
                  <Route path="/perfil/:nickName" element={<Perfil />} />
                  <Route path="/publicar" element={<CrearPost />} />
                </Route>

                {/* Pagina error */}
                <Route path="*" element={<NoEncontrado />} />
              </Routes>
            </main>
          </BrowserRouter>
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
