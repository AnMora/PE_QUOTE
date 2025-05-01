import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function GeneratePDF({
  patient,
  dayOfBirth,
  email,
  diagnostic,
  seleccionados,
  requiereSeguro,
  porcentajeAPagar,
}) {
    const generarPDF = () => {
        const doc = new jsPDF('landscape'); 
        doc.setFontSize(9); 
        // Datos del paciente
        const datosPaciente = [
            ['Paciente', patient],
            ['Fecha de Nacimiento', dayOfBirth],
            ['Correo Electrónico', email]
        ];
        // Tabla de datos del paciente
        autoTable(doc, {
            head: [['Datos de Paciente', '']],
            body: datosPaciente,
            startY: 10,
            theme: 'striped',
            styles: {
                fontSize: 9,
            }
        });
        // Espacio entre tablas
        let y = doc.lastAutoTable.finalY + 5;
        // Diagnóstico
        const diagnostico = [
            ['Diagnóstico', diagnostic]
        ];
        // Tabla de diagnóstico
        autoTable(doc, {
            head: [['Procedimientos', '']],
            body: diagnostico,
            startY: y,
            theme: 'striped',
            styles: {
                fontSize: 9,
            }
        });
        // Espacio entre tablas
        y = doc.lastAutoTable.finalY + 5;
        // Insumos
        const headers = ["Nombre del Artículo", "Descripción del Artículo", "Costo del Artículo"];
        const rows = seleccionados.map(insumo => [
            insumo.numeroDelArticulo,
            insumo.descripcionDelArticulo,
            insumo.pacIntCOL
        ]);
        // Tabla de insumos
        autoTable(doc, {
            head: [headers],
            body: rows,
            startY: y,
            theme: 'striped',
            styles: {
                fontSize: 9,
            },
            columnStyles: {
                0: { halign: 'left' },
                1: { halign: 'left' },
                2: { halign: 'right' }
            }
        });
        // Espacio entre tablas
        y = doc.lastAutoTable.finalY + 5;
        // Cálculo de totales
        const totalSinImpuesto = seleccionados.reduce((acc, insumo) => {
            const precio = insumo.pacIntCOL
                ? typeof insumo.pacIntCOL === "string"
                    ? parseFloat(insumo.pacIntCOL.replace(/\s/g, "").replace(",", ".")) || 0
                    : parseFloat(insumo.pacIntCOL) || 0
                : 0;
            return acc + precio;
        }, 0);
        const impuesto = totalSinImpuesto * 0.04;
        const totalConImpuesto = totalSinImpuesto + impuesto;
        // Tabla de costos totales
        const totals = [
            ['Total sin Impuesto', '', `$${totalSinImpuesto.toFixed(2)}`],
            ['Impuesto (4%)', '', `$${impuesto.toFixed(2)}`],
            ['Total con Impuesto', '', `$${totalConImpuesto.toFixed(2)}`]
        ];
        autoTable(doc, {
            head: [['Costos Totales', '', '']],
            body: totals,
            startY: y,
            theme: 'striped',
            styles: {
                fontSize: 9,
            },
            columnStyles: {
                0: { halign: 'right' },
                1: { halign: 'right' },
                2: { halign: 'right' }
            }
        });
        // Espacio entre tablas
        y = doc.lastAutoTable.finalY + 5;
        // Costos con seguro si se requiere
        if (requiereSeguro) {
            const totalConSeguro = totalConImpuesto * (porcentajeAPagar / 100);
            const seguroDetails = [
                ['Porcentaje a Pagar (%)', '', `${porcentajeAPagar}%`],
                ['Total con Seguro', '', `$${totalConSeguro.toFixed(2)}`]
            ];
            autoTable(doc, {
                head: [['Detalles del Seguro', '', '']],
                body: seguroDetails,
                startY: y,
                theme: 'striped',
                styles: {
                    fontSize: 9,
                },
                columnStyles: {
                    0: { halign: 'left' },
                    1: { halign: 'left' },
                    2: { halign: 'right' }
                }
            });
        }
        // Generar y guardar el PDF
        doc.save("cotizacion.pdf");
    };

  return (
    <button
      type="submit"
      className="btn btn-outline-primary mt-2 mb-2 m-1"
      onClick={generarPDF}
      disabled={seleccionados.length === 0}
    >
      Generar PDF
    </button>
  );
}
