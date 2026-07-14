import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function FormularioNuevoAsiento() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', marginBottom: '6px' }}>
          Nuevo Asiento Contable (Comprobante Diario)
        </h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
          Registre movimientos contables de forma manual en el Libro Diario.
        </p>
      </div>

      <div className="card" style={{ maxWidth: '900px', margin: '0 auto', padding: '32px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)', borderRadius: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '24px', marginBottom: '32px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>Fecha *</label>
            <input type="date" className="input" defaultValue="2026-07-02" style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>Concepto / Detalle *</label>
            <input type="text" className="input" placeholder="Ej: Ajuste contable fin de mes" style={{ width: '100%' }} />
          </div>
        </div>

        <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#0284c7', marginBottom: '16px' }}>Detalle de Asiento</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {[1, 2, 3, 4].map((row) => (
            <div key={row} style={{ display: 'grid', gridTemplateColumns: '1fr 180px 180px', gap: '16px' }}>
              <select className="input-select" style={{ width: '100%' }}>
                <option>-- Seleccione Cuenta --</option>
              </select>
              <input type="text" placeholder="Débito" className="input" style={{ width: '100%' }} />
              <input type="text" placeholder="Crédito" className="input" style={{ width: '100%' }} />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderTop: '1px dashed #e2e8f0', paddingTop: '24px' }}>
          <div style={{ background: '#fee2e2', color: '#ef4444', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%' }}></div>
            Descuadrado
          </div>
          
          <div style={{ width: '250px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#475569', marginBottom: '8px' }}>
              <span>Total Débito:</span>
              <strong style={{ color: '#1e293b' }}>$ 0</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#475569', marginBottom: '12px' }}>
              <span>Total Crédito:</span>
              <strong style={{ color: '#1e293b' }}>$ 0</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#1e293b', fontWeight: '700' }}>
              <span>Diferencia:</span>
              <span>$ 0</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
          <button 
            className="btn btn-ghost" 
            onClick={() => {
              searchParams.delete('action');
              setSearchParams(searchParams);
            }}
            style={{ fontWeight: '600', padding: '0 24px', borderRadius: '8px' }}
          >
            Cancelar
          </button>
          <button 
            className="btn btn-primary" 
            style={{ fontWeight: '600', padding: '0 24px', borderRadius: '8px' }}
          >
            Guardar Asiento
          </button>
        </div>

      </div>
    </div>
  );
}
