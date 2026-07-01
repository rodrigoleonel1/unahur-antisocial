export default function ComponenteError({
  mensaje = "Algo salió mal, intenta de nuevo más tarde",
}: {
  mensaje?: string;
}) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-red-500 px-6 text-center">
      <h4 className="font-medium rounded-lg border border-dashed py-2 px-4">
        {mensaje}
      </h4>
    </div>
  );
}
