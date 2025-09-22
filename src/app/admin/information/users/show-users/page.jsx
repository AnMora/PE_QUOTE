import ProfilesView from "@/app/components/profilesView";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";

export default async function showUsers(params) {
  const profilesCollection = await getCollection("users");
  const profilesFromDB = await profilesCollection
    ?.find()
    .sort({ $natural: -1 })
    .toArray();
  const profiles = JSON.parse(JSON.stringify(profilesFromDB));
  return (
    <>
      <h1 className="mt-4">Listado de Empleados</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">
          Informacion general: Actualizacion, modificacion y eliminacion de
          usuarios empleados
        </li>
      </ol>

      <ProfilesView
        profiles={profiles}
        isAdmin={false}
        editPath="/admin/information/users/edit-users"
      />
    </>
  );
}
