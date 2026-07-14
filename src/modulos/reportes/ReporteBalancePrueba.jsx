import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function ReporteBalancePrueba() {
  const [searchParams, setSearchParams] = useSearchParams();
  const reportName = searchParams.get('report') || 'Balance de Prueba';
  const isTercero = reportName.toLowerCase() === 'balance de prueba por tercero';

  const dataGeneral = [
    { cta: '220505', name: 'Proveedores nacionales', init: 0, deb: 184760000, cred: 0, fin: -184760000 },
    { cta: '11050501', name: 'Caja general', init: 1500000, deb: 13578100, cred: 0, fin: 15078100 },
    { cta: '11100501', name: 'Banco Davivienda', init: 5000000, deb: 0, cred: 0, fin: 5000000 },
    { cta: '11100504', name: 'Bancolombia', init: 100000000, deb: 5600000, cred: 186500000, fin: -80900000 },
    { cta: '13050501', name: 'Clientes nacionales', init: 42000000, deb: 0, cred: 18678100, fin: 23321900 },
    { cta: '22050501', name: 'Proveedores nacionales', init: 35000000, deb: 1240000, cred: 0, fin: 33760000 }
  ];

  const dataTercero = [
    { cta: '11100504', name: 'Bancolombia Ahorros', third: 'Textiles Medina S.A.', init: 0, deb: 5600000, cred: 0, fin: 5600000 },
    { cta: '13050501', name: 'Clientes Nacionales', third: 'Textiles Medina S.A.', init: 12000000, deb: 0, cred: 5600000, fin: 6400000 },
    { cta: '22050501', name: 'Proveedores Nacionales', third: 'Suministros Técnicos S.A.', init: 15000000, deb: 1240000, cred: 0, fin: 13760000 },
    { cta: '11100504', name: 'Bancolombia Ahorros', third: 'Suministros Técnicos S.A.', init: 0, deb: 0, cred: 1240000, fin: -1240000 },
    { cta: '11050501', name: 'Caja general', third: 'Otros / Sin Tercero', init: 0, deb: 13578100, cred: 0, fin: 13578100 },
    { cta: '11100504', name: 'Bancolombia Ahorros', third: 'Otros / Sin Tercero', init: 0, deb: 0, cred: 185260000, fin: -185260000 },
    { cta: '13050501', name: 'Clientes Nacionales', third: 'Otros / Sin Tercero', init: 0, deb: 0, cred: 13078100, fin: -13078100 },
    { cta: '220505', name: 'Proveedores Nacionales', third: 'Otros / Sin Tercero', init: 0, deb: 184760000, cred: 0, fin: -184760000 }
  ];

  const data = isTercero ? dataTercero : dataGeneral;

  const formatCurrency = (val) => {
    const isNeg = val < 0;
    const absVal = Math.abs(val);
    const formatted = absVal.toLocaleString('es-CO');
    return isNeg ? `-$ ${formatted}` : `$ ${formatted}`;
  };

  const getAmountColor = (type, val) => {
    if (val === 0 && type !== 'fin') return 'var(--text-primary)';
    if (type === 'deb') return '#16a34a'; // Green
    if (type === 'cred') return '#dc2626'; // Red
    if (type === 'fin' && val < 0) return '#1e293b'; // Using dark slate for negatives to match original general design, wait screenshot uses standard black/dark
    return 'var(--text-primary)';
  };

  const totals = data.reduce((acc, curr) => {
    acc.init += curr.init;
    acc.deb += curr.deb;
    acc.cred += curr.cred;
    acc.fin += curr.fin;
    return acc;
  }, { init: 0, deb: 0, cred: 0, fin: 0 });

  return (
    <div className="fade-in">
      {/* Container header with back button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px' }}>
        <button 
          className="btn btn-secondary btn-sm" 
          onClick={() => setSearchParams({ category: 'Contables' })}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '32px', padding: '0 12px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', fontWeight: '500', fontSize: '12px' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_back</span>
          Catálogo
        </button>
      </div>

      {/* Main card */}
      <div className="card" style={{ padding: '32px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)', borderRadius: '16px', minHeight: '600px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>
              {isTercero ? 'Balance de Prueba por Tercero' : 'Balance de Prueba General'}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Período:</span>
              <select className="input-select" style={{ height: '30px', padding: '0 24px 0 8px', fontSize: '12px', background: '#eff4ff', border: 'none', borderRadius: '6px', width: 'auto', minWidth: '80px' }}>
                <option>Todos</option>
                <option>Este mes</option>
                <option>Mes anterior</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '30px', padding: '0 12px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '12px', fontWeight: '500' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>picture_as_pdf</span>
              PDF
            </button>
            <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '30px', padding: '0 12px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '12px', fontWeight: '500' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--color-primary)' }}>download</span>
              Excel
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '120px' }}>CÓDIGO</th>
                <th>NOMBRE CUENTA</th>
                {isTercero && <th>TERCERO / CONTACTO</th>}
                <th style={{ textAlign: 'right', width: '160px', color: '#0284c7' }}>SALDO INICIAL</th>
                <th style={{ textAlign: 'right', width: '160px' }}>MOVIMIENTO DÉBITO</th>
                <th style={{ textAlign: 'right', width: '160px' }}>MOVIMIENTO CRÉDITO</th>
                <th style={{ textAlign: 'right', width: '160px' }}>SALDO FINAL</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: '600' }}>{row.cta}</td>
                  <td>{row.name}</td>
                  {isTercero && <td style={{ fontWeight: '500', color: '#1e293b' }}>{row.third}</td>}
                  <td className="amount" style={{ color: getAmountColor('init', row.init) }}>
                    {formatCurrency(row.init)}
                  </td>
                  <td className="amount" style={{ color: getAmountColor('deb', row.deb) }}>
                    {formatCurrency(row.deb)}
                  </td>
                  <td className="amount" style={{ color: getAmountColor('cred', row.cred) }}>
                    {formatCurrency(row.cred)}
                  </td>
                  <td className="amount" style={{ fontWeight: '600', color: getAmountColor('fin', row.fin) }}>
                    {formatCurrency(row.fin)}
                  </td>
                </tr>
              ))}
              <tr style={{ background: '#f8fafc', fontWeight: 'bold', borderTop: '2px solid var(--border-color)' }}>
                <td colSpan={isTercero ? 3 : 2} style={{ textTransform: 'uppercase', padding: '16px' }}>TOTALES</td>
                <td className="amount" style={{ padding: '16px', color: 'var(--text-primary)' }}>{formatCurrency(totals.init)}</td>
                <td className="amount" style={{ padding: '16px', color: '#16a34a' }}>{formatCurrency(totals.deb)}</td>
                <td className="amount" style={{ padding: '16px', color: '#dc2626' }}>{formatCurrency(totals.cred)}</td>
                <td className="amount" style={{ padding: '16px', color: '#1e293b' }}>{formatCurrency(totals.fin)}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
