export default function ShowSuggestion({ suggestion }) {
  return (
    <div>
      <div
        className="card mb-3"
        // style={{ Height: "400px", minHeight: "300px" }}
      >
        {/* <h4 className="card-header">{item.title}</h4> */}
        <div className="card-header">
          <div className="d-flex bd-highlight">
            <div className="w-100 p-2 bd-highlight">
              <h2>{suggestion.title}</h2>
            </div>
            <div className="flex-shrink-1 p-1 bd-highlight">
              <p className="small">
                {suggestion._id.getTimestamp().toLocaleString()} por Angel Mora
              </p>
            </div>
          </div>
        </div>
        <div className="card-body">
          <p
            className="card-text"
            // style={{ maxHeight: "100px", overflow: "scroll" }}
          >
            {suggestion.description}
          </p>
        </div>
        <div className="card-footer d-flex align-items-center justify-content-end">
          <button className="btn btn-info m-1" href="#">
            Editar
          </button>
          <button className="btn btn-danger m-1" href="#">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
