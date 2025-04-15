import getAuthUser from "@/lib/getAuthUser";
import Link from "next/link";

export default async function ShowSuggestion({ suggestion }) {
  const user = await getAuthUser();
  // console.log(user.userId === suggestion.userId.toString());
  
  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container px-2">
          <div className="card shadow-lg border-0 rounded-lg mt-2 mb-2">
            <div className="card-header">
              <div className="d-flex bd-highlight">
                <div className="w-100 p-2 bd-highlight">
                  <h2>{suggestion.title}</h2>
                </div>
                <div className="flex-shrink-1 p-1 bd-highlight">
                  <p className="small">
                    {suggestion._id.getTimestamp().toLocaleString()} por {suggestion.userName} {suggestion.userLastName}
                  </p>
                </div>
              </div>
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
                  <button className="btn btn-info m-1">Editar</button>
                </Link>
                <button className="btn btn-danger m-1" href="#">
                  Eliminar
                </button>
              </div>
            ) : (
              <div className="card-footer d-flex align-items-center justify-content-end">
                <Link href="/suggestions">
                  <button className="btn btn-danger m-1">Volver</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
