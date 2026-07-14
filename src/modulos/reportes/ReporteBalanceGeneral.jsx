import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function ReporteBalanceGeneral() {
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

      {/* Main card */}
      <div className="card" style={{ padding: '32px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)', borderRadius: '16px', minHeight: '600px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '40px' }}>
          Balance General Consolidado
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
          {/* Activos Column */}
          <div>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-primary)', borderBottom: '2px solid var(--color-primary)', paddingBottom: '8px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ACTIVOS
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <span>Disponible / Caja y Bancos</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>-$ 131.944.440</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <span>Clientes Nacionales / CxC</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>$ 67.913.300</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <span>Propiedad Planta y Equipo</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>$ 16.500.000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#ef4444' }}>
                <span>(-) Depreciación Acumulada</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>-$ 1.375.000</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px dashed var(--border-color)' }}>
                <span>TOTAL ACTIVOS</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>-$ 48.906.140</span>
              </div>
            </div>
          </div>

          {/* Pasivos y Patrimonio Column */}
          <div>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', borderBottom: '2px solid #475569', paddingBottom: '8px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              PASIVOS Y PATRIMONIO
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px', textTransform: 'uppercase' }}>
                PASIVOS
              </h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <span>Proveedores Nacionales / CxP</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>$ 0</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <span>IVA por Pagar</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>$ 15.825.860</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '12px', marginTop: '8px', marginBottom: '16px' }}>
                <span>TOTAL PASIVOS</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>$ 15.825.860</span>
              </div>

              <h4 style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px', marginTop: '8px', textTransform: 'uppercase' }}>
                PATRIMONIO
              </h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <span>Capital Social</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>$ 50.000.000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <span>Resultado del Ejercicio</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>-$ 116.619.490</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '12px', marginTop: '8px' }}>
                <span>TOTAL PATRIMONIO</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>-$ 66.619.490</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
