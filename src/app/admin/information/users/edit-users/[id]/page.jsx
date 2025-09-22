import UpdateUserComponent from "@/app/components/updateUser";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function editAdminInformation({params}) {
  const { id } = await params;
    console.log(id);
    
  const profilesCollection = await getCollection("users");
  const profileFromDB =
    id.length === 24
      ? await profilesCollection?.findOne({
          _id: ObjectId.createFromHexString(id),
        })
      : null;

  // Convertir el objeto a un objeto plano (plain object) para que sea serializable.
  // Esto convierte ObjectId a string y maneja otros tipos de BSON.
  const profile = JSON.parse(JSON.stringify(profileFromDB));

  return (
    <>
      <h1 className="mt-4">Editar datos de Enfermeria</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">
          Informacion general: Actualizacion, modificacion y eliminacion de
          usuarios
        </li>
      </ol>

      {profile ? <UpdateUserComponent user={profile} /> : <p>Failed to fetch the data</p>}
    </>
  );
}
