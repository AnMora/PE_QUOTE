import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function DashboardAdmin({ params }) {
  const { id } = await params;
  const adminCollection = await getCollection("admin");
  const admin =
    id.length === 24
      ? await adminCollection?.findOne({
          _id: ObjectId.createFromHexString(id),
        })
      : null;

  return (
    <>
      {/* HACER UN COMPONENTE DE ACTUALIZACIONES PARA TODOS LOS USUARIOS - SOLO SE LLAMA EL COMPONENTE */}
      <h1 className="mt-4">
        Panel Admin {admin.firstName} {admin.lastName}
      </h1>
      <p>Actualizaciones en sistema cotizador</p>

      <div className="card bg-dark mt-2 mb-2">
        <div className="card-header text-success">
          {/* <i className="fas fa-user fa-fw me-1"></i> */}
          Actualizaciones por sugerencias
        </div>
        <div className="card-body">
          <h3 className="text-info">Actualizaciones 9/7/2025</h3>
          <p>
            1. Se implementa acceso para usuarios de enfermeria, los cuales
            podran generar cotizaciones y sugerencias.
          </p>
          <p>
            2. Enfermería podrá generar el PDF con los insumos a necesitar, este
            documento se compartirá a los compañeros de recepción y estos podrán
            continuar con la formalización de costos y seguros para entregar a
            los pacientes.
          </p>
          <h3 className="text-info">Actualizaciones 1/6/2025</h3>
          <p>
            1. Al buscar un insumo y se necesita revisar mas de una pagina, este
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
