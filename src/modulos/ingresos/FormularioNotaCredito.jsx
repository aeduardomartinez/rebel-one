import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function FormularioNotaCredito() {
  const [searchParams, setSearchParams] = useSearchParams();
  const invoiceId = searchParams.get('invoiceId');
  
  // En un caso real, aquí buscaríamos los detalles de la factura usando el invoiceId
  const invoiceRef = invoiceId === '1' ? 'FEIP-0847' : (invoiceId ? `Factura #${invoiceId}` : '');
  const initialCustomer = invoiceId === '1' ? 'Constructora Andina S.A.S' : '';

  const [items, setItems] = useState([
    { id: 1, product: 'Devolución / Ajuste', qty: '1', price: 0, desc: 0, iva: '19%', retencion: '0%', total: 0 }
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), product: '', qty: '', price: 0, desc: 0, iva: '19%', retencion: '0%', total: 0 }]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleBack = () => {
    searchParams.delete('action');
    searchParams.delete('invoiceId');
    setSearchParams(searchParams);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="page-container fade-in">
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="page-header-left">
          <h1 style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span onClick={handleBack} style={{ cursor: 'pointer', color: 'var(--color-primary)' }}>Notas Crédito</span>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <strong style={{ color: 'var(--text-primary)' }}>Nueva Nota Crédito</strong>
          </h1>
        </div>
        <div className="page-header-actions" style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm">Guardar Borrador</button>
          <button className="btn btn-primary btn-sm">Aplicar Nota</button>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>

        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Card 1: Parámetros del Documento */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>Factura a Afectar *</label>
                <input type="text" className="input" readOnly defaultValue={invoiceRef} style={{ width: '100%', background: '#f8fafc' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>Prefijo</label>
                <input type="text" className="input" defaultValue="NC" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>Consecutivo</label>
                <input type="text" className="input" readOnly defaultValue="002" style={{ width: '100%', background: '#f8fafc' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>Fecha Emisión *</label>
                <input type="date" className="input" defaultValue={today} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>Motivo de la Nota *</label>
                <select className="input-select" style={{ width: '100%' }}>
                  <option value="1">Devolución de parte de los bienes</option>
                  <option value="2">Anulación de factura</option>
                  <option value="3">Rebaja total o parcial</option>
                  <option value="4">Descuento o ajuste de precio</option>
                  <option value="5">Otros</option>
                </select>
              </div>
              <div></div>
            </div>
          </div>

          {/* Card 2: Cliente (Read Only from Invoice) */}
          <div className="card" style={{ padding: '24px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '12px', display: 'block' }}>Cliente de la Factura</label>
            <input type="text" className="input" readOnly defaultValue={initialCustomer} style={{ width: '100%', background: '#f8fafc' }} />
          </div>

          {/* Card 3: Ítems */}
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 16px 24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, color: 'var(--color-primary)' }}>Ítems a Ajustar</h4>
            </div>
            <div className="table-wrapper" style={{ margin: '0 24px' }}>
              <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: '600' }}>DESCRIPCIÓN</th>
                    <th style={{ width: '80px', textAlign: 'center', padding: '12px 16px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: '600' }}>CANT.</th>
                    <th style={{ width: '120px', textAlign: 'left', padding: '12px 16px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: '600' }}>PRECIO</th>
                    <th style={{ width: '100px', textAlign: 'left', padding: '12px 16px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: '600' }}>IVA</th>
                    <th style={{ width: '100px', textAlign: 'left', padding: '12px 16px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: '600' }}>RETENCIÓN</th>
                    <th style={{ width: '100px', textAlign: 'left', padding: '12px 16px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: '600' }}>TOTAL</th>
                    <th style={{ width: '40px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.id} style={{ borderBottom: '2px solid white' }}>
                      <td style={{ padding: '8px 16px' }}>
                        <input type="text" className="input" defaultValue={item.product} style={{ width: '100%', height: '32px', borderRadius: '16px', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }} />
                      </td>
                      <td style={{ padding: '8px 16px', textAlign: 'center' }}>
                        <input type="number" className="input" defaultValue={item.qty} style={{ width: '100%', height: '32px', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-secondary)' }} />
                      </td>
                      <td style={{ padding: '8px 16px' }}>
                        <input type="number" className="input" defaultValue={item.price} style={{ width: '100%', height: '32px', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-secondary)' }} />
                      </td>
                      <td style={{ padding: '8px 16px' }}>
                        <select className="input-select" defaultValue={item.iva} style={{ width: '100%', height: '32px', borderRadius: '16px', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                          <option value="19%">19%</option>
                          <option value="5%">5%</option>
                          <option value="0%">0%</option>
                        </select>
                      </td>
                      <td style={{ padding: '8px 16px' }}>
                        <select className="input-select" defaultValue={item.retencion || '0%'} style={{ width: '100%', height: '32px', borderRadius: '16px', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                          <option value="0%">0%</option>
                          <option value="2.5%">2.5%</option>
                          <option value="3.5%">3.5%</option>
                          <option value="4%">4%</option>
                          <option value="10%">10%</option>
                          <option value="11%">11%</option>
                        </select>
                      </td>
                      <td style={{ padding: '8px 16px', fontWeight: 'bold', textAlign: 'left', verticalAlign: 'middle', fontSize: '13px', color: 'var(--color-danger)' }}>
                        -$ 0
                      </td>
                      <td style={{ padding: '8px 16px', textAlign: 'center', verticalAlign: 'middle' }}>
                        <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '16px' }}>✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '16px 24px 24px 24px' }}>
              <button className="btn" onClick={addItem} style={{ borderRadius: '8px', border: '1px solid var(--border-color)', background: 'white', color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '600', padding: '6px 16px', height: 'auto' }}>
                + Agregar Línea
              </button>
            </div>
          </div>
        </div>

        {/* Middle Column (Sticky Totals) */}
        <div style={{ position: 'sticky', top: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', margin: '0 0 16px 0', color: 'var(--text-primary)', fontWeight: 'bold' }}>Resumen Nota Crédito</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}><span>Subtotal:</span><strong>-$ 0</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}><span>IVA (19%):</span><strong>-$ 0</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}><span>Retención:</span><strong>-$ 0</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-danger)', fontSize: '16px', fontWeight: 'bold', borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '4px' }}>
                <span>TOTAL A FAVOR:</span><span>-$ 0</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
