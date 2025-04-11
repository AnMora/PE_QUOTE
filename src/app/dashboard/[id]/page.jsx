export default function DashboardUser({ params }) {

  
  const parametros = params;
  console.log(parametros);
  

  return (
    <>
      <h1 className="mt-4">Dashboard Usuario</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">
          Informacion general: acerca de panel de usuario
        </li>
      </ol>
    </>
  );
}
