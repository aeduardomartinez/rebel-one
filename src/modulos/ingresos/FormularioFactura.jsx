import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function FormularioFactura() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCreateCustomerOpen, setIsCreateCustomerOpen] = useState(false);
  const [items, setItems] = useState([
    { id: 1, product: '', qty: '', price: 0, desc: 0, iva: '19%', retencion: '0%', total: 0 }
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), product: '', qty: '', price: 0, desc: 0, iva: '19%', retencion: '0%', total: 0 }]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleBack = () => {
    searchParams.delete('action');
    setSearchParams(searchParams);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="page-container fade-in">
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="page-header-left">
          <h1 style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span onClick={handleBack} style={{ cursor: 'pointer', color: 'var(--color-primary)' }}>Ingresos</span>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <strong style={{ color: 'var(--text-primary)' }}>Nueva Factura</strong>
          </h1>
        </div>
        <div className="page-header-actions" style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm">Guardar Borrador</button>
          <button className="btn btn-secondary btn-sm">Vista Previa PDF</button>
          <button className="btn btn-primary btn-sm">Emitir y Enviar</button>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isCreateCustomerOpen ? '2fr 1fr 320px' : '2fr 1fr',
        gap: '24px',
        alignItems: 'start',
        transition: 'all 0.3s ease'
      }}>

        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Card 1: Parámetros del Documento */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>Tipo Documento *</label>
                <select className="input-select" style={{ width: '100%' }}>
                  <option value="factura">Factura de Venta</option>
                  <option value="cotizacion">Cotización</option>
                  <option value="remision">Remisión</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>Prefijo</label>
                <input type="text" className="input" defaultValue="FEIP" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>Consecutivo</label>
                <input type="text" className="input" readOnly defaultValue="0848" style={{ width: '100%', background: '#f8fafc' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>Fecha Emisión *</label>
                <input type="date" className="input" defaultValue={today} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>Forma Pago</label>
                <select className="input-select" style={{ width: '100%' }}>
                  <option value="contado">Contado</option>
                  <option value="credito">Crédito</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>Términos Pago</label>
                <select className="input-select" disabled style={{ width: '100%' }}>
                  <option value="30">30 días</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>Vencimiento</label>
                <input type="date" className="input" readOnly defaultValue={today} style={{ width: '100%', background: '#f8fafc' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>Moneda</label>
                <select className="input-select" style={{ width: '100%' }}>
                  <option value="COP">COP</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <div></div>
            </div>
          </div>

          {/* Card 2: Buscar Cliente */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: 0 }}>Buscar Cliente *</label>
              <button
                className="btn btn-secondary btn-sm"
                style={{ height: '24px', padding: '0 8px', fontSize: '11px' }}
                onClick={() => setIsCreateCustomerOpen(!isCreateCustomerOpen)}
              >
                + Crear Cliente
              </button>
            </div>
            <input type="text" className="input" placeholder="Buscar por nombre o NIT..." style={{ width: '100%' }} />
          </div>

          {/* Card 3: Ítems */}
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 16px 24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, color: 'var(--color-primary)' }}>Ítems del Documento</h4>
            </div>
            <div className="table-wrapper" style={{ margin: '0 24px' }}>
              <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>ÍTEM / PRODUCTO *</th>
                    <th style={{ width: '80px', textAlign: 'center', padding: '12px 16px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>CANT.</th>
                    <th style={{ width: '120px', textAlign: 'left', padding: '12px 16px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>PRECIO</th>
                    <th style={{ width: '80px', textAlign: 'left', padding: '12px 16px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>DESC %</th>
                    <th style={{ width: '100px', textAlign: 'left', padding: '12px 16px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>IVA</th>
                    <th style={{ width: '100px', textAlign: 'left', padding: '12px 16px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>RETENCIÓN</th>
                    <th style={{ width: '100px', textAlign: 'left', padding: '12px 16px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>TOTAL</th>
                    <th style={{ width: '40px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>No hay ítems agregados</td>
                    </tr>
                  ) : (
                    items.map((item, index) => {
                      const isActive = index === 0; // Simulamos que el primer ítem está activo
                      return (
                        <tr key={item.id} style={{ borderLeft: isActive ? '3px solid var(--color-primary)' : '3px solid transparent', background: isActive ? '#f8fafc' : 'transparent', borderBottom: '2px solid white' }}>
                          <td style={{ padding: '8px 16px' }}>
                            <select className="input-select" style={{ width: '100%', height: '32px', borderRadius: '16px', background: isActive ? '#eff6ff' : '#f8fafc', border: 'none', color: 'var(--text-secondary)' }}>
                              <option value="">Producto...</option>
                            </select>
                          </td>
                          <td style={{ padding: '8px 16px', textAlign: 'center' }}>
                            <input type="number" className="input" defaultValue={item.qty} style={{ width: '100%', height: '32px', borderRadius: '16px', background: isActive ? '#eff6ff' : '#f8fafc', border: 'none', textAlign: 'center', color: 'var(--text-secondary)' }} />
                          </td>
                          <td style={{ padding: '8px 16px' }}>
                            <input type="number" className="input" defaultValue={item.price} style={{ width: '100%', height: '32px', borderRadius: '16px', background: isActive ? '#eff6ff' : '#f8fafc', border: 'none', textAlign: 'center', color: 'var(--text-secondary)' }} />
                          </td>
                          <td style={{ padding: '8px 16px' }}>
                            <input type="number" className="input" defaultValue={item.desc} style={{ width: '100%', height: '32px', borderRadius: '16px', background: isActive ? '#eff6ff' : '#f8fafc', border: 'none', textAlign: 'center', color: 'var(--text-secondary)' }} />
                          </td>
                          <td style={{ padding: '8px 16px' }}>
                            <select className="input-select" defaultValue={item.iva} style={{ width: '100%', height: '32px', borderRadius: '16px', background: isActive ? '#eff6ff' : '#f8fafc', border: 'none', color: 'var(--text-secondary)' }}>
                              <option value="19%">19%</option>
                              <option value="5%">5%</option>
                              <option value="0%">0%</option>
                            </select>
                          </td>
                          <td style={{ padding: '8px 16px' }}>
                            <select className="input-select" defaultValue={item.retencion || '0%'} style={{ width: '100%', height: '32px', borderRadius: '16px', background: isActive ? '#eff6ff' : '#f8fafc', border: 'none', color: 'var(--text-secondary)' }}>
                              <option value="0%">0%</option>
                              <option value="2.5%">2.5%</option>
                              <option value="3.5%">3.5%</option>
                              <option value="4%">4%</option>
                              <option value="10%">10%</option>
                              <option value="11%">11%</option>
                            </select>
                          </td>
                          <td style={{ padding: '8px 16px', fontWeight: 'bold', textAlign: 'left', verticalAlign: 'middle', fontSize: '13px' }}>
                            $ 0
                          </td>
                          <td style={{ padding: '8px 16px', textAlign: 'center', verticalAlign: 'middle' }}>
                            <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '16px' }}>✕</button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '16px 24px 24px 24px' }}>
              <button className="btn" onClick={addItem} style={{ borderRadius: '8px', border: '1px solid var(--border-color)', background: 'white', color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '600', padding: '6px 16px', height: 'auto' }}>
                + Agregar Línea
              </button>
            </div>
          </div>

          {/* Card 4: Notas y Observaciones */}
          <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <details>
              <summary style={{ cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>Notas y Observaciones del Documento</summary>
              <textarea className="input" placeholder="Estas notas se imprimen en el PDF..." style={{ width: '100%', height: '80px', marginTop: '12px', padding: '12px', resize: 'vertical' }}></textarea>
            </details>
            <details>
              <summary style={{ cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>Clasificación (Tags)</summary>
              <input type="text" className="input" placeholder="Ej: ProyectoX, Exportacion" style={{ width: '100%', marginTop: '12px' }} />
            </details>
          </div>
        </div>

        {/* Middle Column (Sticky Totals) */}
        <div style={{ position: 'sticky', top: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', margin: '0 0 16px 0', color: 'var(--text-primary)', fontWeight: 'bold' }}>Resumen Totales</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}><span>Subtotal:</span><strong>$ 0</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}><span>Descuentos:</span><strong>$ 0</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}><span>Base Gravable:</span><strong>$ 0</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}><span>IVA (19%):</span><strong>$ 0</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}><span>Retención:</span><strong>$ 0</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-primary)', fontSize: '16px', fontWeight: 'bold', borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '4px' }}>
                <span>TOTAL:</span><span>$ 0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Crear Cliente) */}
        {isCreateCustomerOpen && (
          <div style={{ position: 'sticky', top: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--color-primary)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                  + Crear Cliente Rápido
                </span>
                <button className="btn-close" onClick={() => setIsCreateCustomerOpen(false)}>✕</button>
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>Razón Social *</label>
                  <input type="text" className="input" placeholder="Nombre o empresa" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>NIT / Identificación *</label>
                  <input type="text" className="input" placeholder="Ej: 901.888.777-1" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>Dirección</label>
                  <input type="text" className="input" placeholder="Avenida Siempre Viva 123" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>Email Facturación</label>
                  <input type="email" className="input" placeholder="cliente@correo.com" />
                </div>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }} onClick={() => setIsCreateCustomerOpen(false)}>
                  Guardar Cliente
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
