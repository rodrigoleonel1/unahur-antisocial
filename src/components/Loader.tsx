import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <Loader2 size={38} className="animate-spin" />
      <h4 className="font-medium">Cargando...</h4>
    </div>
  );
}
