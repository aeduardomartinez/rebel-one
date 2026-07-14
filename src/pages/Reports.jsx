import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Reports() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const report = searchParams.get('report');

  const categories = [
    {
      id: 'Ventas',
      label: 'Ventas',
      icon: 'description',
      iconBg: '#f3e8ff',
      iconColor: '#a855f7',
      desc: 'Ventas generales · por ítem · cliente · zona · rentabilidad',
      count: '7 reportes'
    },
    {
      id: 'Administrativos',
      label: 'Administrativos',
      icon: 'assignment',
      iconBg: '#ffedd5',
      iconColor: '#f97316',
      desc: 'CxC aging · CxP aging · Inventario · Ingresos y gastos · Anual',
      count: '7 reportes'
    },
    {
      id: 'Contables',
      label: 'Contables',
      icon: 'book',
      iconBg: '#fef9c3',
      iconColor: '#ca8a04',
      desc: 'Estado de resultados · Balance · Libros oficiales · Auxiliares',
      count: '9 reportes'
    },
    {
      id: 'Fiscales',
      label: 'Fiscales',
      icon: 'account_balance',
      iconBg: '#dbeafe',
      iconColor: '#2563eb',
      desc: 'IVA · Retefuente · ICA · Formulario 350 · Certificados',
      count: '5 reportes'
    },
    {
      id: 'Inventarios',
      label: 'Inventarios',
      icon: 'inventory_2',
      iconBg: '#ffe4e6',
      iconColor: '#f43f5e',
      desc: 'Kárdex · Existencias · Valorización · Rotación',
      count: '4 reportes'
    },
    {
      id: 'Nomina',
      label: 'Nómina',
      icon: 'badge',
      iconBg: '#fae8ff',
      iconColor: '#d946ef',
      desc: 'Costos · PILA · Certificados de ingresos y retenciones',
      count: '3 reportes'
    },
    {
      id: 'Financieros',
      label: 'Financieros',
      icon: 'query_stats',
      iconBg: '#ecfdf5',
      iconColor: '#10b981',
      desc: 'Flujo de caja · Presupuesto vs ejecución',
      count: '2 reportes'
    },
    {
      id: 'Exogena',
      label: 'Información Exógena DIAN',
      icon: 'corporate_fare',
      iconBg: '#e0f2fe',
      iconColor: '#0284c7',
      desc: 'Formatos 1001-1003-1005-1006-1007-1008-1009-2276',
      count: '8 formatos'
    }
  ];

  const reportsList = {
    Ventas: [
      {
        title: 'Ventas Generales',
        desc: 'Ventas brutas, devoluciones, notas y cobros.',
        status: 'Disponible',
        tag: 'VENTAS'
      },
      {
        title: 'Ventas por Cliente',
        desc: 'Concentración y ticket promedio por cliente.',
        status: 'Disponible',
        tag: 'VENTAS'
      },
      {
        title: 'Ventas por Ítem',
        desc: 'Cantidades y montos vendidos de productos/servicios.',
        status: 'Próximamente',
        tag: 'VENTAS'
      },
      {
        title: 'Ventas por Vendedor',
        desc: 'Rendimiento y comisiones por asesor comercial.',
        status: 'Próximamente',
        tag: 'VENTAS'
      },
      {
        title: 'Ventas por Zona/Región',
        desc: 'Distribución geográfica de las ventas.',
        status: 'Próximamente',
        tag: 'VENTAS'
      },
      {
        title: 'Rentabilidad por Ítem',
        desc: 'Margen de contribución cruzado con costo de inventario.',
        status: 'Próximamente',
        tag: 'VENTAS'
      },
      {
        title: 'Ventas Diarias',
        desc: 'Reporte tabular diario por método de pago.',
        status: 'Próximamente',
        tag: 'VENTAS'
      }
    ],
    Administrativos: [
      {
        title: 'Cuentas por Cobrar (Aging CxC)',
        desc: 'Análisis de cartera vencida por edades y clientes.',
        status: 'Disponible',
        tag: 'ADMINISTRATIVOS'
      },
      {
        title: 'Cuentas por Pagar (Aging CxP)',
        desc: 'Análisis de obligaciones vencidas por proveedores.',
        status: 'Disponible',
        tag: 'ADMINISTRATIVOS'
      },
      {
        title: 'Valor de Inventario',
        desc: 'Existencias actuales valorizadas al costo.',
        status: 'Próximamente',
        tag: 'ADMINISTRATIVOS'
      },
      {
        title: 'Reporte de Compras',
        desc: 'Facturas de proveedores y documentos soporte.',
        status: 'Disponible',
        tag: 'ADMINISTRATIVOS'
      },
      {
        title: 'Historial de Transacciones',
        desc: 'Entradas y salidas de efectivo acumuladas.',
        status: 'Próximamente',
        tag: 'ADMINISTRATIVOS'
      },
      {
        title: 'Reporte Comparativo Anual',
        desc: 'Evolución mes a mes de ingresos y gastos.',
        status: 'Próximamente',
        tag: 'ADMINISTRATIVOS'
      },
      {
        title: 'Ingresos y Gastos',
        desc: 'Resumen de utilidades antes de impuestos.',
        status: 'Próximamente',
        tag: 'ADMINISTRATIVOS'
      }
    ]
  };

  const handleCategoryClick = (catId) => {
    setSearchParams({ category: catId });
  };

  const handleBack = () => {
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  const handleCatalogBack = () => {
    searchParams.delete('report');
    setSearchParams(searchParams);
  };

  const handleReportClick = (reportTitle, status) => {
    if (status === 'Disponible') {
      setSearchParams({ category, report: reportTitle });
    }
  };

  // Helper para renderizar los chips de estado tal como la plantilla
  const renderStatusBadge = (status) => {
    let bg = '#f1f5f9';
    let color = '#64748b';
    if (status === 'pagada') {
      bg = 'rgba(34, 197, 94, 0.1)';
      color = '#16a34a';
    } else if (status === 'emitida') {
      bg = 'rgba(37, 99, 235, 0.1)';
      color = '#2563eb';
    } else if (status === 'anulada') {
      bg = 'rgba(148, 163, 184, 0.1)';
      color = '#64748b';
    }

    return (
      <span className="chip" style={{ background: bg, color: color, display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '600', padding: '3px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color }}></span>
        {status}
      </span>
    );
  };

  // Renderizador de los reportes detallados "Disponibles"
  const renderReportDetail = () => {
    if (report === 'Ventas Generales') {
      return (
        <div className="fade-in">
          {/* KPI Cards Grid de la plantilla */}
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

          {/* SVG Chart de la plantilla */}
          <div className="card" style={{ padding: '15px', marginBottom: '15px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)', borderRadius: '12px' }}>
            <h4 style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '10px' }}>Ventas Brutas vs Devoluciones (Mensual)</h4>
            <div style={{ height: '150px', display: 'flex', alignItems: 'flex-end', gap: '30px', padding: '0 20px', borderBottom: '1px solid var(--border-color)', background: 'white' }}>
              <svg style={{ width: '100%', height: '100%' }}>
                {/* Ventas Brutas Bar */}
                <rect x="10%" y="20%" width="30" height="65%" fill="var(--color-primary)" rx="3"/>
                <text x="10%" y="95%" fontSize="10" fill="var(--text-muted)">Ventas Brutas</text>
                
                {/* Devoluciones Bar */}
                <rect x="50%" y="80%" width="30" height="5%" fill="var(--color-danger)" rx="3"/>
                <text x="50%" y="95%" fontSize="10" fill="var(--text-muted)">Devoluciones</text>
              </svg>
            </div>
          </div>

          {/* Table Card (Edge-to-Edge de la plantilla) */}
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
                      <td style={{ textAlign: 'right' }}>$ {row.sub.toLocaleString('es-CO')}</td>
                      <td style={{ textAlign: 'right' }}>$ {row.iva.toLocaleString('es-CO')}</td>
                      <td style={{ textAlign: 'right', fontWeight: '600' }}>$ {row.tot.toLocaleString('es-CO')}</td>
                      <td>{renderStatusBadge(row.status)}</td>
                    </tr>
                  ))}
                  <tr style={{ background: '#f8fafc', fontWeight: 'bold', borderTop: '2px solid var(--border-color)' }}>
                    <td colSpan="4">TOTALES</td>
                    <td style={{ textAlign: 'right' }}>$ 71.394.000</td>
                    <td style={{ textAlign: 'right' }}>$ 13.564.860</td>
                    <td style={{ textAlign: 'right', color: 'var(--color-primary)' }}>$ 86.029.860</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    if (report === 'Ventas por Cliente') {
      return (
        <div className="fade-in">
          {/* KPI Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '15px' }}>
            {[
              { label: 'CLIENTES FACTURADOS', val: '3', sub: 'Clientes con transacciones' },
              { label: 'TICKET PROMEDIO', val: '$ 4.359.400', sub: 'Promedio por factura' },
              { label: 'VENTAS TOTALES', val: '$ 13.078.200', sub: 'Suma de ventas brutas' }
            ].map((kpi, idx) => (
              <div key={idx} className="card" style={{ marginBottom: 0, padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)', borderRadius: '12px' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>{kpi.label}</span>
                <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: 0 }}>{kpi.val}</h3>
                <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{kpi.sub}</span>
              </div>
            ))}
          </div>

          {/* Table Card (Edge-to-Edge) */}
          <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)', borderRadius: '12px', marginBottom: '15px' }}>
            <div className="card-header" style={{ borderBottom: '1px solid var(--border-color)', padding: '10px 15px' }}>
              <span className="card-title" style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>Ventas por Cliente del Período</span>
            </div>
            <div className="table-wrapper" style={{ overflowX: 'hidden' }}>
              <table className="data-table" style={{ fontSize: '11px' }}>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Identificación</th>
                    <th style={{ textAlign: 'center' }}>Cant. Facturas</th>
                    <th style={{ textAlign: 'right' }}>Total Facturado</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { client: 'Constructora Andina S.A.S', nit: '901.456.789-2', qty: 1, tot: 9996000 },
                    { client: 'Distribuidora El Pino Ltda.', nit: '800.123.456-0', qty: 1, tot: 2249100 },
                    { client: 'Inversiones Torres & Co.', nit: '900.987.654-1', qty: 1, tot: 833000 }
                  ].map((row, i) => (
                    <tr key={i}>
                      <td><strong>{row.client}</strong></td>
                      <td>NIT {row.nit}</td>
                      <td style={{ textAlign: 'center' }}>{row.qty}</td>
                      <td style={{ textAlign: 'right', fontWeight: '600' }}>$ {row.tot.toLocaleString('es-CO')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    if (report === 'Cuentas por Cobrar (Aging CxC)') {
      return (
        <div className="fade-in">
          {/* KPI Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '15px' }}>
            {[
              { label: 'CARTERA TOTAL', val: '$ 13.078.200', sub: 'Total por cobrar' },
              { label: 'AL DÍA', val: '$ 12.245.200', sub: 'Por vencer o al día' },
              { label: 'VENCIDA (1-30 DÍAS)', val: '$ 833.000', sub: 'Vencimiento cercano', color: '#eab308' },
              { label: 'VENCIDA (>30 DÍAS)', val: '$ 0', sub: 'Mora crítica' }
            ].map((kpi, idx) => (
              <div key={idx} className="card" style={{ marginBottom: 0, padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)', borderRadius: '12px' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>{kpi.label}</span>
                <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: 0, color: kpi.color || 'var(--text-primary)' }}>{kpi.val}</h3>
                <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{kpi.sub}</span>
              </div>
            ))}
          </div>

          {/* Table Card (Edge-to-Edge) */}
          <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)', borderRadius: '12px', marginBottom: '15px' }}>
            <div className="card-header" style={{ borderBottom: '1px solid var(--border-color)', padding: '10px 15px' }}>
              <span className="card-title" style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>Análisis de Cuentas por Cobrar</span>
            </div>
            <div className="table-wrapper" style={{ overflowX: 'hidden' }}>
              <table className="data-table" style={{ fontSize: '11px' }}>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th style={{ textAlign: 'right' }}>Corriente</th>
                    <th style={{ textAlign: 'right' }}>1 - 30 Días</th>
                    <th style={{ textAlign: 'right' }}>31 - 60 Días</th>
                    <th style={{ textAlign: 'right' }}>Total Deuda</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Constructora Andina S.A.S', current: 9996000, d1: 0, d2: 0, tot: 9996000 },
                    { name: 'Distribuidora El Pino Ltda.', current: 2249100, d1: 0, d2: 0, tot: 2249100 },
                    { name: 'Inversiones Torres & Co.', current: 0, d1: 833000, d2: 0, tot: 833000 }
                  ].map((row, i) => (
                    <tr key={i}>
                      <td><strong>{row.name}</strong></td>
                      <td style={{ textAlign: 'right' }}>$ {row.current.toLocaleString('es-CO')}</td>
                      <td style={{ textAlign: 'right', color: row.d1 > 0 ? '#eab308' : 'inherit' }}>$ {row.d1.toLocaleString('es-CO')}</td>
                      <td style={{ textAlign: 'right' }}>$ {row.d2.toLocaleString('es-CO')}</td>
                      <td style={{ textAlign: 'right', fontWeight: '600' }}>$ {row.tot.toLocaleString('es-CO')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    if (report === 'Cuentas por Pagar (Aging CxP)') {
      return (
        <div className="fade-in">
          {/* KPI Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '15px' }}>
            {[
              { label: 'OBLIGACIONES TOTALES', val: '$ 8.760.000', sub: 'Total por pagar' },
              { label: 'AL DÍA', val: '$ 0', sub: 'Por pagar vigente' },
              { label: 'VENCIDA (1-30 DÍAS)', val: '$ 8.760.000', sub: 'En mora inicial', color: '#eab308' },
              { label: 'VENCIDA (>30 DÍAS)', val: '$ 0', sub: 'Mora acumulada' }
            ].map((kpi, idx) => (
              <div key={idx} className="card" style={{ marginBottom: 0, padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)', borderRadius: '12px' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>{kpi.label}</span>
                <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: 0, color: kpi.color || 'var(--text-primary)' }}>{kpi.val}</h3>
                <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{kpi.sub}</span>
              </div>
            ))}
          </div>

          {/* Table Card (Edge-to-Edge) */}
          <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)', borderRadius: '12px', marginBottom: '15px' }}>
            <div className="card-header" style={{ borderBottom: '1px solid var(--border-color)', padding: '10px 15px' }}>
              <span className="card-title" style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>Análisis de Cuentas por Pagar</span>
            </div>
            <div className="table-wrapper" style={{ overflowX: 'hidden' }}>
              <table className="data-table" style={{ fontSize: '11px' }}>
                <thead>
                  <tr>
                    <th>Proveedor</th>
                    <th style={{ textAlign: 'right' }}>Corriente</th>
                    <th style={{ textAlign: 'right' }}>1 - 30 Días</th>
                    <th style={{ textAlign: 'right' }}>31 - 60 Días</th>
                    <th style={{ textAlign: 'right' }}>Total Mora</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Suministros Técnicos S.A.', current: 0, d1: 8760000, d2: 0, tot: 8760000 }
                  ].map((row, i) => (
                    <tr key={i}>
                      <td><strong>{row.name}</strong></td>
                      <td style={{ textAlign: 'right' }}>$ {row.current.toLocaleString('es-CO')}</td>
                      <td style={{ textAlign: 'right', color: '#eab308' }}>$ {row.d1.toLocaleString('es-CO')}</td>
                      <td style={{ textAlign: 'right' }}>$ {row.d2.toLocaleString('es-CO')}</td>
                      <td style={{ textAlign: 'right', fontWeight: '600' }}>$ {row.tot.toLocaleString('es-CO')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    if (report === 'Reporte de Compras') {
      return (
        <div className="fade-in">
          {/* KPI Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '15px' }}>
            {[
              { label: 'COMPRAS BRUTAS', val: '$ 1.740.000', sub: 'Compras facturadas' },
              { label: 'RETENCIONES APLICADAS', val: '$ 0', sub: 'Retención en la fuente' },
              { label: 'COMPRAS NETAS', val: '$ 1.740.000', sub: 'Compras menos notas crédito' },
              { label: 'DOCUMENTOS RECIBIDOS', val: '2', sub: 'Facturas y documentos soporte' }
            ].map((kpi, idx) => (
              <div key={idx} className="card" style={{ marginBottom: 0, padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)', borderRadius: '12px' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>{kpi.label}</span>
                <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: 0 }}>{kpi.val}</h3>
                <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{kpi.sub}</span>
              </div>
            ))}
          </div>

          {/* Table Card (Edge-to-Edge) */}
          <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)', borderRadius: '12px', marginBottom: '15px' }}>
            <div className="card-header" style={{ borderBottom: '1px solid var(--border-color)', padding: '10px 15px' }}>
              <span className="card-title" style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>Detalle de Compras del Período</span>
            </div>
            <div className="table-wrapper" style={{ overflowX: 'hidden' }}>
              <table className="data-table" style={{ fontSize: '11px' }}>
                <thead>
                  <tr>
                    <th># Documento</th>
                    <th>Proveedor</th>
                    <th>Fecha</th>
                    <th style={{ textAlign: 'right' }}>Subtotal</th>
                    <th style={{ textAlign: 'right' }}>IVA</th>
                    <th style={{ textAlign: 'right' }}>Total</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'FC-2024', provider: 'Suministros Técnicos S.A.', date: '2 de jun de 2026', sub: 1042017, iva: 197983, tot: 1240000, status: 'emitida' },
                    { id: 'DSE-0130', provider: 'Carlos Pérez', date: '28 de may de 2026', sub: 500000, iva: 0, tot: 500000, status: 'pagada' }
                  ].map((row, i) => (
                    <tr key={i}>
                      <td><strong>{row.id}</strong></td>
                      <td>{row.provider}</td>
                      <td>{row.date}</td>
                      <td style={{ textAlign: 'right' }}>$ {row.sub.toLocaleString('es-CO')}</td>
                      <td style={{ textAlign: 'right' }}>$ {row.iva.toLocaleString('es-CO')}</td>
                      <td style={{ textAlign: 'right', fontWeight: '600' }}>$ {row.tot.toLocaleString('es-CO')}</td>
                      <td>{renderStatusBadge(row.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  if (category && report) {
    return (
      <div className="page-container fade-in" style={{ paddingBottom: '32px' }}>
        {/* Breadcrumb & Volver */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
            <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={handleBack}>Reportes</span>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{report.toLowerCase()}</span>
          </div>
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={handleCatalogBack}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '32px', padding: '0 12px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', fontWeight: '500', fontSize: '12px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_back</span>
            Catálogo
          </button>
        </div>

        {/* Filters and Actions Row */}
        <div className="card" style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: 'white', display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Filtros de Reporte</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Periodo:</span>
            <select className="input-select" style={{ height: '30px', padding: '0 24px 0 8px', fontSize: '12px', background: '#eff4ff', border: 'none', borderRadius: '6px', width: 'auto', minWidth: '80px' }}>
              <option>Todos</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '30px', padding: '0 12px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '12px', fontWeight: '500' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>picture_as_pdf</span>
              PDF
            </button>
            <button className="btn className=btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '30px', padding: '0 12px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '12px', fontWeight: '500' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--color-primary)' }}>download</span>
              Excel
            </button>
          </div>
        </div>

        {/* Dynamic Report Content */}
        {renderReportDetail()}
      </div>
    );
  }

  if (category) {
    const list = reportsList[category] || [];
    return (
      <div className="page-container fade-in" style={{ paddingBottom: '32px' }}>
        {/* Breadcrumb & Volver */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
            <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={handleBack}>Reportes</span>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
              {category === 'Exogena' ? 'Información Exógena DIAN' : category}
            </span>
          </div>
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={handleBack}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '32px', padding: '0 12px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', fontWeight: '500', fontSize: '12px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_back</span>
            Volver
          </button>
        </div>

        {/* Card of Reports list */}
        <div className="card" style={{ padding: '24px 32px', borderRadius: '16px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '20px' }}>
            Listado de Informes ({category === 'Exogena' ? 'Información Exógena DIAN' : category})
          </h3>

          {list.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {list.map((rep, idx) => (
                <div 
                  key={idx} 
                  className="card" 
                  style={{ 
                    padding: '16px', 
                    borderRadius: '10px', 
                    border: '1px solid #f1f5f9', 
                    background: '#f8fafc',
                    boxShadow: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '140px',
                    position: 'relative'
                  }}
                >
                  {/* Star icon */}
                  <span className="material-symbols-outlined" style={{ position: 'absolute', top: '14px', right: '14px', fontSize: '16px', color: '#94a3b8', cursor: 'pointer' }}>
                    star
                  </span>

                  <div>
                    <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#64748b', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
                      {rep.tag}
                    </span>
                    <h4 
                      style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '4px', cursor: rep.status === 'Disponible' ? 'pointer' : 'default', textDecoration: rep.status === 'Disponible' ? 'underline' : 'none' }}
                      onClick={() => handleReportClick(rep.title, rep.status)}
                    >
                      {rep.title}
                    </h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4', margin: 0 }}>
                      {rep.desc}
                    </p>
                  </div>

                  <div style={{ marginTop: '12px' }}>
                    <span 
                      style={{ 
                        fontSize: '10px', 
                        padding: '3px 8px', 
                        borderRadius: '4px',
                        background: rep.status === 'Disponible' ? 'rgba(34, 197, 94, 0.1)' : '#f1f5f9',
                        color: rep.status === 'Disponible' ? '#16a34a' : '#64748b',
                        fontWeight: '600',
                        display: 'inline-block'
                      }}
                    >
                      {rep.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.5 }}>construction</span>
              <h4 style={{ fontSize: '14px' }}>Listado en construcción</h4>
              <p style={{ fontSize: '12px' }}>Próximamente se listarán los informes correspondientes a este módulo.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container fade-in" style={{ paddingBottom: '32px' }}>
      {/* Header */}
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

      {/* Filter Row */}
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
          style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '34px', padding: '0 12px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '12px', color: 'var(--text-primary)', fontWeight: '500' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#eab308' }}>star</span>
          Favoritos
        </button>
      </div>

      {/* Categories Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {categories.map((cat, idx) => (
          <div 
            key={idx}
            className="card"
            onClick={() => handleCategoryClick(cat.id)}
            style={{ 
              padding: '18px 20px', 
              borderRadius: '12px', 
              border: 'none', 
              background: 'white', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.01)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '175px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.01)';
            }}
          >
            <div>
              {/* Icon circle */}
              <div 
                style={{ 
                  width: '34px', 
                  height: '34px', 
                  borderRadius: '8px', 
                  background: cat.iconBg, 
                  color: cat.iconColor, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{cat.icon}</span>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '6px' }}>
                {cat.label}
              </h3>

              {/* Desc */}
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4', margin: '0 0 12px 0' }}>
                {cat.desc}
              </p>
            </div>

            {/* Bottom count */}
            <div>
              <span 
                style={{ 
                  fontSize: '10px', 
                  padding: '3px 8px', 
                  borderRadius: '4px', 
                  background: 'rgba(37, 99, 235, 0.08)', 
                  color: '#2563eb',
                  fontWeight: '600',
                  display: 'inline-block'
                }}
              >
                {cat.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
