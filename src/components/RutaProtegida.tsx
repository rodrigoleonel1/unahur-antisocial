import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RutaProtegida() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/iniciar" replace />;
  
  return <Outlet />;
}
