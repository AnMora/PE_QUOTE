"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

export default function Quotes(params) {
  const [usuario, setUsuario] = useState("");
  const [paciente, setPaciente] = useState('');
  const [seleccionados, setSeleccionados] = useState([]);

  const insumos = [
    { id: 1, nombre: "Guantes", precio: 10 },
    { id: 2, nombre: "Mascarillas", precio: 5 },
    { id: 3, nombre: "Desinfectante", precio: 20 },
  ];

  const agregarInsumo = (insumo) => {
    setSeleccionados((prev) => [...prev, insumo]);
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    alert(`Paciente: ${nombrePaciente}`);
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text(`Responsable: ${usuario}`, 10, 10);
    doc.text(`Paciente: ${paciente}`, 10, 20);
    doc.text("Insumos Seleccionados:", 10, 30);
    let y = 40; // Posición vertical inicial
    seleccionados.forEach((insumo) => {
      doc.text(`${insumo.nombre} - $${insumo.precio}`, 10, y);
      y += 10; // Espacio entre líneas
    });
    doc.save("cotizacion.pdf");
  };

  return (
    <>
      <h1 className="mt-4">Cotizador Principal</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">
          Informacion general: tabla de cotizaciones - Agregar / Quitar insumos
          - PDF
        </li>
      </ol>
      <form onSubmit={manejarSubmit}>
        <div className="mb-3">
          <label htmlFor="usuario" className="form-label">
            Nombre del Responsable:
          </label>
          <input
            type="text"
            className="form-control"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="paciente" className="form-label">Nombre del Paciente:</label>
          <input
            type="text"
            className="form-control"
            id="paciente"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            required
          />
        </div>
        <button type="submit">Guardar Datos</button>
      </form>
      <h2 className="mt-4">Insumos Disponibles</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {insumos.map((insumo) => (
            <tr key={insumo.id}>
              <td>{insumo.nombre}</td>
              <td>${insumo.precio}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => agregarInsumo(insumo)}
                >
                  Agregar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="mt-4">Insumos Seleccionados</h2>
      {seleccionados.length > 0 ? (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {seleccionados.map((insumo, index) => (
                <tr key={index}>
                  <td>{insumo.nombre}</td>
                  <td>${insumo.precio}</td>
                  <td>
                    <button
                      className="btn btn-danger"
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
          <button className="btn btn-info mt-4" onClick={generarPDF}>
            Generar PDF
          </button>
        </div>
      ) : (
        <p>No se han seleccionado insumos.</p>
      )}
    </>
  );
}

// ** USAR REACT-DATATABLE
