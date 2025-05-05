import getAuthUser from "@/lib/getAuthUser";
import Link from "next/link";
import { deletePost } from "../actions/posts";

export default async function ShowSuggestion({ suggestion }) {
  const user = await getAuthUser();

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container px-2">
          <div className="card bg-dark mt-2 mb-2">
            <div className="card-header">
            <div className="text-primary">
                {suggestion.title}
              </div>
                <span className="badge bg-warning rounded-pill me-1">
                  {suggestion._id.getTimestamp().toLocaleString()}
                </span>
                <span className="badge bg-info rounded-pill me-1">
                  {suggestion.userFirstName} {suggestion.userLastName}
                </span>
            </div>
            <div className="card-body">
              <p
                className="card-text"
                style={{
                  textOverflow: "ellipsis",
                }}
              >
                {suggestion.description}
              </p>
            </div>
            {user.userId === suggestion.userId.toString() ? (
              <div className="card-footer d-flex align-items-center justify-content-end">
                <Link href={`/suggestions/edit/${suggestion._id.toString()}`}>
                  <button className="btn btn-outline-info m-1">Editar</button>
                </Link>
                <form action={deletePost}>
                  <input
                    type="hidden"
                    name="suggestionId"
                    defaultValue={suggestion._id.toString()}
                  />
                  <button
                    type="submit"
                    className="btn btn-outline-danger m-1"
                    href="#"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            ) : (
              <div className="card-footer d-flex align-items-center justify-content-end">
                <Link href="/suggestions">
                  <button className="btn btn-outline-danger m-1">Volver</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}