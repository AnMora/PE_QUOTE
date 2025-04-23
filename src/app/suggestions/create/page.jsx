import { createPost } from "@/app/actions/posts";
import SuggestionFormComponent from "@/app/components/SuggestionForm";

export default async function createSuggestion(params) {
  return (
    <>
      {/* <h1 className="mt-4">Crear Sugerencia</h1> */}
      <div id="layoutAuthentication_content">
        <main>
          <div className="container px-2">
            <div className="card bg-dark mt-2 mb-2">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-2">
                  Crear Sugerencia - Comentario
                </h3>
              </div>
              <SuggestionFormComponent handler={createPost} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
