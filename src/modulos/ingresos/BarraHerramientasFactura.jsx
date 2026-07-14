import React from 'react';

export default function BarraHerramientasFactura({ activeTab }) {
  if (activeTab !== 'facturas') return null;

  return (
    <div className="card" style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-4)', background: 'white', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 'var(--space-3)' }}>
        <input
          type="text"
          className="input"
          placeholder="🔍 Buscar por número, cliente o monto..."
          style={{ width: '100%', borderRadius: 'var(--radius-full)' }}
        />
        <select className="input-select" style={{ width: '100%', borderRadius: 'var(--radius-full)' }}>
          <option>Estado doc: Todos</option>
          <option>Emitida</option>
          <option>Borrador</option>
        </select>
        <select className="input-select" style={{ width: '100%', borderRadius: 'var(--radius-full)' }}>
          <option>Estado DIAN: Todos</option>
          <option>Aprobada</option>
          <option>Pendiente</option>
        </select>
        <select className="input-select" style={{ width: '100%', borderRadius: 'var(--radius-full)' }}>
          <option>Período: Todos</option>
          <option>Este mes</option>
          <option>Mes anterior</option>
        </select>
      </div>
    </div>
  );
}
