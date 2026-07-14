import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function ReporteEstadoResultados() {
  const [searchParams, setSearchParams] = useSearchParams();

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

      {/* Top action bar */}
      <div className="card" style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>Estructura NIIF</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Período:</span>
            <select className="input-select" style={{ height: '30px', fontSize: '12px', padding: '0 8px', borderRadius: '6px' }}>
              <option>Todos</option>
              <option>Últimos 15 días</option>
              <option>Este mes</option>
              <option>Mes anterior</option>
              <option>Año corrido</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '12px', fontWeight: '500' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#cbd5e1' }}>description</span>
            PDF Oficial
          </button>
          <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '12px', fontWeight: '500' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#ef4444' }}>table</span>
            Excel
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {[
          { label: 'INGRESOS TOTALES', val: '$ 83.294.000', sub: 'Ventas netas del periodo' },
          { label: 'GASTOS OPERATIVOS', val: '$ 199.913.490', sub: 'Nómina, compras y dep.', color: '#ef4444' },
          { label: 'UTILIDAD NETA', val: '-$ 116.619.490', sub: 'Resultado del ejercicio', color: '#ef4444' },
          { label: 'MARGEN NETO', val: '-140.0%', sub: 'Rentabilidad sobre ingresos' }
        ].map((kpi, idx) => (
          <div key={idx} className="card" style={{ marginBottom: 0, padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)', borderRadius: '16px' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>{kpi.label}</span>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: kpi.color ? kpi.color : 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{kpi.val}</h3>
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>{kpi.sub}</span>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
        {/* Statement table */}
        <div className="card" style={{ padding: '24px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)', borderRadius: '16px', marginBottom: 0 }}>
          <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '20px', textTransform: 'uppercase' }}>ESTADO DE RESULTADOS INTEGRAL</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              <span>(+) INGRESOS OPERACIONALES</span>
              <span style={{ color: '#16a34a', fontVariantNumeric: 'tabular-nums' }}>$ 83.294.000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-secondary)', paddingLeft: '16px' }}>
              <span>Comercio al por mayor y al por menor (4135)</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>$ 83.294.000</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '12px', marginTop: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              <span>(-) COSTO DE VENTAS (61)</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>$ 0</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '12px', marginTop: '10px', padding: '8px 0' }}>
              <span>(=) UTILIDAD BRUTA</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>$ 83.294.000</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '12px', marginTop: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              <span>(-) GASTOS OPERACIONALES DE ADMINISTRACIÓN (51)</span>
              <span style={{ color: '#ef4444', fontVariantNumeric: 'tabular-nums' }}>$ 199.913.490</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-secondary)', paddingLeft: '16px', marginTop: '4px' }}>
              <span>Beneficios a Empleados / Nómina (5105)</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>$ 5.063.490</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-secondary)', paddingLeft: '16px', marginTop: '4px' }}>
              <span>Compras y Servicios Operativos (51)</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>$ 194.850.000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-secondary)', paddingLeft: '16px', marginTop: '4px' }}>
              <span>Depreciaciones Propiedad Planta y Equipo (5160)</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>$ 0</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '13px', marginTop: '16px', background: '#eff6ff', padding: '12px', borderRadius: '8px', color: '#1e40af' }}>
              <span>(=) UTILIDAD NETA DEL EJERCICIO</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>-$ 116.619.490</span>
            </div>
          </div>
        </div>

        {/* Donut chart placeholder */}
        <div className="card" style={{ padding: '24px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)', borderRadius: '16px', marginBottom: 0, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '40px' }}>Proporción Ingresos vs Gastos</h3>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* CSS Donut Chart representation */}
            <div style={{ position: 'relative', width: '160px', height: '160px', borderRadius: '50%', background: 'conic-gradient(#b91c1c 0% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600' }}>RESULTADO</span>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--color-primary)' }}>-140.0%</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb' }}></div>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Utilidad (-140%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#b91c1c' }}></div>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Gastos (240%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
