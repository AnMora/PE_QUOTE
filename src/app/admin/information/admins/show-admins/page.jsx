import ProfilesView from "@/app/components/profilesView";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function showAdmins(params) {
  const authUser = await getAuthUser();
  const authUserId = authUser.userId;
  const userCollection = await getCollection("admin");
    
  const adminProfiles = await userCollection
    ?.find()
    .sort({ $natural: -1 })
    .toArray();

  const sanitizedAdminProfiles = adminProfiles.map(profile => ({
    ...profile,
    _id: profile._id.toString(),
  }));

  return (
    <>
      <h1 className="mt-4">Listado de administradores</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">
          Información general: Actualización, modificación y eliminación de
          usuarios administradores.
        </li>
      </ol>

      {/* 
        TODO: Implementar la visualización de perfiles en el componente ProfilesView.
        - Se puede usar una tabla o tarjetas para mostrar los datos.
        - Agregar botones para "Modificar" y "Eliminar".
        - Modificar: Redirigir a una página de formulario con los datos precargados.
        - Eliminar: Mostrar un diálogo de confirmación antes de borrar.
      */}
      <ProfilesView profiles={sanitizedAdminProfiles} profileType="admin" />
    </>
  );
}
