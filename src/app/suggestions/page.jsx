import { getCollection } from "@/lib/db";
import Link from "next/link";

export default async function suggestions(params) {
  const suggestionCollection = await getCollection("suggestions");
  const suggestion = await suggestionCollection
    ?.find()
    .sort({ $natural: -1 })
    .toArray();
    
  if (suggestion.length === 0) {
    return (
      <>
        <h1 className="mt-4">Sugerencias Principal</h1>
        <p>Panel de sugerencias con opciones para:</p>
        <div className="card bg-dark mt-2 mb-2">
          <div className="card-header">
            <i className="fas fa-book-open me-1"></i>
            Crear sugerencias
          </div>
          <div className="d-flex bd-highlight">
            <div className="w-100 bd-highlight">
              <div className="card-body">
                Ayuda a mejorar el sitio web con tus comentarios y experiencia
              </div>
            </div>
            <div className="flex-shrink-1 p-2 bd-highlight">
              <Link href="/suggestions/create">
                <button className="btn btn-outline-success" href="#">
                  Crear
                </button>
              </Link>
            </div>
          </div>
        </div>
        <p>Crea la primer sugerencia para el desarrollador</p>
      </>
    );
  }

  return (
    <>
      <h1 className="mt-4">Sugerencias Principal</h1>
      <p>Panel de sugerencias con opciones para:</p>
      <div className="card bg-dark mt-2 mb-2">
        <div className="card-header text-success">
          <i className="fas fa-book-open me-1"></i>
          Crear sugerencias
        </div>
        <div className="d-flex bd-highlight">
          <div className="w-100 bd-highlight">
            <div className="card-body">
              Ayuda a mejorar el sitio web con tus comentarios y experiencia
            </div>
          </div>
          <div className="flex-shrink-1 p-2 bd-highlight">
            <Link href="/suggestions/create">
              <button className="btn btn-outline-success" href="#">
                Crear
              </button>
            </Link>
          </div>
        </div>
      </div>
      <p>Mostrar sugerencias creadas:</p>
      <div className="row">
        {suggestion.map((item) => (
          <div key={item._id} className="col-lg-4 col-md-12 col-sm-12">
            <div
              className="card bg-dark mb-2"
              style={{ Height: "400px", minHeight: "300px" }}
            >
              <div className="card-header">
                <div className="text-primary">
                  {/* <i className="fas fa-table me-1"></i> */}
                  {item.title}
                </div>
                <span className="badge bg-warning rounded-pill me-1">
                  {item._id.getTimestamp().toLocaleDateString()}
                </span>
                <span className="badge bg-info rounded-pill me-1">
                  {item.userFirstName} {item.userLastName}
                </span>
              </div>
              <div className="card-body">
                <p
                  className="card-text"
                  style={{
                    maxHeight: "100px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    resize: "none",
                  }}
                >
                  {item.description}
                </p>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link href={`/suggestions/show/${item._id.toString()}`}>
                  <button className="btn btn-outline-info" href="#">
                    Ver sugerencia
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
