import React from 'react';

export default function ReporteAgingCxP() {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 5 KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        {[
          { label: 'TOTAL OBLIGACIONES', val: '$ 0', sub: 'Deuda total proveedores', color: 'var(--text-primary)' },
          { label: 'CORRIENTE', val: '$ 0', sub: 'Por pagar corriente', color: '#10b981' },
          { label: '1 A 30 DÍAS', val: '$ 0', sub: 'Mora temprana', color: '#f59e0b' },
          { label: '31 A 60 DÍAS', val: '$ 0', sub: 'Mora media', color: '#64748b' },
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
        <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '40px', marginTop: 0 }}>Distribución de Edades de Cuentas por Pagar</h4>
        
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '140px', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)', margin: '0 20px' }}>
          {[
            { label: 'Corriente', percent: '0.0%', height: '0%', color: '#10b981' },
            { label: '1-30 días', percent: '0.0%', height: '0%', color: '#d97706' },
            { label: '31-60 días', percent: '0.0%', height: '0%', color: '#475569' },
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
          <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>Detalle de Obligaciones por Proveedor</h4>
        </div>
        
        <div className="table-wrapper">
          <table className="data-table" style={{ fontSize: '12px' }}>
            <thead>
              <tr>
                <th style={{ color: 'var(--text-muted)', fontWeight: '600' }}>PROVEEDOR</th>
                <th style={{ color: 'var(--text-muted)', fontWeight: '600' }}>NIT</th>
                <th style={{ color: 'var(--text-muted)', fontWeight: '600' }}># FACTURA</th>
                <th style={{ color: 'var(--text-muted)', fontWeight: '600' }}>EMISIÓN</th>
                <th style={{ color: 'var(--text-muted)', fontWeight: '600' }}>VENCIMIENTO</th>
                <th style={{ color: 'var(--text-muted)', fontWeight: '600', textAlign: 'right' }}>TOTAL</th>
                <th style={{ color: 'var(--text-muted)', fontWeight: '600', textAlign: 'right' }}>SALDO PENDIENTE</th>
                <th style={{ color: 'var(--text-muted)', fontWeight: '600', textAlign: 'center' }}>DÍAS MORA</th>
                <th style={{ color: 'var(--text-muted)', fontWeight: '600', textAlign: 'center' }}>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontFamily: 'var(--font-family-mono)' }}>
                  Sin obligaciones de pago registradas.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
