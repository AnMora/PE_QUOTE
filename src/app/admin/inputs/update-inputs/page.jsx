import ProfilesView from "@/app/components/profilesView";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";

export default async function updateInputs(params) {
    const authUser = await getAuthUser();
    const authUserId = authUser.userId;
    const userCollection = await getCollection("inputs");

    const inputProfiles = await userCollection
        ?.find()
        .sort({ $natural: -1 })
        .toArray();

    const sanitizedInputProfiles = inputProfiles.map(profile => ({
        ...profile,
        _id: profile._id.toString(),
    }));

    return(
        <>
            <h1 className="mt-4">
                Listado de insumos
            </h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">
                Informacion general: Actualizacion, modificacion y eliminacion de insumos
                </li>
            </ol>

            {/* <ProfilesView profiles={sanitizedInputProfiles} profileType="input" /> */}
            
            {/* SE VA A NECESITAR LLAMAR LA TABLA DE INSUMOS
                1. Con limite y paginaciones
                2. Verificar sus respectivos nombres
                3. Integrar el espacio de porcentaje de descuento con medismart
                
                    pero antes crear el registrar insumo para poder actualizar ahi mimo*/}
        </>
    )
}