import NewsInformation from "@/app/components/news";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function DashboardNurse({ params }) {
  const { id } = await params;
  const userCollection = await getCollection("nurse");
  const user =
    id.length === 24
      ? await userCollection?.findOne({
          _id: ObjectId.createFromHexString(id),
        })
      : null;

  return (
    <>
      <h1 className="mt-4">
        Panel Enfermería {user.firstName} {user.lastName}
      </h1>
      <p>Actualizaciones en sistema cotizador</p>

      <NewsInformation />
    </>
  );
}
