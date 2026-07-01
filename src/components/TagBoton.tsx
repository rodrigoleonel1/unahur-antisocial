interface TagBotonProps {
  descripcion: string;
  activo?: boolean;
  onClick?: () => void;
}

export default function TagBoton({
  descripcion,
  activo = true,
  onClick,
}: TagBotonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-xs font-medium px-1.5 py-0.5 rounded-md border  transition-colors ${
        onClick ? "cursor-pointer" : "cursor-default"
      } ${
        activo
          ? "bg-zinc-900 dark:bg-white text-white dark:text-gray-900 border-zinc-900 dark:border-white"
          : "border-zinc-500 dark:border-gray-700 text-zinc-500 dark:text-gray-500 hover:border-zinc-500 border-dashed"
      }`}
    >
      {descripcion}
    </button>
  );
}
