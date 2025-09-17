import { editNursePost } from "@/app/actions/posts";
import SuggestionFormComponent from "@/app/components/SuggestionForm";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export default async function editNurseSuggestion({ params }) {
  const { id } = await params;
  const user = await getAuthUser();

  const suggestionCollection = await getCollection("suggestions");
  let suggestion;
  if (id.length === 24 && suggestionCollection) {
    suggestion = await suggestionCollection.findOne({
      _id: ObjectId.createFromHexString(id),
    });
    suggestion = JSON.parse(JSON.stringify(suggestion));
    if (user.userId !== suggestion.userId) {
      redirect("/nurse/suggestions");
    }
  } else {
    suggestion = null;
  }

  return (
    <>
      <div id="layoutAuthentication_content">
        <main>
          <div className="container px-2">
            <div className="card border-success mt-2 mb-2">
              <div className="card-header">
                <i className="fas fa-book-open me-1"></i>
                Editar Sugerencia - Comentario
              </div>
              {suggestion ? (
                <SuggestionFormComponent
                  handler={editNursePost}
                  suggestion={suggestion}
                  isNurse={true}
                />
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
