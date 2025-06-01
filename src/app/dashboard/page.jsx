export default async function Dashboard({ params }) {
  return (
    <>
      <h1 className="mt-4">Panel Principal</h1>
      <p>Actualizaciones en sistema cotizador</p>

      <div className="card bg-dark mt-2 mb-2">
        <div className="card-header text-success">
          {/* <i className="fas fa-user fa-fw me-1"></i> */}
          Actualizaciones por sugerencias
        </div>
        <div className="card-body">
          <h3 className="text-info">Actualizaciones 1/6/2025</h3> 
          <p>
            1. Se implementan el limpiador de insumos seleccionados al finalizar
            o cerrar la sesión, esto para evitar que cuando se ingrese
            nuevamente aparezca la cotización generada anteriormente.
          </p>

          <p>
            2. Al buscar un insumo y se necesita revisar mas de una pagina, este
            al ser encontrado y seleccionado la paginacion se retornará a la
            primera pagina, evitando que al buscar no se encuentren insumos por
            estar en otra paginación.
          </p>

          <h3 className="text-info">Actualizaciones 20/5/2025</h3>
          <p>
            1. Se implementa agregar la cantidad de insumos en el cotizador
            despues de seleccionar los que se necesitan, calculando el costo de
            ocupar mas del mismo insumo de esta manera mejorando la experiencia
            y costo en la cotizacion sin agregar mas de una vez el mismo.
          </p>

          <p>
            2. Se arreglan errores al momento de generar la cotizacion y los
            datos de costo.
          </p>

          <p>
            3. Se implementa verificar el costo con seguro con y sin impuesto,
            ya que antes aparecia el costo con impuesto. Esta actualizacion se
            realizo tanto en el cotizador como al generar el documento pdf y
            concordando los costo en ambos lados.
          </p>

          <h4 className="text-success">
            Gracias por las sugerencias! Ayudan a mejorar el sitio web y su
            experiencia para nuestro trabajo!
          </h4>
        </div>
      </div>
    </>
  );
}

// !! LINK: https://www.youtube.com/watch?v=hxcB2DNxfbU
// !! TITLE: Vinculación de Tablas Excel a Mongo DB - Import Data CSV a MongoDB
// ** BASE DE DATOS YA IMPORTADA A MONGODB ATLAS

// !! LINK: https://www.youtube.com/watch?v=N_sUsq_y10U
// ** TITLE: Next.js: Authentication (Best Practices for Server Components, Actions, Middleware)

// ** LINK: https://www.youtube.com/watch?v=17TAk6B-O08
// ** TITLE: Next JS 15 Crash Course for Beginners | 15 Create Blog Posts
// ** CONTINUAR SERIE Y AÑADIR DATOS DE CUADERNO PARA EL SITIO WEB
