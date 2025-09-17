import NewsInformation from "@/app/components/news";
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

      <NewsInformation />
    </>
  );
}
