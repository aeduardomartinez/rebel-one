import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function FormularioGasto() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'facturas';

  const handleBack = () => {
    searchParams.delete('action');
    setSearchParams(searchParams);
  };

  const getTitle = () => {
    switch (tab) {
      case 'facturas': return 'Registrar Gasto / Compra';
      case 'soporte': return 'Registrar Documento Soporte';
      case 'ordenes': return 'Nueva Orden de Compra';
      case 'egresos': return 'Registrar Egreso / Pago';
      case 'notas': return 'Nueva Nota de Ajuste';
      default: return 'Registrar';
    }
  };

  return (
    <div className="card fade-in" style={{ width: '100%', maxWidth: '600px', padding: '24px 32px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.02)', border: 'none', background: 'white' }}>
      
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '20px' }}>{getTitle()}</h2>
      
      {tab === 'egresos' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Beneficiario (Proveedor) *</label>
            <select className="input-select" style={{ width: '100%' }}>
              <option>-- Seleccione proveedor --</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Factura por Pagar *</label>
            <select className="input-select" style={{ width: '100%' }}>
              <option>-- Seleccione beneficiario primero --</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Fecha Pago *</label>
              <input type="date" className="input" defaultValue="2026-07-01" style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Caja / Banco Origen *</label>
              <select className="input-select" style={{ width: '100%' }}>
                <option>Bancolombia Ahorros ($ 117.000)</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Monto Pagado (COP) *</label>
            <input type="text" className="input" defaultValue="0" style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Notas / Observaciones</label>
            <textarea className="input" placeholder="Notas en comprobante..." style={{ width: '100%', minHeight: '80px', resize: 'vertical' }}></textarea>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
            <button className="btn btn-ghost" onClick={handleBack} style={{ color: '#475569', fontWeight: '600' }}>Cancelar</button>
            <button className="btn btn-primary" onClick={handleBack} style={{ fontWeight: '600', padding: '0 24px', borderRadius: '8px' }}>Aplicar Egreso</button>
          </div>
        </div>
      ) : tab === 'ordenes' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Proveedor *</label>
            <select className="input-select" style={{ width: '100%' }}>
              <option>-- Seleccione --</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Fecha *</label>
            <input type="date" className="input" defaultValue="2026-07-01" style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Monto de Compra Estimado (COP) *</label>
            <input type="text" className="input" defaultValue="0" style={{ width: '100%' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
            <button className="btn btn-ghost" onClick={handleBack} style={{ color: '#475569', fontWeight: '600' }}>Cancelar</button>
            <button className="btn btn-primary" onClick={handleBack} style={{ fontWeight: '600', padding: '0 24px', borderRadius: '8px' }}>Guardar Orden</button>
          </div>
        </div>
      ) : tab === 'notas' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Factura de Compra Relacionada *</label>
            <select className="input-select" style={{ width: '100%' }}>
              <option>-- Seleccione --</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Fecha *</label>
            <input type="date" className="input" defaultValue="2026-07-02" style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Monto de Ajuste (COP) *</label>
            <input type="text" className="input" defaultValue="0" style={{ width: '100%' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
            <button className="btn btn-ghost" onClick={handleBack} style={{ color: '#475569', fontWeight: '600' }}>Cancelar</button>
            <button className="btn btn-primary" onClick={handleBack} style={{ fontWeight: '600', padding: '0 24px', borderRadius: '8px' }}>Emitir Nota</button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Proveedor *</label>
              <select className="input-select" style={{ width: '100%' }}>
                <option>-- Seleccione --</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>N° Factura Proveedor *</label>
              <input type="text" className="input" placeholder="Ej: FC-4819" style={{ width: '100%' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Concepto / Ítem de Compra *</label>
            <select className="input-select" style={{ width: '100%' }}>
              <option>-- Seleccione --</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Forma de Pago *</label>
              <select className="input-select" style={{ width: '100%' }}>
                <option>1 - Efectivo (11050501)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Fecha Compra *</label>
              <input type="date" className="input" defaultValue="2026-07-01" style={{ width: '100%' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Subtotal (COP) *</label>
              <input type="text" className="input" defaultValue="0" style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>IVA (19% COP)</label>
              <input type="text" className="input" defaultValue="0" style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Retenciones (COP)</label>
              <input type="text" className="input" defaultValue="0" style={{ width: '100%' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--color-primary)' }}>Total Factura:</span>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--color-primary)', fontFamily: 'var(--font-family-mono)' }}>$ 0</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px' }}>
            <button className="btn btn-ghost" onClick={handleBack} style={{ color: '#475569', fontWeight: '600' }}>Cancelar</button>
            <button className="btn btn-primary" onClick={handleBack} style={{ fontWeight: '600', padding: '0 24px', borderRadius: '8px' }}>
              {tab === 'soporte' ? 'Guardar Soporte' : 'Guardar Compra'}
            </button>
          </div>

        </div>
      )}
      </div>
  );
}
