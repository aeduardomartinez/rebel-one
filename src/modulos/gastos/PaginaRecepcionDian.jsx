import React, { useState } from 'react';
import { createPortal } from 'react-dom';

export default function PaginaRecepcionDian() {
  const emailRadian = 'empresa@recepcion.rebelone.co';

  const [facturas] = useState([
    {
      id: 1,
      proveedor: 'Claro Colombia (Comunicaciones)',
      numero: 'FE-990812',
      fecha: '2 de jun de 2026',
      total: 450000,
      status: 'Pendiente Acuse',
      events: { acuse: false, recibo: false, aceptacion: false },
      nextAction: '1. Dar Acuse',
      isNeutral: true
    },
    {
      id: 2,
      proveedor: 'Papelería y Suministros El Triunfo',
      numero: 'FAC-10029',
      fecha: '4 de jun de 2026',
      total: 120000,
      status: 'Acusada (Pendiente Recibo)',
      events: { acuse: true, recibo: false, aceptacion: false },
      nextAction: '2. Confirmar Recibo',
      isNeutral: false
    }
  ]);

  const [showToast, setShowToast] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailRadian);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      {showToast && createPortal(
        <div className="toast-notification fade-in">
          <div className="toast-icon" style={{ background: '#34d399' }}></div>
          <span className="toast-message" style={{ color: 'var(--text-primary)', fontSize: '14px' }}>
            Email de recepción RADIAN copiado al portapapeles.
          </span>
        </div>,
        document.body
      )}
      <div className="page-container fade-in">
        {/* Header */}
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <div className="page-header-left">
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px', letterSpacing: '-0.5px' }}>
            Buzón RADIAN — Recepción Electrónica
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
            Acepte, rechace o reclame facturas electrónicas emitidas por sus proveedores ante la DIAN.
          </p>
        </div>
      </div>

      {/* Email Card */}
      <div className="card" style={{ padding: '24px', marginBottom: 'var(--space-5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>
            EMAIL ÚNICO DE RECEPCIÓN RADIAN
          </span>
          <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-primary)' }}>
            {emailRadian}
          </span>
        </div>
        <button 
          className="btn" 
          style={{ background: 'white', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}
          onClick={copyToClipboard}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--text-muted)' }}>content_copy</span>
          Copiar correo
        </button>
      </div>

      {/* Table Card */}
      <div className="card" style={{ padding: '0' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>Facturas Pendientes en el RADIAN</h2>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '22%', textAlign: 'left', padding: '12px 24px' }}>PROVEEDOR</th>
                <th style={{ width: '13%', textAlign: 'left', padding: '12px 16px' }}>NÚMERO FACTURA</th>
                <th style={{ width: '13%', textAlign: 'left', padding: '12px 16px' }}>FECHA RECEPCIÓN</th>
                <th style={{ width: '13%', textAlign: 'left', padding: '12px 16px' }}>TOTAL</th>
                <th style={{ width: '24%', textAlign: 'left', padding: '12px 16px' }}>ESTADO DE EVENTOS (DIAN)</th>
                <th style={{ width: '15%', textAlign: 'right', padding: '12px 24px' }}>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((fac) => (
                <tr key={fac.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 24px' }}>
                    {fac.proveedor.includes('(') ? (
                      <>
                        <span style={{ fontWeight: '600', color: 'var(--text-primary)', display: 'block' }}>{fac.proveedor.split('(')[0].trim()}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>({fac.proveedor.split('(')[1]}</span>
                      </>
                    ) : (
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{fac.proveedor}</span>
                    )}
                  </td>
                  <td className="cell-bold" style={{ padding: '16px', fontFamily: 'var(--font-family-mono)', fontWeight: 'bold' }}>{fac.numero}</td>
                  <td className="cell-muted" style={{ padding: '16px' }}>{fac.fecha}</td>
                  <td className="cell-amount" style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold', fontFamily: 'var(--font-family-mono)' }}>
                    <span style={{ color: 'var(--text-muted)', marginRight: '4px' }}>$</span>
                    <span>{fac.total.toLocaleString('es-CO')}</span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                      <span className={`chip ${fac.isNeutral ? 'chip-neutral' : 'chip-warning'}`}>
                        <span className="dot" style={{ background: fac.isNeutral ? '#94a3b8' : '#f59e0b' }}></span>
                        {fac.status}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'var(--text-muted)', fontWeight: '500' }}>
                        <span style={{ color: fac.events.acuse ? '#10b981' : '#94a3b8' }}>• Acuse</span>
                        <span style={{ color: '#cbd5e1' }}>|</span>
                        <span style={{ color: fac.events.recibo ? '#10b981' : '#94a3b8' }}>• Recibo</span>
                        <span style={{ color: '#cbd5e1' }}>|</span>
                        <span style={{ color: fac.events.aceptacion ? '#10b981' : '#94a3b8' }}>• Aceptación</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button 
                        className="btn"
                        style={{ background: 'white', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '12px', fontWeight: '600', padding: '6px 12px' }}
                      >
                        {fac.nextAction}
                      </button>
                      <button 
                        className="btn"
                        style={{ background: 'white', border: '1px solid #fca5a5', color: '#ef4444', fontSize: '12px', fontWeight: '600', padding: '6px 12px' }}
                      >
                        Rechazar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
}
