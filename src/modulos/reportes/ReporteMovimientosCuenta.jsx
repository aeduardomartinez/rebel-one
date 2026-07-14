import React from 'react';
import { useSearchParams } from 'react-router-dom';
import FormularioNuevoAsiento from './FormularioNuevoAsiento';

export default function ReporteMovimientosCuenta() {
  const [searchParams, setSearchParams] = useSearchParams();

  const entries = [
    {
      id: 'RC-0412',
      date: '1 de jun de 2026',
      desc: 'Cobro factura FEIP-0844 · Textiles Medina',
      rows: [
        { cta: '11100504', name: 'Bancolombia Ahorros', deb: 5600000, cred: 0 },
        { cta: '13050501', name: 'Clientes Nacionales', deb: 0, cred: 5600000 },
      ]
    },
    {
      id: 'CE-0089',
      date: '2 de jun de 2026',
      desc: 'Pago proveedor FC-2024 · Papelería Central',
      rows: [
        { cta: '22050501', name: 'Proveedores Nacionales', deb: 1240000, cred: 0 },
        { cta: '11100504', name: 'Bancolombia Ahorros', deb: 0, cred: 1240000 },
      ]
    },
    {
      id: 'TF-0021',
      date: '2 de jun de 2026',
      desc: 'Traslado a Caja principal',
      rows: [
        { cta: '11050501', name: 'Caja general', deb: 500000, cred: 0 },
        { cta: '11100504', name: 'Bancolombia Ahorros', deb: 0, cred: 500000 },
      ]
    }
  ];

  if (searchParams.get('action') === 'crearAsiento') {
    return <FormularioNuevoAsiento />;
  }

  return (
    <div className="fade-in">
      {/* Contabilidad Core Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', marginBottom: '6px' }}>
          Contabilidad Core
        </h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
          Control del PUC, Libro Diario de asientos y control de centros de costo.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f1f5f9', padding: '6px', borderRadius: '12px', marginTop: '24px', overflowX: 'auto' }}>
          {['PUC Jerárquico', 'Asientos Contables', 'Activos Fijos', 'Centros de Costo', 'Conciliador Fiscal DIAN ⭐', 'Presupuesto', 'Exógena DIAN', 'Causación con IA'].map(tab => (
            <button
              key={tab}
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '600',
                borderRadius: '8px',
                background: tab === 'Asientos Contables' ? 'white' : 'transparent',
                color: tab === 'Asientos Contables' ? '#1d4ed8' : '#475569',
                border: 'none',
                boxShadow: tab === 'Asientos Contables' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main card */}
      <div className="card" style={{ padding: '32px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)', borderRadius: '16px', minHeight: '600px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>
            Libro Diario de Asientos Contables
          </h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              searchParams.set('action', 'crearAsiento');
              setSearchParams(searchParams);
            }}
          >
            + Crear Asiento Manual
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {entries.map((entry, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>

              <div style={{ background: '#f8fafc', padding: '12px 16px', display: 'flex', alignItems: 'center', fontSize: '13px', color: '#334155', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ width: '160px', flexShrink: 0 }}>
                  <strong style={{ color: '#1e293b' }}>Asiento:</strong> {entry.id}
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#cbd5e1', marginRight: '12px' }}>|</span>
                  <strong style={{ color: '#1e293b', marginRight: '6px' }}>Fecha:</strong> {entry.date}
                </div>
                <div style={{ color: '#686869ff', textAlign: 'right', whiteSpace: 'nowrap', fontWeight: '500' }}>
                  {entry.desc}
                </div>
              </div>

              <div className="table-wrapper">
                <table className="data-table" style={{ borderBottom: 'none' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '160px' }}>CUENTA</th>
                      <th>NOMBRE CUENTA</th>
                      <th style={{ width: '150px', textAlign: 'right' }}>DÉBITO</th>
                      <th style={{ width: '150px', textAlign: 'right' }}>CRÉDITO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entry.rows.map((r, ri) => (
                      <tr key={ri}>
                        <td>{r.cta}</td>
                        <td>{r.name}</td>
                        <td className="amount">
                          {r.deb > 0 ? `$ ${r.deb.toLocaleString('es-CO')}` : '-'}
                        </td>
                        <td className="amount">
                          {r.cred > 0 ? `$ ${r.cred.toLocaleString('es-CO')}` : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
