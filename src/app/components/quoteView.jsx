"use client";

import { jsPDF } from "jspdf";
import React, { useEffect, useState, useMemo } from "react";

export default function QuoteView({ inputs }) {
  const [user, setUser] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [diagnostic, setDiagnostic] = useState("");
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [insumosFiltrados, setInsumosFiltrados] = useState(inputs);
  const [seleccionados, setSeleccionados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [screenWidth, setScreenWidth] = useState(0);
  const [requiereSeguro, setRequiereSeguro] = useState(false);
  const [porcentajeAPagar, setPorcentajeAPagar] = useState(20);
  const insumosPorPagina = 10;
  const totalPaginas = Math.ceil(inputs.length / insumosPorPagina);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize(); // Establece el valor inicial
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const filteredInsumos = inputs.filter((insumo) => {
      const numeroDelArticulo =
        insumo.numeroDelArticulo?.toLowerCase().trim() || "";
      const descripcionDelArticulo =
        insumo.descripcionDelArticulo?.toLowerCase().trim() || "";
      return (
        numeroDelArticulo.includes(terminoBusqueda.toLowerCase().trim()) ||
        descripcionDelArticulo.includes(terminoBusqueda.toLowerCase().trim())
      );
    });
    setInsumosFiltrados(filteredInsumos);
  }, [terminoBusqueda, inputs]);

  const totalSinImpuesto = seleccionados.reduce((acc, insumo) => {
    const precio = insumo.pacIntCOL
      ? typeof insumo.pacIntCOL === "string"
        ? parseFloat(insumo.pacIntCOL.replace(/\s/g, "").replace(",", ".")) || 0
        : parseFloat(insumo.pacIntCOL) || 0
      : 0; // Si es undefined o null, usar 0
    return acc + precio;
  }, 0);
  const impuesto = useMemo(() => totalSinImpuesto * 0.04, [totalSinImpuesto]);
  const totalConImpuesto = useMemo(
    () => totalSinImpuesto + impuesto,
    [totalSinImpuesto, impuesto]
  );
  const totalConSeguro = useMemo(
    () =>
      requiereSeguro
        ? totalConImpuesto * (porcentajeAPagar / 100)
        : totalConImpuesto,
    [requiereSeguro, totalConImpuesto, porcentajeAPagar]
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
    localStorage.removeItem("insumosSeleccionados");
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text(`Responsable: ${user}`, 10, 10);
    doc.text(`Paciente: ${email}`, 10, 20);
    doc.text("Insumos Seleccionados:", 10, 30);
    let y = 40;
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
  const indexOfLastInsumo = paginaActual * insumosPorPagina;
  const indexOfFirstInsumo = indexOfLastInsumo - insumosPorPagina;
  const insumosActuales = insumosFiltrados.slice(
    indexOfFirstInsumo,
    indexOfLastInsumo
  );

  const paginationStyle = {
    fontSize: screenWidth < 576 ? "0.8rem" : "1rem",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  };

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

  return (
    <form action={""}>
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
                  onChange={(e) => setUser(e.target.value)}
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
                  onChange={(e) => setDayOfBirth(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setDiagnostic(e.target.value)}
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
              {insumosActuales.map((insumo) => (
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
              ))}
            </tbody>
          </table>
          {/* Paginación */}

          <div style={paginationStyle}>
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
              {renderPagination()} {/* Asegúrate de que esta línea esté aquí */}
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
                    <th scope="col">Nombre del Artículo</th>
                    <th scope="col">Descripción del Artículo</th>
                    <th scope="col">Precio Int (COL)</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr className="table-dark">
                    <th colSpan="2" className="text-end">
                      Costos Totales
                    </th>
                    <th colSpan="2" className="text-end">
                      Montos Totales
                    </th>
                  </tr>
                  <tr className="table-dark">
                    <td colSpan="2" className="text-end">
                      Total sin Impuesto:
                    </td>
                    <td colSpan="2" className="text-end text-warning">
                      {totalSinImpuesto.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="table-dark">
                    <td colSpan="2" className="text-end">
                      Total con Impuesto (4%):
                    </td>
                    <td colSpan="2" className="text-end text-warning">
                      {totalConImpuesto.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="table-dark">
                    <td colSpan="2" className="text-end">
                      Requiere seguro
                    </td>
                    <td colSpan="2" className="text-end text-warning">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={requiereSeguro}
                        onChange={(e) => setRequiereSeguro(e.target.checked)}
                      />
                    </td>
                  </tr>
                  {requiereSeguro && (
                    <>
                      <tr className="table-dark">
                        <td colSpan="2" className="text-end">
                          Porcentaje a Pagar (%):
                        </td>
                        <td colSpan="2">
                          <input
                            className="form-control text-end"
                            type="text"
                            id="porcentajeAPagar"
                            value={porcentajeAPagar}
                            onChange={(e) =>
                              setPorcentajeAPagar(
                                parseFloat(e.target.value) || 0
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr className="table-dark">
                        <td colSpan="2" className="text-end">
                          Total con Seguro:
                        </td>
                        <td colSpan="2" className="text-end text-warning">
                          {totalConSeguro.toFixed(2)}
                        </td>
                      </tr>
                    </>
                  )}
                </tfoot>
                <tbody>
                  {seleccionados.map((insumo, index) => (
                    <tr className="table-dark" key={index}>
                      <td>{insumo.numeroDelArticulo}</td>
                      <td>{insumo.descripcionDelArticulo}</td>
                      <td className="text-warning">{insumo.pacIntCOL}</td>
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
            </div>
          ) : (
            <p>No se han seleccionado insumos.</p>
          )}
        </div>
        <div className="card-footer d-flex align-items-center justify-content-end">
          <button
            type="button"
            className="btn btn-outline-primary mt-2 mb-2 m-1"
            onClick={generarPDF}
            disabled={seleccionados.length === 0}
          >
            Generar PDF
          </button>
          <button
            type="button"
            className="btn btn-outline-danger mt-2 mb-2 m-1"
            onClick={limpiarSeleccionados}
          >
            Limpiar Seleccionados
          </button>
        </div>
      </div>
    </form>
  );
}
