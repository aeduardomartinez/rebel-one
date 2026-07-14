import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function DetalleFactura() {
  const [searchParams, setSearchParams] = useSearchParams();
  const invoiceId = searchParams.get('id');
  const [pdfUrl, setPdfUrl] = useState(null);

  // Mock data - En el futuro esto vendrá del Backend
  const mockData = {
    number: 'FEIP-0847',
    customerName: 'Constructora Andina S.A.S',
    customerNit: '900.234.567-1',
    date: '2026-06-05',
    dueDate: '2026-07-05',
    status: 'emitida',
    items: [
      { ref: 'SRV-002', description: 'Auditoría financiera', qty: 3, price: 2800000, desc: '0%', iva: '19%', total: 8400000 }
    ],
    subtotal: 8400000,
    tax: 1596000,
    total: 9996000
  };

  const handleBack = () => {
    searchParams.delete('action');
    searchParams.delete('id');
    setSearchParams(searchParams);
  };

  const generatePDF = (data) => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    
    // Configuración de colores
    const primaryColor = [0, 88, 190]; // #0058be
    const textColor = [60, 60, 60];
    
    // Header
    doc.setFillColor(...primaryColor);
    doc.rect(14, 14, 12, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('R1', 16, 22);

    // Datos Emisor
    doc.setTextColor(...textColor);
    doc.setFontSize(12);
    doc.text('Rebel One SAS', 30, 19);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('NIT: 900.123.456-7', 30, 24);
    doc.text('Avenida Principal #123, Bogotá D.C.', 30, 28);

    // Datos Documento (Derecha)
    doc.setTextColor(...primaryColor);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('FACTURA ELECTRÓNICA DE VENTA', 200, 19, { align: 'right' });
    doc.setTextColor(...textColor);
    doc.setFontSize(14);
    doc.text(data.number, 200, 26, { align: 'right' });
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha Emisión: ${data.date}`, 200, 31, { align: 'right' });
    doc.text(`Vencimiento: ${data.dueDate}`, 200, 35, { align: 'right' });

    // Línea separadora
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(14, 40, 200, 40);

    // Datos Cliente
    doc.setTextColor(...primaryColor);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('DATOS DEL CLIENTE', 14, 48);
    
    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    doc.text(data.customerName, 14, 53);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`NIT / CC: ${data.customerNit}`, 14, 58);

    // Tabla de ítems usando jspdf-autotable
    const tableData = data.items.map(item => [
      item.ref || '',
      item.description,
      item.qty.toString(),
      `$ ${item.price.toLocaleString('es-CO')}`,
      item.desc || '0%',
      item.iva || '19%',
      `$ ${item.total.toLocaleString('es-CO')}`
    ]);

    autoTable(doc, {
      startY: 65,
      head: [['Ref / Cod', 'Descripción', 'Cant.', 'Precio Unit.', 'Desc.', 'IVA%', 'Total']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: primaryColor, textColor: 255, fontSize: 8, fontStyle: 'bold', halign: 'left' },
      bodyStyles: { fontSize: 8, textColor: textColor },
      columnStyles: {
        0: { halign: 'left', cellWidth: 20 },
        1: { halign: 'left' },
        2: { halign: 'center', cellWidth: 15 },
        3: { halign: 'left', cellWidth: 25 },
        4: { halign: 'center', cellWidth: 15 },
        5: { halign: 'center', cellWidth: 15 },
        6: { halign: 'left', cellWidth: 30 }
      },
      margin: { left: 14, right: 14 }
    });

    // Totales
    const finalY = doc.lastAutoTable.finalY + 10;
    
    // QR Code Mock
    doc.setFillColor(0, 0, 0);
    // Draw a mock QR using small squares
    for(let i=0; i<4; i++){
      for(let j=0; j<4; j++){
        if((i+j)%2 === 0) doc.rect(14 + (i*4), finalY + (j*4), 4, 4, 'F');
      }
    }
    
    doc.setFontSize(7);
    doc.setTextColor(0,0,0);
    doc.setFont('helvetica', 'bold');
    doc.text('CUFE / Código de Validación:', 34, finalY + 4);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.text('a384f7b2c9d1e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0', 34, finalY + 8);

    doc.setFontSize(9);
    doc.text('Subtotal:', 140, finalY);
    doc.text(`$ ${data.subtotal.toLocaleString('es-CO')}`, 196, finalY, { align: 'right' });
    
    doc.text('Impuestos:', 140, finalY + 6);
    doc.text(`$ ${data.tax.toLocaleString('es-CO')}`, 196, finalY + 6, { align: 'right' });
    
    doc.setDrawColor(...primaryColor);
    doc.line(140, finalY + 9, 196, finalY + 9);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    doc.setFontSize(11);
    doc.text('TOTAL:', 140, finalY + 14);
    doc.text(`$ ${data.total.toLocaleString('es-CO')}`, 196, finalY + 14, { align: 'right' });

    doc.setFontSize(5);
    doc.setTextColor(150, 150, 150);
    doc.setFont('helvetica', 'normal');
    doc.text('SON: NUEVE MILLONES NOVECIENTOS NOVENTA Y SEIS MIL PESOS M/CTE', 140, finalY + 18);

    // Retornar la URL del Blob
    return doc;
  };

  useEffect(() => {
    // Generar el PDF cuando el componente se monta
    const doc = generatePDF(mockData);
    const pdfBlobUrl = doc.output('bloburl');
    setPdfUrl(pdfBlobUrl);

    // Cleanup para liberar memoria
    return () => {
      URL.revokeObjectURL(pdfBlobUrl);
    };
  }, [invoiceId]);

  const handleDownloadPDF = () => {
    const doc = generatePDF(mockData);
    doc.save(`${mockData.number}.pdf`);
  };

  const formatCurrency = (val) => '$ ' + val.toLocaleString('es-CO');

  return (
    <div className="page-container fade-in">
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="breadcrumb" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--color-primary)', cursor: 'pointer' }} onClick={handleBack}>Ingresos</span> / <span>Detalle {mockData.number}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-primary btn-sm" onClick={() => setSearchParams({ tab: 'notas', action: 'new_note', invoiceId: invoiceId })}>Aplicar nota credito</button>
          <button className="btn btn-secondary btn-sm" onClick={() => pdfUrl && window.open(pdfUrl)}>Descargar PDF</button>
          <button className="btn btn-ghost btn-sm" onClick={handleBack}>Volver</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Column: Resumen */}
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '12px' }}>Resumen del Documento</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', marginBottom: '16px' }}>
            <div><strong>Número:</strong> {mockData.number}</div>
            <div><strong>Cliente:</strong> {mockData.customerName}</div>
            <div><strong>Identificación:</strong> {mockData.customerNit}</div>
            <div><strong>Fecha Emisión:</strong> {mockData.date}</div>
            {mockData.dueDate && <div><strong>Fecha Vencimiento:</strong> {mockData.dueDate}</div>}
            <div><strong>Estado:</strong> <span className="chip chip-info">{mockData.status}</span></div>
          </div>

          <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Detalle de Ítems</h4>
          <table className="data-table" style={{ fontSize: '12px', width: '100%', marginBottom: '24px' }}>
            <thead>
              <tr>
                <th>Descripción</th>
                <th style={{ textAlign: 'right' }}>Cant</th>
                <th style={{ textAlign: 'right' }}>Precio</th>
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {mockData.items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.description}</td>
                  <td style={{ textAlign: 'right' }}>{item.qty}</td>
                  <td style={{ textAlign: 'right' }}>{formatCurrency(item.price)}</td>
                  <td style={{ textAlign: 'right' }}>{formatCurrency(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px', color: 'var(--color-primary)' }}>
            <span>Total:</span>
            <span>{formatCurrency(mockData.total)}</span>
          </div>
        </div>

        {/* Right Column: PDF Native Viewer */}
        <div className="card" style={{ padding: '10px', height: '550px' }}>
          {pdfUrl ? (
            <iframe 
              src={`${pdfUrl}#navpanes=0&view=FitH`} 
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }} 
              title="Visor PDF"
            />
          ) : (
            <div style={{ margin: 'auto', color: 'var(--text-muted)' }}>Generando PDF...</div>
          )}
        </div>

      </div>
    </div>
  );
}
