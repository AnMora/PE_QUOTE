"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import QuoteView from "../components/quoteView";

export default function Quotes(params) {
  const [usuario, setUsuario] = useState("");
  const [paciente, setPaciente] = useState("");
  const [seleccionados, setSeleccionados] = useState([]);

  const insumos = [
    { id: 1, nombre: "Guantes", precio: 10 },
    { id: 2, nombre: "Mascarillas", precio: 5 },
    { id: 3, nombre: "Desinfectante", precio: 20 },
  ];

  const agregarInsumo = (insumo) => {
    setSeleccionados((prev) => [...prev, insumo]);
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
      <p>Para realizar una cotizació por favor complete los siguientes datos:</p>
      <div id="layoutAuthentication_content">
        <main>
          <div className="container px-2">
            <QuoteView handler="" />
          </div>
        </main>
      </div>
    </>
  );
}
