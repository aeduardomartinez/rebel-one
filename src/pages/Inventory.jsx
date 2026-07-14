import React, { useState } from 'react';

export default function Inventory() {
  const [activeTab, setActiveTab] = useState('items');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mocks
  const [products, setProducts] = useState([
    { id: 'p1', code: 'SRV-001', name: 'Consultoría contable', price: 350000, tax: 19, stock: 99 },
    { id: 'p3', code: 'PRD-043', name: 'Tóner impresora laser', price: 189000, tax: 19, stock: 8 },
    { id: 'p4', code: 'SRV-002', name: 'Auditoría financiera', price: 2800000, tax: 19, stock: 999 },
    { id: 'p5', code: 'KIT-001', name: 'Kit onboarding cliente', price: 450000, tax: 19, stock: 50 }
  ]);

  const priceLists = [
    { id: 1, name: 'Lista Principal (Público)', type: '0% (Precio Base)', status: 'Activo' },
    { id: 2, name: 'Lista Distribuidores', type: '-10% sobre base', status: 'Activo' }
  ];

  const warehouses = [
    { id: 1, name: 'Bodega Principal', location: 'Cali - Sede Centro', items: 1450, status: 'Operativa' },
    { id: 2, name: 'Bodega Norte', location: 'Bogotá - Zona Franca', items: 850, status: 'Operativa' }
  ];

  const categories = [
    { id: 1, name: 'Servicios Profesionales', items: 12, status: 'Activo' },
    { id: 2, name: 'Suministros de Oficina', items: 45, status: 'Activo' },
    { id: 3, name: 'Tecnología', items: 8, status: 'Activo' }
  ];

  const adjustments = [
    { id: 1, number: 'AJ-001', date: '18 Jun 2026', concept: 'Compra proveedor', responsible: 'Admin' },
    { id: 2, number: 'AJ-002', date: '15 Jun 2026', concept: 'Mermas/Daños', responsible: 'Cajero 1' }
  ];

  const variants = [
    { id: 1, name: 'Talla', values: 'S, M, L, XL', status: 'Activo' },
    { id: 2, name: 'Color', values: 'Rojo, Azul, Verde', status: 'Activo' }
  ];

  const formatCurrency = (val) => {
    return '$ ' + new Intl.NumberFormat('es-CO', { minimumFractionDigits: 0 }).format(val).replace(/,/g, '.');
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'items':
        return (
          <table className="data-table">
            <thead>
              <tr>
                <th className="rounded-left">CÓDIGO / SKU</th>
                <th>NOMBRE DEL ÍTEM</th>
                <th>TARIFA IVA</th>
                <th style={{ textAlign: 'left' }}>PRECIO DE VENTA</th>
                <th style={{ textAlign: 'left' }}>EXISTENCIAS</th>
                <th className="rounded-right" style={{ textAlign: 'center' }}>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td className="cell-muted">{p.code}</td>
                  <td className="cell-bold">{p.name}</td>
                  <td>
                    <span className="chip chip-neutral">
                      {p.tax}%
                    </span>
                  </td>
                  <td className="cell-amount" style={{ textAlign: 'left' }}>$ {p.price.toLocaleString('es-CO')}</td>
                  <td className={p.stock < 10 ? 'cell-amount text-danger' : 'cell-amount'} style={{ textAlign: 'left' }}>{p.stock}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button onClick={() => handleDelete(p.id)} className="btn btn-ghost btn-sm text-danger">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'precios':
        return (
          <table className="data-table">
            <thead>
              <tr>
                <th className="rounded-left">NOMBRE LISTA</th>
                <th>DESCUENTO / AJUSTE</th>
                <th className="rounded-right">ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {priceLists.map(l => (
                <tr key={l.id}>
                  <td className="cell-bold">{l.name}</td>
                  <td className="cell-muted">{l.type}</td>
                  <td>
                    <span className="chip chip-success">
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'bodegas':
        return (
          <table className="data-table">
            <thead>
              <tr>
                <th className="rounded-left">BODEGA</th>
                <th>UBICACIÓN</th>
                <th className="rounded-right">ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {warehouses.map(w => (
                <tr key={w.id}>
                  <td className="cell-bold">{w.name}</td>
                  <td className="cell-muted">{w.location}</td>
                  <td>
                    <span className="chip chip-success">
                      {w.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'categorias':
        return (
          <table className="data-table">
            <thead>
              <tr>
                <th className="rounded-left">NOMBRE CATEGORÍA</th>
                <th>ARTÍCULOS ASOCIADOS</th>
                <th className="rounded-right">ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(c => (
                <tr key={c.id}>
                  <td className="cell-bold">{c.name}</td>
                  <td className="cell-muted">{c.items}</td>
                  <td>
                    <span className="chip chip-success">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'ajustes':
        return (
          <table className="data-table">
            <thead>
              <tr>
                <th className="rounded-left">AJUSTE N°</th>
                <th>FECHA</th>
                <th>CONCEPTO</th>
                <th className="rounded-right">RESPONSABLE</th>
              </tr>
            </thead>
            <tbody>
              {adjustments.map(a => (
                <tr key={a.id}>
                  <td className="cell-bold" style={{ fontFamily: 'var(--font-family-mono)' }}>{a.number}</td>
                  <td className="cell-muted">{a.date}</td>
                  <td className="cell-bold">{a.concept}</td>
                  <td className="cell-muted">{a.responsible}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'variantes':
        return (
          <table className="data-table">
            <thead>
              <tr>
                <th className="rounded-left">ATRIBUTO</th>
                <th>VALORES PERMITIDOS</th>
                <th className="rounded-right">ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {variants.map(v => (
                <tr key={v.id}>
                  <td className="cell-bold">{v.name}</td>
                  <td className="cell-muted">{v.values}</td>
                  <td>
                    <span className="chip chip-success">
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default: return null;
    }
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <div className="page-header-left">
          <h1>Catálogo & Inventarios</h1>
          <p>Administre artículos, listas de precios, bodegas de almacenamiento y ajustes de stock.</p>
        </div>
      </div>

      <div className="tabs" style={{ overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px', marginBottom: '20px' }}>
        {[
          { id: 'items', label: 'Ítems de venta' },
          { id: 'precios', label: 'Listas de precios' },
          { id: 'bodegas', label: 'Bodegas' },
          { id: 'categorias', label: 'Categorías' },
          { id: 'ajustes', label: 'Ajustes' },
          { id: 'variantes', label: 'Variantes' }
        ].map(tab => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="card-title">
            {activeTab === 'items' ? 'Catálogo de Productos y Servicios' :
              activeTab === 'precios' ? 'Listas de Precios' :
                activeTab === 'bodegas' ? 'Bodegas y Almacenamiento' :
                  activeTab === 'categorias' ? 'Categorías del Catalogo' :
                    activeTab === 'ajustes' ? 'Historial de Ajustes' : 'Variantes de Productos'}
          </span>
          {activeTab === 'items' && (
            <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>
              + Nuevo Ítem
            </button>
          )}
        </div>

        <div className="table-wrapper">
          {renderTabContent()}
        </div>
      </div>

      {/* Modal de Nuevo Ítem */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="card" style={{ width: '500px', margin: 'auto', background: 'white', marginTop: '10vh' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="card-title">Crear Nuevo Ítem</h3>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px', fontSize: '13px' }}>TIPO DE ÍTEM</label>
                  <select className="input-select" style={{ width: '100%' }}>
                    <option>Producto (Inventariable)</option>
                    <option>Servicio</option>
                    <option>Combo / Kit</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px', fontSize: '13px' }}>CÓDIGO / SKU</label>
                  <input type="text" className="input" placeholder="Ej: PRD-001" />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px', fontSize: '13px' }}>NOMBRE DEL ÍTEM</label>
                <input type="text" className="input" placeholder="Ej: Resma de papel" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px', fontSize: '13px' }}>PRECIO DE VENTA</label>
                  <input type="number" className="input" placeholder="0" />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px', fontSize: '13px' }}>TARIFA IVA</label>
                  <select className="input-select" style={{ width: '100%' }}>
                    <option>Gravado - 19%</option>
                    <option>Gravado - 5%</option>
                    <option>Exento - 0%</option>
                    <option>Excluido - 0%</option>
                  </select>
                </div>
              </div>

            </div>
            <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid var(--border-color)' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setIsModalOpen(false)}>Cancelar</button>
              <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(false)}>Guardar Ítem</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
