export default function UsersList(params) {
  return (
    <div className="card bg-dark mt-2 mb-2">
      <div className="card-header text-success">
        <i className="fas fa-columns me-1"></i>
        Listado de administradores - usuarios
      </div>
      <div className="card-body">
        {/* CAMPO DE BÚSQUEDA */}
        <div className="mb-1">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="buscador"
              placeholder="Buscar insumos..."
            //   value={terminoBusqueda}
            //   onChange={(e) => setTerminoBusqueda(e.target.value)}
            />
            <button
              className="btn btn-primary"
              id="btnNavbarSearch"
              type="button"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <table className="table table-hover table-bordered">
          <thead>
            <tr className="table-dark">
              <th scope="col">Nombre del Artículo</th>
              <th scope="col">Descripción del Artículo</th>
              <th scope="col">Precio Ext (COL)</th>
              <th scope="col">Precio Int (COL)</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tfoot>
            <tr className="table-dark">
              <th scope="col">Nombre del Artículo</th>
              <th scope="col">Descripción del Artículo</th>
              <th scope="col">Precio Ext (COL)</th>
              <th scope="col">Precio Int (COL)</th>
              <th scope="col">Acciones</th>
            </tr>
          </tfoot>
          <tbody>
            {/* {insumosActuales.map((insumo) => (
              <tr className="table-dark" key={insumo.id}>
                <td>{insumo.numeroDelArticulo}</td>
                <td>{insumo.descripcionDelArticulo}</td>
                <td>{insumo.pacExtCOL}</td>
                <td className="text-warning">{insumo.pacIntCOL}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => agregarInsumo(insumo)}
                  >
                    Agregar
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
