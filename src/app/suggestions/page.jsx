import { getCollection } from "@/lib/db";
import Link from "next/link";

export default async function suggestions(params) {
  const suggestionCollection = await getCollection("suggestions");
  const suggestion = await suggestionCollection
    ?.find()
    .sort({ $natural: -1 })
    .toArray();

  if (suggestion) {
    return (
      <div>
        <h1 className="mt-4">Sugerencias Principal</h1>
        <p>Panel de sugerencias con opciones para:</p>
        <div className="card text-white mb-2">
          <div className="d-flex bd-highlight">
            <div className="w-100 p-1 bd-highlight">
              <div className="card-body">
                <h3>Crear Sugerencias</h3>
                <p>
                  Ayuda a mejorar el sitio web con tus comentarios y experiencia
                </p>
              </div>
            </div>
            <div className="flex-shrink-1 p-4 bd-highlight">
              <Link href="/suggestions/create">
                <button className="btn btn-success" href="#">
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
                className="card mb-3"
                style={{ Height: "400px", minHeight: "300px" }}
              >
                {/* <h4 className="card-header">{item.title}</h4> */}
                <div className="card-header">
                  <div className="d-flex bd-highlight">
                    <div className="w-100 p-2 bd-highlight">
                      <h4>{item.title}</h4>
                    </div>
                    <div className="flex-shrink-1 p-1 bd-highlight">
                      <p className="small">
                        {item._id.getTimestamp().toLocaleDateString()} por Angel Mora
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <p
                    className="card-text textarea-hidden-scroll"
                    style={{ maxHeight: "100px", overflow: "scroll", resize: "none" }}
                  >
                    {item.description}
                  </p>
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                <Link href={`/suggestions/show/${item._id.toString()}`}>
                  <button className="btn btn-info" href="#">
                    Ver sugerencia
                  </button>
                </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="mt-4">Sugerencias Principal</h1>
        <p>Panel de sugerencias con opciones para:</p>
        <div className="card text-white mb-2">
          <div className="d-flex bd-highlight">
            <div className="w-100 p-1 bd-highlight">
              <div className="card-body">
                <h3>Crear Sugerencias</h3>
                <p>
                  Ayuda a mejorar el sitio web con tus comentarios y experiencia
                </p>
              </div>
            </div>
            <div className="flex-shrink-1 p-4 bd-highlight">
              <Link href="/suggestions/create">
                <button className="btn btn-success" href="#">
                  Crear
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
