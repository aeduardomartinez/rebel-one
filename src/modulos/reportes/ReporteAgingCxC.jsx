import React from 'react';

export default function ReporteAgingCxC() {
  const agingData = [
    { client: 'Grupo Empresarial Cali S.A.S', nit: '901.234.567-8', invoice: 'FEIP-0843', emission: '1 de jun de 2026', due: '1 de jul de 2026', total: 16660000, balance: 16660000, mora: 1, range: '1 a 30 días', rangeColor: '#f59e0b' },
    { client: 'Alimentos y Bebidas del Valle', nit: '830.456.123-4', invoice: 'FEIP-0842', emission: '2 de may de 2026', due: '2 de jun de 2026', total: 678300, balance: 678300, mora: 30, range: '1 a 30 días', rangeColor: '#f59e0b' },
    { client: 'Constructora Andina S.A.S', nit: '901.456.789-2', invoice: 'FEIP-0847', emission: '5 de jun de 2026', due: '5 de jul de 2026', total: 35997500, balance: 35997500, mora: 0, range: 'Corriente', rangeColor: '#10b981' },
    { client: 'Distribuidora El Pino Ltda.', nit: '800.123.456-0', invoice: 'FEIP-0846', emission: '4 de mar de 2026', due: '4 de abr de 2026', total: 14577500, balance: 14577500, mora: 45, range: '31 a 60 días', rangeColor: '#64748b' }
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 5 KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        {[
          { label: 'TOTAL CARTERA', val: '$ 67.913.300', sub: 'Saldo total por cobrar', color: 'var(--text-primary)' },
          { label: 'CORRIENTE', val: '$ 35.997.500', sub: 'Por vencer', color: '#10b981' },
          { label: '1 A 30 DÍAS', val: '$ 17.338.300', sub: 'Vencido temprano', color: '#f59e0b' },
          { label: '31 A 60 DÍAS', val: '$ 14.577.500', sub: 'Vencido medio', color: '#64748b' },
          { label: 'VENCIDO > 60D', val: '$ 0', sub: 'Mora crítica', color: '#ef4444' }
        ].map((kpi, idx) => (
          <div key={idx} className="card" style={{ padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '8px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', marginBottom: 0 }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.5px' }}>{kpi.label}</span>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: kpi.color }}>{kpi.val}</h3>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>{kpi.sub}</span>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="card" style={{ padding: '24px', borderRadius: '16px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', marginBottom: 0 }}>
        <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '40px', marginTop: 0 }}>Distribución de Edades de Cartera</h4>
        
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '140px', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)', margin: '0 20px' }}>
          {[
            { label: 'Corriente', percent: '53.0%', height: '100%', color: '#10b981' },
            { label: '1-30 días', percent: '25.5%', height: '50%', color: '#d97706' },
            { label: '31-50 días', percent: '21.5%', height: '40%', color: '#475569' },
            { label: '61-90 días', percent: '0.0%', height: '0%', color: '#ea580c' },
            { label: '+90 días', percent: '0.0%', height: '0%', color: '#dc2626' }
          ].map((bar, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end', width: '60px' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: bar.color }}>{bar.percent}</span>
              <div style={{ width: '28px', height: bar.height || '4px', background: bar.color, borderRadius: '4px 4px 0 0' }}></div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{bar.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="card" style={{ padding: '0', borderRadius: '16px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden', marginBottom: 0 }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>Detalle de Facturas por Vencer / Vencidas</h4>
        </div>
        
        <div className="table-wrapper">
          <table className="data-table" style={{ fontSize: '12px' }}>
            <thead>
              <tr>
                <th style={{ color: 'var(--text-muted)', fontWeight: '600' }}>CLIENTE</th>
                <th style={{ color: 'var(--text-muted)', fontWeight: '600' }}>NIT</th>
                <th style={{ color: 'var(--text-muted)', fontWeight: '600' }}># FACTURA</th>
                <th style={{ color: 'var(--text-muted)', fontWeight: '600' }}>EMISIÓN</th>
                <th style={{ color: 'var(--text-muted)', fontWeight: '600' }}>VENCIMIENTO</th>
                <th style={{ color: 'var(--text-muted)', fontWeight: '600', textAlign: 'right' }}>TOTAL</th>
                <th style={{ color: 'var(--text-muted)', fontWeight: '600', textAlign: 'right' }}>SALDO</th>
                <th style={{ color: 'var(--text-muted)', fontWeight: '600', textAlign: 'center' }}>MORA (DÍAS)</th>
                <th style={{ color: 'var(--text-muted)', fontWeight: '600' }}>RANGO</th>
                <th style={{ color: 'var(--text-muted)', fontWeight: '600', textAlign: 'center' }}>ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {agingData.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{row.client}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{row.nit}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{row.invoice}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{row.emission}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{row.due}</td>
                  <td style={{ textAlign: 'right', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                    <span style={{ marginRight: '4px' }}>$</span>{row.total.toLocaleString('es-CO')}
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--color-primary)', fontWeight: '600', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                    <span style={{ marginRight: '4px' }}>$</span>{row.balance.toLocaleString('es-CO')}
                  </td>
                  <td style={{ textAlign: 'center', color: '#dc2626', fontWeight: '600' }}>{row.mora}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: row.rangeColor }}></span>
                      <span style={{ color: row.rangeColor, fontWeight: '500', fontSize: '11px' }}>{row.range}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '11px', fontWeight: '600', cursor: 'pointer', padding: '4px 8px' }}>Enviar Estado</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
