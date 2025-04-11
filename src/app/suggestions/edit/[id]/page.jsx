import { editPost } from "@/app/actions/posts";
import SuggestionFormComponent from "@/app/components/SuggestionForm";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export default async function editSuggestion({ params }) {
    // ** ID PARAMETER FROM PAGE PARAMS
  const { id } = await params;

    // ** GET AUTH USER FROM COOKIES
    const user = await getAuthUser()

  const suggestionCollection = await getCollection("suggestions");
  let suggestion;
  if (id.length === 24 && suggestionCollection) {
    suggestion = await suggestionCollection.findOne({
      _id: ObjectId.createFromHexString(id),
    });
    suggestion = JSON.parse(JSON.stringify(suggestion));
    if (user.userId !== suggestion.userId) {
        redirect("/suggestions")
    }
  } else {
    suggestion = null;
  }

  return (
    <>
      <div id="layoutAuthentication_content">
        <main>
          <div className="container px-2">
            <div className="card shadow-lg border-0 rounded-lg mt-2 mb-2">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-2">
                  Editar Sugerencia - Comentario
                </h3>
              </div>
              {suggestion ? (
                <SuggestionFormComponent handler={editPost} suggestion={suggestion} />
              ) : (
                <p>Failed to fetch the data</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
