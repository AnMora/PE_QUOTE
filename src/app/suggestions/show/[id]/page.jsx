import ShowSuggestion from "@/app/components/showSuggestion";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function showSuggestion({ params }) {
  const { id } = await params;

  const suggestionCollection = await getCollection("suggestions");
  const suggestion =
    id.length === 24
      ? await suggestionCollection?.findOne({
          _id: ObjectId.createFromHexString(id),
        })
      : null;
      

  return (
    <>
      {suggestion ? (
        <ShowSuggestion suggestion={suggestion} />
      ) : (
        <p>Failed to fetch the data</p>
      )}
    </>
  );
}
