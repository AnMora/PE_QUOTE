import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function DashboardUser({ params }) {
  const { id } = await params;

  const userCollection = await getCollection("users");
  const user =
    id.length === 24
      ? await userCollection?.findOne({
          _id: ObjectId.createFromHexString(id),
        })
      : null;

  return (
    <>
      <h1 className="mt-4">
        Dashboard {user.firstName} {user.lastName}
      </h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">
          Informacion general: acerca de panel de usuario
        </li>
      </ol>
    </>
  );
}
