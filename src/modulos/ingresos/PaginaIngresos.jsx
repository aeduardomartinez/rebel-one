import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import InvoiceForm from './FormularioFactura';
import CreditNoteForm from './FormularioNotaCredito';
import InvoiceDetail from './DetalleFactura';
import InvoiceToolbar from './BarraHerramientasFactura';
import CustomerEditModal from './ModalEditarCliente';
import InvoiceActionDropdown from './MenuAccionesFactura';

export default function PaginaIngresos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'facturas';
  const action = searchParams.get('action');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceFilter, setInvoiceFilter] = useState('todas');
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    const handleDocumentClick = () => {
      if (openDropdownId !== null) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [openDropdownId]);

  const invoices = [
    { id: 1, number: 'FEIP-0847', customer: 'Constructora Andina S.A.S', date: '3 de jun de 2026', due: '3 de jul de 2026', docStatus: 'borrador', dianStatus: 'Sin envío', total: 9996000, isActive: true },
    { id: 2, number: 'FEIP-0846', customer: 'Inversiones Torres & Co.', date: '31 de may de 2026', due: '30 de jun de 2026', docStatus: 'emitida', dianStatus: 'Pendiente', total: 5400000, isActive: false },
    { id: 3, number: 'FEIP-0845', customer: 'Alimentos y Bebidas del Valle', date: '28 de may de 2026', due: '28 de jun de 2026', docStatus: 'pagada', dianStatus: 'Aprobada', total: 1250000, isActive: false },
    { id: 4, number: 'FEIP-0844', customer: 'Textiles Medina S.A.', date: '25 de may de 2026', due: '25 de jun de 2026', docStatus: 'pagada', dianStatus: 'Aprobada', total: 8900000, isActive: false },
    { id: 5, number: 'FEIP-0840', customer: 'Distribuidora El Pino', date: '10 de abr de 2026', due: '10 de may de 2026', docStatus: 'emitida', dianStatus: 'Pendiente', total: 4200000, isActive: false }
  ];

  const filteredInvoices = invoiceFilter === 'todas'
    ? invoices
    : invoices.filter(inv => {
        if (invoiceFilter === 'pendiente_dian') return inv.dianStatus === 'Pendiente';
        if (invoiceFilter === 'sin_envio') return inv.dianStatus === 'Sin envío';
        if (invoiceFilter === 'en_proceso') return inv.dianStatus === 'En proceso';
        if (invoiceFilter === 'vencidas') return inv.due.includes('may');
        return true;
      });

  const invoiceFilterOptions = [
    { id: 'todas', label: 'Todas', count: null },
    { id: 'pendiente_dian', label: 'Pendiente DIAN', count: invoices.filter(inv => inv.dianStatus === 'Pendiente').length, color: '#ef4444', bg: '#fee2e2' },
    { id: 'sin_envio', label: 'Sin envío', count: invoices.filter(inv => inv.dianStatus === 'Sin envío').length, color: '#d97706', bg: '#fef3c7' },
    { id: 'en_proceso', label: 'En proceso', count: invoices.filter(inv => inv.dianStatus === 'En proceso').length, color: '#3b82f6', bg: '#eff6ff' },
    { id: 'vencidas', label: 'Vencidas', count: invoices.filter(inv => inv.due.includes('may')).length, color: '#ef4444', bg: '#fee2e2' }
  ];

  const quotes = [
    { id: 1, number: 'COT-001', customer: 'Constructora Andina S.A.S', date: '3 de jun de 2026', validUntil: '3 de jul de 2026', status: 'Enviada', subtotal: 5200000, total: 6188000, isActive: false },
    { id: 2, number: 'COT-002', customer: 'Inversiones Torres & Co.', date: '15 de jun de 2026', validUntil: '15 de jul de 2026', status: 'Borrador', subtotal: 420168, total: 500000, isActive: false },
    { id: 3, number: 'COT-003', customer: 'Alimentos y Bebidas del Valle', date: '18 de jun de 2026', validUntil: '18 de jul de 2026', status: 'Aceptada', subtotal: 840336, total: 1000000, isActive: false }
  ];

  const receipts = [
    { id: 1, number: 'RC-0412', date: '1 de jun de 2026', customer: 'Textiles Medina S.A.', relatedInvoice: 'FEIP-0844', amount: 5600000 }
  ];

  const creditNotes = [
    { id: 1, number: 'NC-001', date: '4 de jun de 2026', customer: 'Inversiones Torres & Co.', affectedInvoice: 'FEIP-0845', amount: -150000 }
  ];

  const remissions = [
    { id: 1, number: 'REM-001', date: '3 de jun de 2026', customer: 'Distribuidora El Pino Ltda.', amount: 1200000, status: 'pendiente' }
  ];

  const getDianStatusClass = (status) => {
    switch (status) {
      case 'Aprobada': return 'status-success';
      case 'Sin envío': return 'status-warning';
      default: return 'status-neutral outline';
    }
  };

  const getQuoteStatusClass = (status) => {
    switch (status) {
      case 'Aceptada': return 'status-success';
      case 'Enviada': return 'status-info';
      default: return 'status-warning';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'facturas':
        return (
          <div className="card" style={{ padding: 0 }}>
            <InvoiceToolbar activeTab={activeTab} />
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th className="col-check"><input type="checkbox" /></th>
                    <th>NÚMERO</th>
                    <th>CLIENTE</th>
                    <th>FECHA</th>
                    <th>VENCIMIENTO</th>
                    <th style={{ textAlign: 'center' }}>ESTADO DOC.</th>
                    <th style={{ textAlign: 'center' }}>ESTADO DIAN</th>
                    <th style={{ textAlign: 'left' }}>TOTAL</th>
                    <th style={{ textAlign: 'center' }}>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map(inv => (
                      <tr key={inv.id} className={inv.isActive ? 'active' : ''}>
                        <td className="col-check"><input type="checkbox" /></td>
                        <td style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                          <span
                            style={{ cursor: 'pointer', color: 'var(--color-primary)', textDecoration: 'none' }}
                            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                            onClick={(e) => {
                              e.preventDefault();
                              setSearchParams({ tab: activeTab, action: 'view', id: inv.id });
                            }}
                          >
                            {inv.number}
                          </span>
                        </td>
                        <td style={{ color: 'var(--text-primary)' }}>
                          <span
                            style={{ cursor: 'pointer', textDecoration: 'none' }}
                            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                            onClick={() => setEditingCustomer(inv)}
                          >
                            {inv.customer}
                          </span>
                        </td>
                        <td className="cell-muted">{inv.date}</td>
                        <td className={inv.due.includes('may') ? "text-danger font-semibold" : "font-semibold"}>{inv.due}</td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`chip ${inv.docStatus === 'emitida' ? 'chip-info' :
                              inv.docStatus === 'pagada' ? 'chip-success' :
                                inv.docStatus === 'borrador' ? 'chip-neutral' :
                                  inv.docStatus === 'anulada' ? 'chip-danger' : 'chip-neutral'
                            }`}>{inv.docStatus}</span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`chip ${inv.dianStatus === 'Aprobada' ? 'chip-success' : inv.dianStatus === 'Sin envío' ? 'chip-warning' : inv.dianStatus === 'Pendiente' ? 'chip-danger' : 'chip-neutral'}`}>
                            {inv.dianStatus}
                          </span>
                        </td>
                        <td style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>
                          <span style={{ color: 'var(--text-muted)', marginRight: '4px' }}>$</span>
                          <span style={{ fontWeight: '500' }}>{inv.total.toLocaleString('es-CO')}</span>
                        </td>
                        <td style={{ textAlign: 'center', position: 'relative' }}>
                          <button
                            className="actions-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(openDropdownId === inv.id ? null : inv.id);
                            }}
                          >
                            ...
                          </button>

                          {openDropdownId === inv.id && (
                            <InvoiceActionDropdown
                              invoice={inv}
                              activeTab={activeTab}
                              onClose={() => setOpenDropdownId(null)}
                            />
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No se encontraron facturas con este estado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'cotizaciones':
        return (
          <>
            <div className="card" style={{ height: '60px', marginBottom: 'var(--space-4)', padding: '0 20px', borderRadius: 'var(--radius-full)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>Listado de propuestas comerciales emitidas.</span>
              <button className="btn btn-primary btn-sm" onClick={() => setSearchParams({ tab: activeTab, action: 'new' })}>
                + Nueva Cotización
              </button>
            </div>

            <div className="card" style={{ padding: 0 }}>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th className="rounded-left">NÚMERO</th>
                      <th>FECHA</th>
                      <th>CLIENTE</th>
                      <th style={{ textAlign: 'left' }}>TOTAL</th>
                      <th style={{ textAlign: 'center' }}>ESTADO</th>
                      <th className="rounded-right" style={{ textAlign: 'right' }}>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map(quote => (
                      <tr key={quote.id}>
                        <td className="cell-bold" style={{ fontFamily: 'var(--font-family-mono)' }}>{quote.number}</td>
                        <td>{quote.date}</td>
                        <td>{quote.customer}</td>
                        <td className="cell-amount" style={{ textAlign: 'left' }}>
                          <span style={{ color: 'var(--text-muted)', marginRight: '4px' }}>$</span>
                          <span style={{ fontWeight: '500' }}>{quote.total.toLocaleString('es-CO')}</span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`status-badge ${getQuoteStatusClass(quote.status)}`}>
                            <span className="dot"></span>{quote.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', alignItems: 'center' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-primary)', fontSize: '13px', padding: 0 }}>
                              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--text-muted)' }}>description</span> 
                              PDF
                            </button>
                            <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '13px', height: 'auto', minHeight: '28px', borderRadius: '6px' }}>
                              Facturar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case 'pagos':
        return (
          <>
            <div className="card" style={{ height: '60px', marginBottom: 'var(--space-4)', padding: '0 20px', borderRadius: 'var(--radius-full)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>Comprobantes de ingreso y recaudo de cartera.</span>
              <button className="btn btn-primary btn-sm" onClick={() => setSearchParams({ tab: activeTab, action: 'new' })}>
                + Registrar Recibo
              </button>
            </div>

            <div className="card" style={{ padding: 0 }}>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th className="rounded-left">NÚMERO</th>
                      <th>FECHA</th>
                      <th>CLIENTE</th>
                      <th>FACTURA RELACIONADA</th>
                      <th className="rounded-right" style={{ textAlign: 'left' }}>MONTO RECAUDADO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipts.map(receipt => (
                      <tr key={receipt.id}>
                        <td className="cell-bold" style={{ fontFamily: 'var(--font-family-mono)' }}>{receipt.number}</td>
                        <td>{receipt.date}</td>
                        <td>{receipt.customer}</td>
                        <td><a href="#" className="cell-link">{receipt.relatedInvoice}</a></td>
                        <td className="cell-amount cell-success" style={{ textAlign: 'left' }}>
                          <span style={{ color: 'var(--color-success)', opacity: 0.7, marginRight: '4px' }}>$</span>
                          <span style={{ fontWeight: '500' }}>{receipt.amount.toLocaleString('es-CO')}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case 'notas':
        return (
          <>
            <div className="card" style={{ height: '60px', marginBottom: 'var(--space-4)', padding: '0 20px', borderRadius: 'var(--radius-full)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>Notas de ajuste, devoluciones o cobros adicionales sobre facturas.</span>
              <button className="btn btn-primary btn-sm" onClick={() => setSearchParams({ tab: activeTab, action: 'new_note' })}>
                + Generar Nota
              </button>
            </div>

            <div className="card" style={{ padding: 0 }}>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th className="rounded-left">NÚMERO</th>
                      <th>FECHA</th>
                      <th>CLIENTE</th>
                      <th>FACTURA AFECTADA</th>
                      <th className="rounded-right" style={{ textAlign: 'left' }}>MONTO NOTA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creditNotes.map(note => (
                      <tr key={note.id}>
                        <td className="cell-bold" style={{ fontFamily: 'var(--font-family-mono)' }}>{note.number}</td>
                        <td>{note.date}</td>
                        <td>{note.customer}</td>
                        <td>{note.affectedInvoice}</td>
                        <td className="cell-amount" style={{ textAlign: 'left' }}>
                          <span style={{ color: 'var(--color-danger)', opacity: 0.7, marginRight: '4px' }}>-$</span>
                          <span style={{ fontWeight: '500', color: 'var(--color-danger)' }}>{Math.abs(note.amount).toLocaleString('es-CO')}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case 'remisiones':
        return (
          <>
            <div className="card" style={{ height: '60px', marginBottom: 'var(--space-4)', padding: '0 20px', borderRadius: 'var(--radius-full)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>Remisiones de entrega de productos en tránsito.</span>
              <button className="btn btn-primary btn-sm" onClick={() => setSearchParams({ tab: activeTab, action: 'new' })}>
                + Nueva Remisión
              </button>
            </div>

            <div className="card" style={{ padding: 0 }}>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th className="rounded-left">NÚMERO</th>
                      <th>FECHA</th>
                      <th>CLIENTE</th>
                      <th style={{ textAlign: 'left' }}>MONTO</th>
                      <th style={{ textAlign: 'center' }}>ESTADO</th>
                      <th className="rounded-right" style={{ textAlign: 'right' }}>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {remissions.map(rem => (
                      <tr key={rem.id}>
                        <td className="cell-bold" style={{ fontFamily: 'var(--font-family-mono)' }}>{rem.number}</td>
                        <td>{rem.date}</td>
                        <td>{rem.customer}</td>
                        <td className="cell-amount" style={{ textAlign: 'left' }}>
                          <span style={{ color: 'var(--text-muted)', marginRight: '4px' }}>$</span>
                          <span style={{ fontWeight: '500' }}>{rem.amount.toLocaleString('es-CO')}</span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className="chip chip-warning">
                            {rem.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', alignItems: 'center' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-primary)', fontSize: '13px', padding: 0 }}>
                              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--text-muted)' }}>description</span> 
                              PDF
                            </button>
                            <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '13px', height: 'auto', minHeight: '28px', borderRadius: '6px' }}>
                              Facturar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  if (action === 'new') {
    return <InvoiceForm />;
  }

  if (action === 'new_note') {
    return <CreditNoteForm />;
  }

  if (action === 'view') {
    return <InvoiceDetail />;
  }

  return (
    <>
      <div className="page-container fade-in">
        {/* Header */}
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div className="page-header-left">
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.5px' }}>Ingresos & Ventas</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>Facturación electrónica, cotizaciones, remisiones de despacho y recaudo de caja.</p>
          </div>
          <div className="page-header-actions" style={{ display: 'flex', gap: '8px' }}>
            <button className="btn-export">
              <span className="material-symbols-outlined">download</span>
              Exportar Reporte
            </button>
          </div>
      </div>

      {/* Main Tabs */}
      <div className="tabs" style={{ marginBottom: 'var(--space-5)', background: 'transparent', padding: '0', display: 'inline-flex', gap: '4px' }}>
        {[
          { id: 'facturas', label: 'Facturas de venta' },
          { id: 'cotizaciones', label: 'Cotizaciones' },
          { id: 'pagos', label: 'Pagos recibidos' },
          { id: 'notas', label: 'Notas crédito' },
          { id: 'remisiones', label: 'Remisiones' }
        ].map(tab => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setSearchParams({ tab: tab.id })}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {activeTab === 'facturas' && (
        <div className="card" id="invoice-state-tabs" style={{ height: '60px', marginBottom: 'var(--space-4)', padding: '0 20px', borderRadius: 'var(--radius-full)', display: 'flex', gap: '8px', alignItems: 'center' }}>
          {invoiceFilterOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setInvoiceFilter(opt.id)}
              className={`tab ${invoiceFilter === opt.id ? 'active' : ''}`}
              style={{ 
                border: 'none', 
                padding: '8px 16px', 
                fontWeight: '600', 
                cursor: 'pointer', 
                color: invoiceFilter === opt.id ? 'var(--color-primary)' : 'var(--text-primary)', 
                backgroundColor: invoiceFilter === opt.id ? '#ffffff' : 'transparent', 
                borderRadius: '8px',
                boxShadow: invoiceFilter === opt.id ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{opt.label}</span>
              {opt.count !== null && (
                <span style={{ 
                  backgroundColor: opt.bg || '#f1f5f9',
                  color: opt.color || '#64748b',
                  padding: '2px 8px', 
                  fontSize: '12px', 
                  fontWeight: '700', 
                  borderRadius: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{ fontSize: '10px' }}>●</span>
                  {opt.count}
                </span>
              )}
            </button>
          ))}
          <button className="btn btn-primary btn-sm" onClick={() => setSearchParams({ tab: activeTab, action: 'new' })} style={{ marginLeft: 'auto' }}>
            + Nueva Factura
          </button>
        </div>
      )}

      {/* Table Content */}
      {renderTabContent()}

      {/* Modal de Nueva Factura */}
      {isModalOpen && (
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Nueva Factura de Venta</h3>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">CLIENTE *</label>
                <select className="form-control">
                  <option>Seleccione un cliente...</option>
                  <option>Inversiones Torres & Co.</option>
                  <option>Alimentos y Bebidas del Valle</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">FECHA *</label>
                  <input type="date" className="form-control" defaultValue="2026-06-18" />
                </div>
                <div className="form-group">
                  <label className="form-label">VENCIMIENTO *</label>
                  <input type="date" className="form-control" defaultValue="2026-07-18" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={() => setIsModalOpen(false)}>Crear Factura</button>
            </div>
          </div>
        </div>
      )}

    </div>
    
    <CustomerEditModal
      customer={editingCustomer}
      onClose={() => setEditingCustomer(null)}
    />
  </>
  );
}
