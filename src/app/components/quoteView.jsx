"use client"

import { jsPDF } from "jspdf";
import { useState } from "react";

export default function QuoteView({ params, inputs }) {      

  const [usuario, setUsuario] = useState("");
  const [paciente, setPaciente] = useState("");
  const [seleccionados, setSeleccionados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const insumosPorPagina = 10;

  const insumos = [
    { id: 1, nombre: "Guantes", precio: 10 },
    { id: 2, nombre: "Mascarillas", precio: 5 },
    { id: 3, nombre: "Desinfectante", precio: 20 },
    { id: 4, nombre: "Pañales", precio: 10 },
    { id: 5, nombre: "Mascarillas", precio: 5 },
    { id: 6, nombre: "Acetaminofen", precio: 20 },
    { id: 7, nombre: "Guantes", precio: 10 },
    { id: 8, nombre: "Mascarillas", precio: 5 },
    { id: 9, nombre: "Desinfectante", precio: 20 },
    { id: 10, nombre: "Algodones", precio: 10 },
    { id: 11, nombre: "Mascarillas", precio: 5 },
    { id: 12, nombre: "Desinfectante", precio: 20 },
    { id: 13, nombre: "Guantes", precio: 10 },
    { id: 14, nombre: "Mascarillas", precio: 5 },
    { id: 15, nombre: "Desinfectante", precio: 20 },
    { id: 16, nombre: "Mascarillas", precio: 5 },
    { id: 17, nombre: "Desinfectante", precio: 20 },
    { id: 18, nombre: "Guantes", precio: 10 },
    { id: 19, nombre: "Mascarillas", precio: 5 },
    { id: 20, nombre: "Desinfectante", precio: 20 },
  ];

  const agregarInsumo = (insumo) => {
    setSeleccionados((prev) => [...prev, insumo]);
  };

  const insumosFiltrados = insumos.filter((insumo) =>
    insumo.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  const indexOfLastInsumo = paginaActual * insumosPorPagina;
  const indexOfFirstInsumo = indexOfLastInsumo - insumosPorPagina;
  const insumosActuales = insumosFiltrados.slice(
    indexOfFirstInsumo,
    indexOfLastInsumo
  );
  const totalPaginas = Math.ceil(insumosFiltrados.length / insumosPorPagina);
  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text(`Responsable: ${usuario}`, 10, 10);
    doc.text(`Paciente: ${paciente}`, 10, 20);
    doc.text("Insumos Seleccionados:", 10, 30);
    let y = 40; // Posición vertical inicial
    seleccionados.forEach((insumo) => {
      doc.text(`${insumo.nombre} - $${insumo.precio}`, 10, y);
      y += 10;
    });
    doc.save("cotizacion.pdf");
  };
  return (
    <form action="">
      {/* DATOS DE PACIENTE  */}
      <div className="card bg-dark mt-2 mb-2">
        <div className="card-header text-success">
          <i className="fas fa-user fa-fw me-1"></i>
          Datos de paciente
        </div>
        <div className="card-body">
          <input type="hidden" name="suggestionId" />
          <div className="row mb-2">
            <div className="col-md-6">
              <div className="form-floating mb-3 mb-md-0">
                <input
                  className="form-control"
                  id="inputFirstName"
                  type="text"
                  name="fullName"
                  placeholder="Ingrese nombre completo paciente"
                  onChange={(e) => setUsuario(e.target.value)}
                />
                <label htmlFor="inputFirstName">Nombre Completo</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  className="form-control"
                  id="inputLastName"
                  type="text"
                  name="DayOfBirth"
                  placeholder="Ingrese fecha de nacimiento paciente"
                />
                <label htmlFor="inputLastName">Fecha de nacimiento</label>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="form-floating mb-3 mb-md-0">
                <input
                  className="form-control"
                  id="inputFirstName"
                  type="text"
                  name="emailAddress"
                  placeholder="Ingrese correo electronico paciente"
                />
                <label htmlFor="inputFirstName">Correo Electrónico</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  className="form-control"
                  id="inputLastName"
                  type="text"
                  name="patientDiagnosis"
                  placeholder="Ingrese diagnostico de paciente"
                />
                <label htmlFor="inputLastName">Diagnóstico</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-dark mt-2 mb-2">
        <div className="card-header text-success">
          <i className="fas fa-columns me-1"></i>
          Insumos disponibles
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
                value={terminoBusqueda}
                onChange={(e) => setTerminoBusqueda(e.target.value)}
              />
              <button
                className="btn btn-primary"
                id="btnNavbarSearch"
                type="button"
              >
                <i className="fas fa-search"></i>
              </button>
              {/* <label htmlFor="buscador">Buscar Insumos</label> */}
            </div>
          </div>

          <table className="table table-hover table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tfoot>
              <tr className="table-dark">
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Acciones</th>
              </tr>
            </tfoot>
            <tbody>
              {insumos.map((insumo) => (
                <tr className="table-dark" key={insumo._id}>
                  <td>{insumo.nombre}</td>
                  <td>${insumo.precio}</td>
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
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div >
            <ul className="pagination">
              <li
                className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={() =>
                    setPaginaActual(paginaActual > 1 ? paginaActual - 1 : 1)
                  }
                  disabled={paginaActual === 1}
                >
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPaginas }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${
                    paginaActual === index + 1 ? "primary" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="page-link"
                    onClick={() => setPaginaActual(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  paginaActual === totalPaginas ? "disabled" : ""
                }`}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={() =>
                    setPaginaActual(
                      paginaActual < totalPaginas
                        ? paginaActual + 1
                        : totalPaginas
                    )
                  }
                  disabled={paginaActual === totalPaginas}
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card bg-dark mt-2 mb-2">
        <div className="card-header text-success">
          <i className="fas fa-columns me-1"></i>
          Insumos seleccionados
        </div>
        <div className="card-body">
          {seleccionados.length > 0 ? (
            <div>
              <table className="table table-hover table-bordered">
                <thead>
                  <tr className="table-dark">
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr className="table-dark">
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </tfoot>
                <tbody>
                  {seleccionados.map((insumo, index) => (
                    <tr className="table-dark" key={index}>
                      <td>{insumo.nombre}</td>
                      <td>${insumo.precio}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => {
                            setSeleccionados(
                              seleccionados.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-grid">
                <button
                  className="btn btn-outline-primary mt-2 mb-2"
                  onClick={generarPDF}
                  disabled={seleccionados.length === 0}
                >
                  Generar PDF
                </button>
              </div>
            </div>
          ) : (
            <p>No se han seleccionado insumos.</p>
          )}
        </div>
      </div>
    </form>
  );
}

// ** VAN HACER 3 FORMULARIOS
// ** 1. Datos de paciente
// ** 2. Cotizacion de insumos
// ** 3. Insumos Cotizados
// ** 4. Mostrar el total de insumos
// ** Aplicar porcentaje : ya se ms o seguro
// ** Costo total con porcentaje
