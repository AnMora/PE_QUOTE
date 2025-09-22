import ProfilesView from "@/app/components/profilesView";
import { getCollection } from "@/lib/db";

export default async function showNurses(params) {
  const profilesCollection = await getCollection("nurse");
  const profilesFromDB = await profilesCollection
    ?.find()
    .sort({ $natural: -1 })
    .toArray();

  const profiles = JSON.parse(JSON.stringify(profilesFromDB));

  return (
    <>
      <h1 className="mt-4">Listado de Enfermeros</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">
          Informacion general: Actualizacion, modificacion y eliminacion de
          usuarios enfermeros
        </li>
      </ol>

      <ProfilesView
        profiles={profiles}
        isAdmin={false}
        editPath="/admin/information/nurses/edit-nurses"
      />
    </>
  );
}
