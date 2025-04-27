"use client";
import { jsPDF } from "jspdf";
import React, { useEffect, useState } from "react";

export default function QuoteView({ inputs }) {
  const [usuario, setUsuario] = useState("");
  const [paciente, setPaciente] = useState("");
  const [seleccionados, setSeleccionados] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [insumosFiltrados, setInsumosFiltrados] = useState(inputs);
  const insumosPorPagina = 10;
  const totalPaginas = Math.ceil(inputs.length / insumosPorPagina); // Total de páginas

  useEffect(() => {
    const filteredInsumos = inputs.filter((insumo) => {
      const numeroDelArticulo = insumo.numeroDelArticulo
        ? insumo.numeroDelArticulo.toLowerCase().trim()
        : "";
      const descripcionDelArticulo = insumo.descripcionDelArticulo
        ? insumo.descripcionDelArticulo.toLowerCase().trim()
        : "";
      return (
        numeroDelArticulo.includes(terminoBusqueda.toLowerCase().trim()) ||
        descripcionDelArticulo.includes(terminoBusqueda.toLowerCase().trim())
      );
    });
    setInsumosFiltrados(filteredInsumos);
  }, [terminoBusqueda, inputs]);

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5; // Número máximo de páginas a mostrar
    const startPage = Math.max(
      1,
      paginaActual - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPaginas, startPage + maxVisiblePages - 1);
    // Asegúrate de que el rango de páginas sea correcto
    for (let i = startPage; i <= endPage; i++) {
      if (i === startPage && i > 1) {
        pages.push(
          <li key="dot-start" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
      pages.push(
        <li
          key={i}
          className={`page-item text-dark ${
            paginaActual === i ? "active" : ""
          }`}
        >
          <button
            type="button"
            className="page-link"
            onClick={() => setPaginaActual(i)}
          >
            {i}
          </button>
        </li>
      );
      if (i === endPage && i < totalPaginas) {
        pages.push(
          <li key="dot-end" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
    }
    return pages;
  };

  const paginationStyle = {
    fontSize: screenWidth < 576 ? "0.8rem" : "1rem",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  };

  const indexOfLastInsumo = paginaActual * insumosPorPagina;
  const indexOfFirstInsumo = indexOfLastInsumo - insumosPorPagina;
  const insumosActuales = insumosFiltrados.slice(
    indexOfFirstInsumo,
    indexOfLastInsumo
  );

  useEffect(() => {
    const storedInsumos = localStorage.getItem("insumosSeleccionados");
    if (storedInsumos) {
      setSeleccionados(JSON.parse(storedInsumos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("insumosSeleccionados", JSON.stringify(seleccionados));
  }, [seleccionados]);

  const agregarInsumo = (insumo) => {
    setSeleccionados((prev) => [...prev, insumo]);
  };
  const eliminarInsumo = (index) => {
    setSeleccionados((prev) => prev.filter((_, i) => i !== index));
  };
  const limpiarSeleccionados = () => {
    setSeleccionados([]);
    localStorage.removeItem("insumosSeleccionados"); // Limpiar también el localStorage
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text(`Responsable: {usuario}`, 10, 10);
    doc.text(`Paciente: {paciente}`, 10, 20);
    doc.text("Insumos Seleccionados:", 10, 30);
    let y = 40; // Posición vertical inicial
    seleccionados.forEach((insumo) => {
      doc.text(
        `${insumo.numeroDelArticulo} - ${insumo.descripcionDelArticulo} - ${insumo.pacIntCOL}`,
        10,
        y
      );
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
            </div>
          </div>
          <table className="table table-hover table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col">Nombre del Artículo</th>
                <th scope="col">Descripción del Artículo</th>
                <th scope="col">Precio (COL)</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tfoot>
              <tr className="table-dark">
                <th scope="col">Nombre del Artículo</th>
                <th scope="col">Descripción del Artículo</th>
                <th scope="col">Precio (COL)</th>
                <th scope="col">Acciones</th>
              </tr>
            </tfoot>
            <tbody>
              {insumosActuales.map((insumo) => (
                <tr className="table-dark" key={insumo.id}>
                  <td>{insumo.numeroDelArticulo}</td>
                  <td>{insumo.descripcionDelArticulo}</td>
                  <td>{insumo.pacIntCOL}</td>
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
          <div style={paginationStyle}>
            <ul className="pagination">
              <li
                className={`page-item {paginaActual === 1 ? "disabled" : ""}`}
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
              {renderPagination()}
              <li
                className={`page-item {paginaActual === totalPaginas ? "disabled" : ""}`}
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
                    <th scope="col">Nombre del Artículo</th>
                    <th scope="col">Descripción del Artículo</th>
                    <th scope="col">Precio (COL)</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr className="table-dark">
                    <th scope="col">Nombre del Artículo</th>
                    <th scope="col">Descripción del Artículo</th>
                    <th scope="col">Precio (COL)</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </tfoot>
                <tbody>
                  {seleccionados.map((insumo, index) => (
                    <tr className="table-dark" key={index}>
                      <td>{insumo.numeroDelArticulo}</td>
                      <td>{insumo.descripcionDelArticulo}</td>
                      <td>{insumo.pacIntCOL}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => eliminarInsumo(index)}
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
                  type="button"
                  className="btn btn-outline-primary mt-2 mb-2"
                  onClick={generarPDF}
                  disabled={seleccionados.length === 0}
                >
                  Generar PDF
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger mt-2 mb-2"
                  onClick={limpiarSeleccionados}
                >
                  Limpiar Seleccionados
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
