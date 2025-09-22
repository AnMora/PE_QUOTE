import ProfilesView from "@/app/components/profilesView";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function showAdmins(params) {
  const profilesCollection = await getCollection("admin");
  const profilesFromDB = await profilesCollection
    ?.find()
    .sort({ $natural: -1 })
    .toArray();

  // Convertir los datos a objetos planos (plain objects) para que sean serializables.
  // Esto convierte ObjectId a string y maneja otros tipos de BSON.
  const profiles = JSON.parse(JSON.stringify(profilesFromDB));

  return (
    <>
      <h1 className="mt-4">Listado de Administradores</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">
          Información general: Actualización, modificación y eliminación de
          usuarios administradores.
        </li>
      </ol>

      <ProfilesView
        profiles={profiles}
        isAdmin={true}
        editPath="/admin/information/admins/edit-admins"
      />
    </>
  );
}
