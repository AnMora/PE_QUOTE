import ProfilesView from "@/app/components/profilesView";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";

export default async function showNurses(params) {
    const authUser = await getAuthUser();
    const authUserId = authUser.userId;
    const userCollection = await getCollection("nurse");
    
    const nurseProfiles = await userCollection
        ?.find()
        .sort({ $natural: -1 })
        .toArray();
    
        const sanitizedNurseProfiles = nurseProfiles.map(profile => ({
            ...profile,
            _id: profile._id.toString(),
        }));

    return (
        <>
            <h1 className="mt-4">
                Listado de Enfermeros
            </h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">
                Informacion general: Actualizacion, modificacion y eliminacion de usuarios enfermeros
                </li>
            </ol>

            <ProfilesView profiles={sanitizedNurseProfiles} profileType="nurse" />
        </>
    )
}