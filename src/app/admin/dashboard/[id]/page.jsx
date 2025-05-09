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
      <h1 className="mt-4">
        Panel Admin {admin.firstName} {admin.lastName}
      </h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">
          Informacion general: guia de links - instrucciones - acerca de - ..
        </li>
      </ol>
    </>
  );
}
