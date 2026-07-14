import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ReporteAgingCxC from './ReporteAgingCxC';
import ReporteAgingCxP from './ReporteAgingCxP';
import ReporteEstadoResultados from './ReporteEstadoResultados';
import ReporteBalanceGeneral from './ReporteBalanceGeneral';
import ReporteMovimientosCuenta from './ReporteMovimientosCuenta';
import ReporteBalancePrueba from './ReporteBalancePrueba';

export default function PaginaReportes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get('category');
  const report = searchParams.get('report');

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('rebel_reports_favorites')) || [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (title) => {
    setFavorites(prev => {
      const newFavs = prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title];
      localStorage.setItem('rebel_reports_favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const categories = [
    {
      id: 'Ventas',
      label: 'Ventas',
      icon: '📄',
      desc: 'Ventas generales · por ítem · cliente · zona · rentabilidad',
      count: '7 reportes'
    },
    {
      id: 'Administrativos',
      label: 'Administrativos',
      icon: '📋',
      desc: 'CxC aging · CxP aging · Inventario · Ingresos y gastos · Anual',
      count: '7 reportes'
    },
    {
      id: 'Contables',
      label: 'Contables',
      icon: '📒',
      desc: 'Estado de resultados · Balance · Libros oficiales · Auxiliares',
      count: '9 reportes'
    },
    {
      id: 'Fiscales',
      label: 'Fiscales',
      icon: '🏛️',
      desc: 'IVA · Retefuente · ICA · Formulario 350 · Certificados',
      count: '5 reportes'
    },
    {
      id: 'Inventarios',
      label: 'Inventarios',
      icon: '📦',
      desc: 'Kárdex · Existencias · Valorización · Rotación',
      count: '4 reportes'
    },
    {
      id: 'Nomina',
      label: 'Nómina',
      icon: '👤',
      desc: 'Costos · PILA · Certificados de ingresos y retenciones',
      count: '3 reportes'
    },
    {
      id: 'Financieros',
      label: 'Financieros',
      icon: '📊',
      desc: 'Flujo de caja · Presupuesto vs ejecución',
      count: '2 reportes'
    },
    {
      id: 'Exogena',
      label: 'Información Exógena DIAN',
      icon: '🏛️',
      desc: 'Formatos 1001-1003-1005-1006-1007-1008-1009-2276',
      count: '8 formatos'
    }
  ];

  const reportsList = {
    Ventas: [
      { title: 'Ventas Generales', desc: 'Ventas brutas, devoluciones, notas y cobros.', status: 'Disponible', tag: 'VENTAS' },
      { title: 'Ventas por Cliente', desc: 'Concentración y ticket promedio por cliente.', status: 'Disponible', tag: 'VENTAS' },
      { title: 'Ventas por Ítem', desc: 'Cantidades y montos vendidos de productos/servicios.', status: 'Próximamente', tag: 'VENTAS' },
      { title: 'Ventas por Vendedor', desc: 'Rendimiento y comisiones por asesor comercial.', status: 'Próximamente', tag: 'VENTAS' },
      { title: 'Ventas por Zona/Región', desc: 'Distribución geográfica de las ventas.', status: 'Próximamente', tag: 'VENTAS' },
      { title: 'Rentabilidad por Ítem', desc: 'Margen de contribución cruzado con costo de inventario.', status: 'Próximamente', tag: 'VENTAS' },
      { title: 'Ventas Diarias', desc: 'Reporte tabular diario por método de pago.', status: 'Próximamente', tag: 'VENTAS' }
    ],
    Administrativos: [
      { title: 'Cuentas por Cobrar (Aging CxC)', desc: 'Análisis de cartera vencida por edades y clientes.', status: 'Disponible', tag: 'ADMINISTRATIVOS' },
      { title: 'Cuentas por Pagar (Aging CxP)', desc: 'Análisis de obligaciones vencidas por proveedores.', status: 'Disponible', tag: 'ADMINISTRATIVOS' },
      { title: 'Valor de Inventario', desc: 'Existencias actuales valorizadas al costo.', status: 'Próximamente', tag: 'ADMINISTRATIVOS' },
      { title: 'Reporte de Compras', desc: 'Facturas de proveedores y documentos soporte.', status: 'Disponible', tag: 'ADMINISTRATIVOS' },
      { title: 'Historial de Transacciones', desc: 'Entradas y salidas de efectivo acumuladas.', status: 'Próximamente', tag: 'ADMINISTRATIVOS' },
      { title: 'Reporte Comparativo Anual', desc: 'Evolución mes a mes de ingresos y gastos.', status: 'Próximamente', tag: 'ADMINISTRATIVOS' },
      { title: 'Ingresos y Gastos', desc: 'Resumen de utilidades antes de impuestos.', status: 'Próximamente', tag: 'ADMINISTRATIVOS' }
    ],
    Contables: [
      { title: 'Estado de Resultados (P&G)', desc: 'Ingresos, costos y gastos oficiales bajo NIIF.', status: 'Disponible', tag: 'CONTABLES' },
      { title: 'Balance General', desc: 'Estado de situación financiera (Activo, Pasivo, Patrimonio).', status: 'Disponible', tag: 'CONTABLES' },
      { title: 'Movimientos por Cuenta Contable', desc: 'Extracto detallado de transacciones por cuenta PUC.', status: 'Disponible', tag: 'CONTABLES' },
      { title: 'Libro Diario Oficial', desc: 'Asientos contables ordenados cronológicamente.', status: 'Disponible', tag: 'CONTABLES' },
      { title: 'Libro Mayor y Balances', desc: 'Saldos acumulados mensuales por cuenta.', status: 'Próximamente', tag: 'CONTABLES' },
      { title: 'Libro Auxiliar Oficial', desc: 'Detalle de transacciones auxiliares por tercero.', status: 'Próximamente', tag: 'CONTABLES' },
      { title: 'Balance de Prueba', desc: 'Verificación de sumas de débitos y créditos.', status: 'Disponible', tag: 'CONTABLES' },
      { title: 'Auxiliar por Tercero', desc: 'Estado de cuenta contable por contacto.', status: 'Próximamente', tag: 'CONTABLES' },
      { title: 'Balance de Prueba por Tercero', desc: 'Saldos desglosados combinados.', status: 'Disponible', tag: 'CONTABLES' }
    ],
    Inventarios: [
      { title: 'Kárdex de Inventario', desc: 'Historial de movimientos de stock por ítem.', status: 'Disponible', tag: 'INVENTARIOS' },
      { title: 'Existencias por Bodega', desc: 'Disponibilidad de existencias físicas por ubicación.', status: 'Disponible', tag: 'INVENTARIOS' },
      { title: 'Valorización de Inventario', desc: 'Comparativa de métodos FIFO y promedio ponderado.', status: 'Disponible', tag: 'INVENTARIOS' },
      { title: 'Rotación de Inventario', desc: 'Días promedio en stock y velocidad de ventas.', status: 'Disponible', tag: 'INVENTARIOS' }
    ]
  };

  const handleCategoryClick = (catId) => setSearchParams({ category: catId });
  const handleBack = () => { searchParams.delete('category'); setSearchParams(searchParams); };
  const handleCatalogBack = () => { searchParams.delete('report'); setSearchParams(searchParams); };
  const handleReportClick = (reportTitle, status) => { 
    if (reportTitle === 'Reporte de Compras') {
      navigate('/gastos?tab=facturas');
      return;
    }
    if (status === 'Disponible') {
      setSearchParams({ category, report: reportTitle }); 
    }
  };

  const renderStatusBadge = (status) => {
    let bg = '#f1f5f9'; let color = '#64748b';
    if (status === 'pagada') { bg = 'rgba(34, 197, 94, 0.1)'; color = '#16a34a'; }
    else if (status === 'emitida') { bg = 'rgba(37, 99, 235, 0.1)'; color = '#2563eb'; }
    else if (status === 'anulada') { bg = 'rgba(148, 163, 184, 0.1)'; color = '#64748b'; }
    return (
      <span className="chip" style={{ background: bg, color: color, display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '600', padding: '3px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color }}></span>{status}
      </span>
    );
  };

  const renderReportDetail = () => {
    const reportLower = report?.toLowerCase();
    if (reportLower === 'cuentas por cobrar (aging cxc)') {
      return <ReporteAgingCxC />;
    }
    if (reportLower === 'cuentas por pagar (aging cxp)') {
      return <ReporteAgingCxP />;
    }
    if (reportLower === 'estado de resultados (p&g)') {
      return <ReporteEstadoResultados />;
    }
    if (reportLower === 'balance general') {
      return <ReporteBalanceGeneral />;
    }
    if (reportLower === 'movimientos por cuenta contable') {
      return <ReporteMovimientosCuenta />;
    }
    if (reportLower === 'balance de prueba' || reportLower === 'balance de prueba por tercero') {
      return <ReporteBalancePrueba />;
    }
    
    // Other specific reports from before
    if (report === 'Ventas Generales') {
      return (
        <div className="fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '15px' }}>
            {[
              { label: 'VENTAS BRUTAS', val: '$ 71.394.000', sub: 'Ventas facturadas' },
              { label: 'DEVOLUCIONES (NC)', val: '$ 150.000', sub: 'Notas crédito aplicadas', color: 'color:var(--color-danger);' },
              { label: 'VENTAS NETAS', val: '$ 71.244.000', sub: 'Ventas menos notas crédito' },
              { label: 'IVA GENERADO', val: '$ 13.564.860', sub: 'IVA en ventas' },
              { label: 'FACTURAS EMITIDAS', val: '14', sub: 'Cantidad de documentos' }
            ].map((kpi, idx) => (
              <div key={idx} className="card" style={{ marginBottom: 0, padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)', borderRadius: '12px' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>{kpi.label}</span>
                <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: 0, color: kpi.color ? 'var(--color-danger)' : 'var(--text-primary)' }}>{kpi.val}</h3>
                <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{kpi.sub}</span>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: '15px', marginBottom: '15px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)', borderRadius: '12px' }}>
            <h4 style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '10px' }}>Ventas Brutas vs Devoluciones (Mensual)</h4>
            <div style={{ height: '150px', display: 'flex', alignItems: 'flex-end', gap: '30px', padding: '0 20px', borderBottom: '1px solid var(--border-color)', background: 'white' }}>
              <svg style={{ width: '100%', height: '100%' }}>
                <rect x="10%" y="20%" width="30" height="65%" fill="var(--color-primary)" rx="3"/>
                <text x="10%" y="95%" fontSize="10" fill="var(--text-muted)">Ventas Brutas</text>
                <rect x="50%" y="80%" width="30" height="5%" fill="var(--color-danger)" rx="3"/>
                <text x="50%" y="95%" fontSize="10" fill="var(--text-muted)">Devoluciones</text>
              </svg>
            </div>
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)', borderRadius: '12px', marginBottom: '15px' }}>
            <div className="card-header" style={{ borderBottom: '1px solid var(--border-color)', padding: '10px 15px' }}>
              <span className="card-title" style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>Transacciones del Período</span>
            </div>
            <div className="table-wrapper" style={{ overflowX: 'hidden' }}>
              <table className="data-table" style={{ fontSize: '11px' }}>
                <thead>
                  <tr>
                    <th># Factura</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Vencimiento</th>
                    <th style={{ textAlign: 'right' }}>Subtotal</th>
                    <th style={{ textAlign: 'right' }}>IVA</th>
                    <th style={{ textAlign: 'right' }}>Total</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'FEIP-0847', client: 'Constructora Andina S.A.S', date: '5 de jun de 2026', due: '5 de jul de 2026', sub: 8400000, iva: 1596000, tot: 9996000, status: 'emitida' },
                    { id: 'FEIP-0846', client: 'Distribuidora El Pino Ltda.', date: '4 de jun de 2026', due: '4 de jul de 2026', sub: 1890000, iva: 359100, tot: 2249100, status: 'emitida' },
                    { id: 'FEIP-0845', client: 'Inversiones Torres & Co.', date: '15 de may de 2026', due: '1 de jun de 2026', sub: 700000, iva: 133000, tot: 833000, status: 'emitida' },
                    { id: 'FEIP-0844', client: 'Textiles Medina S.A.', date: '1 de jun de 2026', due: '1 de jun de 2026', sub: 450000, iva: 85500, tot: 535500, status: 'pagada' },
                    { id: 'FEIP-0843', client: 'Grupo Empresarial Cali S.A.S', date: '1 de jun de 2026', due: '1 de jul de 2026', sub: 14000000, iva: 2660000, tot: 16660000, status: 'emitida' },
                    { id: 'FEIP-0842', client: 'Alimentos y Bebidas del Valle', date: '2 de may de 2026', due: '2 de jun de 2026', sub: 570000, iva: 108300, tot: 678300, status: 'emitida' },
                    { id: 'FEIP-0841', client: 'Ferretería Industrial Norte', date: '5 de may de 2026', due: '5 de jun de 2026', sub: 378000, iva: 71820, tot: 449820, status: 'pagada' },
                    { id: 'FEIP-0839', client: 'Constructora Andina S.A.S', date: '10 de may de 2026', due: '10 de jun de 2026', sub: 900000, iva: 171000, tot: 1071000, status: 'anulada' },
                    { id: 'FEIP-0838', client: 'Distribuidora El Pino Ltda.', date: '6 de jun de 2026', due: '6 de jun de 2026', sub: 1750000, iva: 332500, tot: 2082500, status: 'pagada' },
                    { id: 'FEIP-0837', client: 'Inversiones Torres & Co.', date: '15 de abr de 2026', due: '15 de may de 2026', sub: 11200000, iva: 2128000, tot: 13328000, status: 'emitida' },
                    { id: 'FEIP-0836', client: 'Editorial Pacífico S.A.S', date: '12 de may de 2026', due: '12 de jun de 2026', sub: 756000, iva: 143640, tot: 899640, status: 'pagada' },
                    { id: 'FEIP-0835', client: 'Ferretería Industrial Norte', date: '3 de jun de 2026', due: '3 de jul de 2026', sub: 2250000, iva: 427500, tot: 2677500, status: 'emitida' },
                    { id: 'FEIP-0834', client: 'Constructora Andina S.A.S', date: '5 de jun de 2026', due: '5 de jul de 2026', sub: 28000000, iva: 5320000, tot: 33320000, status: 'emitida' },
                    { id: 'FEIP-0833', client: 'Alimentos y Bebidas del Valle', date: '1 de may de 2026', due: '1 de jun de 2026', sub: 1050000, iva: 199500, tot: 1249500, status: 'emitida' }
                  ].map((row, i) => (
                    <tr key={i}>
                      <td><strong>{row.id}</strong></td>
                      <td>{row.client}</td>
                      <td>{row.date}</td>
                      <td>{row.due}</td>
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                        <span style={{ color: 'var(--text-muted)', marginRight: '4px' }}>$</span>
                        {row.sub.toLocaleString('es-CO')}
                      </td>
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                        <span style={{ color: 'var(--text-muted)', marginRight: '4px' }}>$</span>
                        {row.iva.toLocaleString('es-CO')}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: '600', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                        <span style={{ color: 'var(--text-muted)', marginRight: '4px', fontWeight: 'normal' }}>$</span>
                        {row.tot.toLocaleString('es-CO')}
                      </td>
                      <td>{renderStatusBadge(row.status)}</td>
                    </tr>
                  ))}
                  <tr style={{ background: '#f8fafc', fontWeight: 'bold', borderTop: '2px solid var(--border-color)' }}>
                    <td colSpan="4">TOTALES</td>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                      <span style={{ color: 'var(--text-muted)', marginRight: '4px' }}>$</span>
                      71.394.000
                    </td>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                      <span style={{ color: 'var(--text-muted)', marginRight: '4px' }}>$</span>
                      13.564.860
                    </td>
                    <td style={{ textAlign: 'right', color: 'var(--color-primary)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                      <span style={{ color: 'var(--color-primary)', opacity: 0.7, marginRight: '4px' }}>$</span>
                      86.029.860
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
    
    // Ventas por Cliente and others ...
    return (
      <div className="card" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>Reporte: {report}</p>
      </div>
    );
  };

  if (category && report) {
    const reportLower = report?.toLowerCase();
    const selfContainedReports = ['estado de resultados (p&g)', 'balance general', 'movimientos por cuenta contable', 'balance de prueba', 'balance de prueba por tercero'];
    
    if (selfContainedReports.includes(reportLower)) {
      return (
        <div className="page-container fade-in" style={{ paddingBottom: '32px' }}>
          {renderReportDetail()}
        </div>
      );
    }

    return (
      <div className="page-container fade-in" style={{ paddingBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px' }}>
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={handleCatalogBack}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '32px', padding: '0 12px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', fontWeight: '500', fontSize: '12px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_back</span>
            Catálogo
          </button>
        </div>

        <div className="card" style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              {report?.toLowerCase() === 'aging cxc' ? 'Corte de Cartera' : report?.toLowerCase() === 'aging cxp' ? 'Corte de Cuentas por Pagar' : 'Filtros de Reporte'}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Período:</span>
            <select className="input-select" style={{ height: '30px', padding: '0 24px 0 8px', fontSize: '12px', background: '#eff4ff', border: 'none', borderRadius: '6px', width: 'auto', minWidth: '80px' }}>
              <option>Todos</option>
              <option>Últimos 15 días</option>
              <option>Este mes</option>
              <option>Mes anterior</option>
              <option>Año corrido</option>
            </select>
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

        {renderReportDetail()}
      </div>
    );
  }

  if (category) {
    let list = [];
    if (category === 'Favoritos') {
      const allReports = Object.values(reportsList).flat();
      list = allReports.filter(rep => favorites.includes(rep.title));
    } else {
      list = reportsList[category] || [];
    }
    return (
      <div className="page-container fade-in" style={{ paddingBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px' }}>
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={handleBack}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '32px', padding: '0 12px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', fontWeight: '500', fontSize: '12px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_back</span>
            Volver
          </button>
        </div>

        <div className="card" style={{ padding: '24px 32px', borderRadius: '16px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '20px' }}>
            Listado de Informes ({category === 'Exogena' ? 'Información Exógena DIAN' : category})
          </h3>

          {list.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {list.map((rep, idx) => (
                <div key={idx} className="report-card">
                  <span 
                    className="material-symbols-outlined" 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(rep.title); }}
                    style={{ 
                      position: 'absolute', top: '14px', right: '14px', fontSize: '18px', 
                      color: favorites.includes(rep.title) ? '#eab308' : '#475569', 
                      fontVariationSettings: favorites.includes(rep.title) ? "'FILL' 1" : "'FILL' 0",
                      cursor: 'pointer' 
                    }}
                  >
                    {favorites.includes(rep.title) ? 'star' : 'star_outline'}
                  </span>
                  <div>
                    <span className="report-card-tag">{rep.tag}</span>
                    <h4 
                      className={`report-card-title ${rep.status === 'Disponible' ? 'clickable' : 'disabled'}`}
                      onClick={() => handleReportClick(rep.title, rep.status)}
                    >
                      {rep.title}
                    </h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4', margin: 0 }}>
                      {rep.desc}
                    </p>
                  </div>
                  <div style={{ marginTop: '12px' }}>
                    <span className={rep.status === 'Disponible' ? 'status-disponible' : 'status-proximamente'}>
                      {rep.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.5 }}>
                {category === 'Favoritos' ? 'star_outline' : 'construction'}
              </span>
              <h4 style={{ fontSize: '14px' }}>
                {category === 'Favoritos' ? 'Sin favoritos' : 'Listado en construcción'}
              </h4>
              <p style={{ fontSize: '12px' }}>
                {category === 'Favoritos' ? 'Marca la estrella en cualquier reporte para agregarlo aquí.' : 'Próximamente se listarán los informes correspondientes a este módulo.'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container fade-in" style={{ paddingBottom: '32px' }}>
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <div className="page-header-left">
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px', letterSpacing: '-0.5px' }}>
            Reportes & Indicadores
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>
            Hub centralizado · 37 reportes contables, administrativos y exógena DIAN.
          </p>
        </div>
      </div>

      <div className="card" style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: 'white', display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '320px' }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', color: '#94a3b8' }}>
            search
          </span>
          <input 
            type="text" 
            placeholder="Buscar reporte por nombre o descripción..." 
            className="input" 
            style={{ width: '100%', paddingLeft: '32px', height: '34px', fontSize: '12px', background: '#eff4ff', border: '1px solid transparent', borderRadius: '6px' }}
          />
        </div>
        <button 
          className="btn btn-secondary" 
          onClick={() => setSearchParams({ category: 'Favoritos' })}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '34px', padding: '0 12px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '12px', color: 'var(--text-primary)', fontWeight: '500' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#eab308' }}>star</span>
          Favoritos
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {categories.map((cat, idx) => (
          <div 
            key={idx} className="card" onClick={() => handleCategoryClick(cat.id)}
            style={{ 
              padding: '18px 20px', borderRadius: '12px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)',
              cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '175px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.03)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.01)'; }}
          >
            <div>
              <div style={{ fontSize: '24px', marginBottom: '12px', lineHeight: 1 }}>
                {cat.icon}
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '6px' }}>{cat.label}</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4', margin: '0 0 12px 0' }}>{cat.desc}</p>
            </div>
            <div>
              <span style={{ fontSize: '10px', padding: '3px 10px', borderRadius: '12px', background: '#eff6ff', color: 'var(--color-primary)', fontWeight: '700', display: 'inline-block' }}>
                {cat.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
