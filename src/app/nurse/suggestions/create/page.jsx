import { createNursePost } from "@/app/actions/posts";
import SuggestionFormComponent from "@/app/components/SuggestionForm";

export default async function createNurseSuggestion(params) {
  return (
    <>
      {/* <h1 className="mt-4">Crear Sugerencia</h1> */}
      <div id="layoutAuthentication_content">
        <main>
          <div className="container px-2">
            <div className="card bg-dark mt-2 mb-2">
              <div className="card-header text-success">
                <i className="fas fa-book-open me-1"></i>
                Crear sugerencias - comentarios
              </div>
              <SuggestionFormComponent handler={createNursePost} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}