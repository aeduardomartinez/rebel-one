import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProviderEditModal from './ModalEditarProveedor';
import ExpenseForm from './FormularioGasto';
import PaginaRecepcionDian from './PaginaRecepcionDian';

export default function PaginaGastos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'facturas';
  const action = searchParams.get('action');
  const [editingProvider, setEditingProvider] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);

  if (activeTab === 'recepcion_dian') {
    return <PaginaRecepcionDian />;
  }

  const handlePagarClick = (id) => {
    setActiveTooltip(id);
    setTimeout(() => {
      setActiveTooltip(null);
    }, 4000);
  };

  const renderGlobalToast = () => {
    if (!activeTooltip) return null;
    return (
      <div className="toast-notification fade-in">
        <div className="toast-icon"></div>
        <span className="toast-message">
          Factura pagada, comprobante de egreso y asiento contable registrados.
        </span>
      </div>
    );
  };

  const expenses = [
    { id: 1, number: 'FC-2024', date: '2 de jun de 2026', provider: 'Suministros Técnicos S.A.', type: 'Factura de Compra', status: 'pagada', total: 1240000 },
    { id: 2, number: 'FC-2023', date: '2 de jun de 2026', provider: 'Suministros Técnicos S.A.', type: 'Factura de Compra', status: 'pendiente', total: 8760000 },
    { id: 3, number: 'FC-2022', date: '6 de jun de 2026', provider: 'Importadora del Pacífico', type: 'Factura de Compra', status: 'pendiente', total: 34500000 },
    { id: 4, number: 'FC-2021', date: '1 de jun de 2026', provider: 'Materiales La Construcción', type: 'Factura de Compra', status: 'pendiente', total: 4200000 },
    { id: 5, number: 'FC-2020', date: '1 de jun de 2026', provider: 'Distribuidora El Pino Ltda.', type: 'Factura de Compra', status: 'pagada', total: 1890000 },
    { id: 6, number: 'FC-2019', date: '15 de may de 2026', provider: 'Materiales La Construcción', type: 'Factura de Compra', status: 'pendiente', total: 67800000 },
    { id: 7, number: 'FC-2018', date: '20 de may de 2026', provider: 'Suministros Técnicos S.A.', type: 'Factura de Compra', status: 'pagada', total: 3420000 },
  ];

  const supportDocs = [
    { id: 1, number: 'DSE-0130', date: '28 de may de 2026', provider: 'Carlos Pérez', type: 'Documento Soporte', status: 'pagada', total: 500000 },
  ];

  const purchaseOrders = [
    { id: 1, number: 'OC-001', date: '1 de jun de 2026', provider: 'Suministros Técnicos S.A.', status: 'pendiente', total: 5000000 },
  ];

  const payments = [
    { id: 1, number: 'CE-0089', date: '2 de jun de 2026', provider: 'Suministros Técnicos S.A.', relatedInvoice: 'FC-2024', status: 'CONCILIADO', amount: 1240000 },
  ];

  const adjustments = [];

  const renderTabContent = () => {
    if (action === 'new') {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
          <ExpenseForm />
        </div>
      );
    }

    switch (activeTab) {
      case 'facturas':
        return (
          <>
            <div className="card" style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>Facturas de proveedores y cuentas de cobro.</span>
              <button className="btn btn-primary btn-sm" onClick={() => setSearchParams({ tab: activeTab, action: 'new' })}>
                + Registrar Gasto
              </button>
            </div>
            
            <div className="card" style={{ padding: 0 }}>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ width: '13%', textAlign: 'left', padding: '12px 16px' }}>DOCUMENTO</th>
                      <th style={{ width: '13%', textAlign: 'left', padding: '12px 16px' }}>FECHA</th>
                      <th style={{ width: '22%', textAlign: 'left', padding: '12px 16px' }}>PROVEEDOR</th>
                      <th style={{ width: '13%', textAlign: 'left', padding: '12px 16px' }}>TIPO</th>
                      <th style={{ width: '13%', textAlign: 'center', padding: '12px 16px' }}>ESTADO</th>
                      <th style={{ width: '13%', textAlign: 'left', padding: '12px 16px' }}>TOTAL</th>
                      <th style={{ width: '13%', textAlign: 'center', padding: '12px 16px' }}>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense, index) => {
                      return (
                        <tr key={expense.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td className="cell-bold" style={{ padding: '12px 16px', fontFamily: 'var(--font-family-mono)', fontWeight: 'bold' }}>{expense.number}</td>
                          <td className="cell-muted" style={{ padding: '12px 16px' }}>{expense.date}</td>
                          <td style={{ padding: '12px 16px', color: 'var(--color-primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '500' }} onClick={() => setEditingProvider(expense)}>{expense.provider}</td>
                          <td style={{ padding: '12px 16px' }}>
                            <span className="chip chip-doc">{expense.type}</span>
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'center', position: 'relative' }}>
                            <span className={`chip ${expense.status === 'pagada' ? 'chip-success' : 'chip-warning'}`}>
                              <span className="dot" style={{ background: expense.status === 'pagada' ? '#10b981' : '#f59e0b' }}></span>
                              {expense.status}
                            </span>
                          </td>
                          <td className="cell-amount" style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 'bold', fontFamily: 'var(--font-family-mono)' }}>
                            <span style={{ color: 'var(--text-muted)', marginRight: '4px' }}>$</span>
                            <span>{expense.total.toLocaleString('es-CO')}</span>
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <button 
                              className="btn btn-primary btn-sm"
                              style={{ padding: '6px 16px', fontSize: '13px', height: 'auto', minHeight: '28px', borderRadius: '4px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                              onClick={() => handlePagarClick(`expense-${expense.id}`)}
                            >
                              Pagar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case 'soporte':
        return (
          <>
            <div className="card" style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>Documento soporte en adquisiciones efectuadas a no obligados a facturar.</span>
              <button className="btn btn-primary btn-sm" onClick={() => setSearchParams({ tab: activeTab, action: 'new' })}>
                + Registrar Soporte
              </button>
            </div>
            
            <div className="card" style={{ padding: 0 }}>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ width: '13%', textAlign: 'left', padding: '12px 16px' }}>DOCUMENTO</th>
                      <th style={{ width: '13%', textAlign: 'left', padding: '12px 16px' }}>FECHA</th>
                      <th style={{ width: '22%', textAlign: 'left', padding: '12px 16px' }}>PROVEEDOR</th>
                      <th style={{ width: '13%', textAlign: 'left', padding: '12px 16px' }}>TIPO</th>
                      <th style={{ width: '13%', textAlign: 'center', padding: '12px 16px' }}>ESTADO</th>
                      <th style={{ width: '13%', textAlign: 'left', padding: '12px 16px' }}>TOTAL</th>
                      <th style={{ width: '13%', textAlign: 'center', padding: '12px 16px' }}>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supportDocs.map((doc, index) => {
                      return (
                        <tr key={doc.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td className="cell-bold" style={{ padding: '12px 16px', fontFamily: 'var(--font-family-mono)', fontWeight: 'bold' }}>{doc.number}</td>
                          <td className="cell-muted" style={{ padding: '12px 16px' }}>{doc.date}</td>
                          <td style={{ padding: '12px 16px', color: 'var(--color-primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '500' }} onClick={() => setEditingProvider(doc)}>{doc.provider}</td>
                          <td style={{ padding: '12px 16px' }}>
                            <span className="chip chip-doc">{doc.type}</span>
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'center', position: 'relative' }}>
                            <span className={`chip ${doc.status === 'pagada' ? 'chip-success' : 'chip-warning'}`}>
                              <span className="dot" style={{ background: doc.status === 'pagada' ? '#10b981' : '#f59e0b' }}></span>
                              {doc.status}
                            </span>
                          </td>
                          <td className="cell-amount" style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 'bold', fontFamily: 'var(--font-family-mono)' }}>
                            <span style={{ color: 'var(--text-muted)', marginRight: '4px' }}>$</span>
                            <span>{doc.total.toLocaleString('es-CO')}</span>
                          </td>
                           <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <button 
                              className="btn btn-primary btn-sm"
                              style={{ padding: '6px 16px', fontSize: '13px', height: 'auto', minHeight: '28px', borderRadius: '4px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                              onClick={() => handlePagarClick(`doc-${doc.id}`)}
                            >
                              Pagar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case 'ordenes':
        return (
          <>
            <div className="card" style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>Pedidos y requisiciones de compra enviados a proveedores.</span>
              <button className="btn btn-primary btn-sm" onClick={() => setSearchParams({ tab: activeTab, action: 'new' })}>
                + Nueva Orden
              </button>
            </div>
            
            <div className="card" style={{ padding: 0 }}>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ width: '15%', textAlign: 'left', padding: '12px 16px' }}>NÚMERO</th>
                      <th style={{ width: '15%', textAlign: 'left', padding: '12px 16px' }}>FECHA</th>
                      <th style={{ width: '25%', textAlign: 'left', padding: '12px 16px' }}>PROVEEDOR</th>
                      <th style={{ width: '15%', textAlign: 'left', padding: '12px 16px' }}>TOTAL</th>
                      <th style={{ width: '15%', textAlign: 'center', padding: '12px 16px' }}>ESTADO</th>
                      <th style={{ width: '15%', textAlign: 'center', padding: '12px 16px' }}>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseOrders.map((order, index) => {
                      const isReceived = order.status === 'recibida';
                      return (
                        <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td className="cell-bold" style={{ padding: '12px 16px', fontFamily: 'var(--font-family-mono)', fontWeight: 'bold' }}>{order.number}</td>
                          <td className="cell-muted" style={{ padding: '12px 16px' }}>{order.date}</td>
                          <td style={isReceived ? { padding: '12px 16px', color: 'var(--text-primary)' } : { padding: '12px 16px', color: 'var(--color-primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '500' }} onClick={() => !isReceived && setEditingProvider(order)}>{order.provider}</td>
                          <td className="cell-amount" style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 'bold', fontFamily: 'var(--font-family-mono)' }}>
                            <span style={{ color: 'var(--text-muted)', marginRight: '4px' }}>$</span>
                            <span>{order.total.toLocaleString('es-CO')}</span>
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <span className={`chip ${isReceived ? 'chip-success' : 'chip-warning'}`}>
                              <span className="dot" style={{ background: isReceived ? '#10b981' : '#f59e0b' }}></span>{order.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            {!isReceived && (
                              <button className="btn btn-primary btn-sm" style={{ padding: '6px 16px', fontSize: '13px', height: 'auto', minHeight: '28px', borderRadius: '4px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                Recibir
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case 'egresos':
        return (
          <>
            <div className="card" style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>Comprobantes de egreso por pagos realizados a proveedores.</span>
              <button className="btn btn-primary btn-sm" onClick={() => setSearchParams({ tab: activeTab, action: 'new' })}>
                + Registrar Egreso
              </button>
            </div>
            
            <div className="card" style={{ padding: 0 }}>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ width: '13%', textAlign: 'left', padding: '12px 16px' }}>NÚMERO</th>
                      <th style={{ width: '13%', textAlign: 'left', padding: '12px 16px' }}>FECHA</th>
                      <th style={{ width: '22%', textAlign: 'left', padding: '12px 16px' }}>BENEFICIARIO</th>
                      <th style={{ width: '13%', textAlign: 'left', padding: '12px 16px' }}>FACTURA RELACIONADA</th>
                      <th style={{ width: '13%', textAlign: 'center', padding: '12px 16px' }}>ESTADO</th>
                      <th style={{ width: '13%', textAlign: 'left', padding: '12px 16px' }}>MONTO PAGADO</th>
                      <th style={{ width: '13%', textAlign: 'center', padding: '12px 16px' }}>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment, index) => {
                      return (
                        <tr key={payment.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td className="cell-bold" style={{ padding: '12px 16px', fontFamily: 'var(--font-family-mono)', fontWeight: 'bold' }}>{payment.number}</td>
                          <td className="cell-muted" style={{ padding: '12px 16px' }}>{payment.date}</td>
                          <td style={{ padding: '12px 16px', color: 'var(--color-primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '500' }} onClick={() => setEditingProvider(payment)}>{payment.provider}</td>
                          <td className="cell-muted" style={{ padding: '12px 16px' }}>{payment.relatedInvoice}</td>
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <span className="chip chip-success" style={{ textTransform: 'uppercase' }}>
                              <span className="dot" style={{ background: '#10b981' }}></span>{payment.status}
                            </span>
                          </td>
                          <td className="cell-amount" style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 'bold', fontFamily: 'var(--font-family-mono)' }}>
                            <span style={{ color: 'var(--text-muted)', marginRight: '4px' }}>$</span>
                            <span>{payment.amount.toLocaleString('es-CO')}</span>
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text-primary)', fontSize: '13px', padding: 0 }}>
                              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--text-muted)' }}>description</span> 
                              PDF
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case 'notas':
        return (
          <>
            <div className="card" style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>Notas de crédito o débito recibidas de proveedores para ajustar saldos.</span>
              <button className="btn btn-primary btn-sm" onClick={() => setSearchParams({ tab: activeTab, action: 'new' })}>
                + Generar Nota Ajuste
              </button>
            </div>
            
            <div className="card" style={{ padding: 0 }}>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ width: '15%', textAlign: 'left', padding: '12px 16px' }}>NÚMERO</th>
                      <th style={{ width: '15%', textAlign: 'left', padding: '12px 16px' }}>FECHA</th>
                      <th style={{ width: '40%', textAlign: 'left', padding: '12px 16px' }}>PROVEEDOR</th>
                      <th style={{ width: '15%', textAlign: 'left', padding: '12px 16px' }}>FACTURA RELACIONADA</th>
                      <th style={{ width: '15%', textAlign: 'left', padding: '12px 16px' }}>MONTO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adjustments.length > 0 ? (
                      adjustments.map(adj => (
                        <tr key={adj.id}>
                           {/* Row render logic if adjustments existed */}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-family-mono)', fontSize: '14px' }}>
                          No hay notas de ajuste registradas.
                        </td>
                      </tr>
                    )}
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

  return (
    <>
      <div className="page-container fade-in">
        {/* Header */}
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div className="page-header-left">
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px', letterSpacing: '-0.5px' }}>Gastos & Compras</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>Facturación de proveedores, documento soporte, órdenes de compra y egresos.</p>
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
            { id: 'facturas', label: 'Facturas de compra' },
            { id: 'soporte', label: 'Documento soporte' },
            { id: 'ordenes', label: 'Órdenes de compra' },
            { id: 'egresos', label: 'Pagos / Egresos' },
            { id: 'notas', label: 'Notas de ajuste' }
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

        {/* Table Content */}
        {renderTabContent()}
      </div>
      
      <ProviderEditModal 
        provider={editingProvider} 
        onClose={() => setEditingProvider(null)} 
      />
      {renderGlobalToast()}
    </>
  );
}
