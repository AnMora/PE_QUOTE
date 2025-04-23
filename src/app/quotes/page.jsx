"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import QuoteView from "../components/quoteView";

export default function Quotes(params) {
  return (
    <>
      <h1 className="mt-4">Cotizador Principal</h1>
      <p>Para realizar una cotización por favor complete los siguientes datos:</p>
      <div id="layoutAuthentication_content">
        <main>
        <div className="container-fluid px-2">
            <QuoteView handler="" />
          </div>
        </main>
      </div>
    </>
  );
}
