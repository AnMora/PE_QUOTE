import ProfilesView from "@/app/components/profilesView";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";

export default async function showUsers(params) {
  const authUser = await getAuthUser();
  const authUserId = authUser.userId;
  const userCollection = await getCollection("users");

  const userProfiles = await userCollection
    ?.find()
    .sort({ $natural: -1 })
    .toArray();

  const sanitizedUserProfiles = userProfiles.map((profile) => ({
    ...profile,
    _id: profile._id.toString(),
  }));

  return (
    <>
      <h1 className="mt-4">Listado de Empleados</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">
          Informacion general: Actualizacion, modificacion y eliminacion de
          usuarios empleados
        </li>
      </ol>

      <ProfilesView profiles={sanitizedUserProfiles} profileType="user" />
    </>
  );
}
