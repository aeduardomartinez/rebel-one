import React, { useState } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import CreateMenuDrawer from './CreateMenuDrawer';

export default function Header({ onToggleSidebar }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isCreateDrawerOpen, setCreateDrawerOpen] = useState(false);
  
  let parent = '';
  let parentPath = '';
  let current = '';

  if (location.pathname === '/') {
    parent = '';
    current = 'Inicio';
  } else if (location.pathname.startsWith('/sales')) {
    parent = 'Ingresos';
    parentPath = '/sales';
    current = 'Ventas';
  } else if (location.pathname.startsWith('/gastos')) {
    parent = 'Gastos';
    parentPath = '/gastos';
    current = searchParams.get('tab') === 'recepcion_dian' ? 'Buzón RADIAN' : 'Compras';
  } else if (location.pathname.startsWith('/contactos')) {
    parent = 'Inicio';
    parentPath = '/';
    current = 'Contactos';
  } else if (location.pathname.startsWith('/inventario')) {
    parent = 'Inicio';
    parentPath = '/';
    current = 'Inventario';
  } else if (location.pathname.startsWith('/bancos')) {
    parent = 'Inicio';
    parentPath = '/';
    current = 'Bancos y Cajas';
  } else if (location.pathname.startsWith('/reportes')) {
    if (searchParams.get('action') === 'crearAsiento') {
      parent = 'Contabilidad';
      parentPath = '/reportes?category=Contables';
      current = 'Nuevo Asiento';
    } else if (searchParams.get('report')) {
      parent = 'Reportes';
      parentPath = '/reportes';
      current = searchParams.get('report');
    } else if (searchParams.get('category')) {
      parent = 'Reportes';
      parentPath = '/reportes';
      current = searchParams.get('category');
    } else {
      parent = 'Inicio';
      parentPath = '/';
      current = 'Reportes';
    }
  } else {
    parent = 'Inicio';
    parentPath = '/';
    current = 'Página';
  }

  return (
    <header className="header">
      <button className="header-toggle" onClick={onToggleSidebar} aria-label="Toggle Sidebar">☰</button>
      
      <div className="header-breadcrumb" style={{ fontSize: '16px', textTransform: 'capitalize' }}>
        {parent ? (
          <>
            <span 
              style={{ color: '#64748b', cursor: parentPath ? 'pointer' : 'default' }}
              onClick={() => parentPath && navigate(parentPath)}
            >
              {parent}
            </span> 
            <span style={{ color: '#cbd5e1', margin: '0 6px' }}>/</span> 
            <span className="current" style={{ fontWeight: '600', color: '#0f172a' }}>{current}</span>
          </>
        ) : (
          <span className="current" style={{ fontWeight: '600', color: '#0f172a' }}>{current}</span>
        )}
      </div>

      <div className="header-search">
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="Buscar clientes, facturas, productos..." />
      </div>

      <div className="header-actions">
        <button className="btn-create" onClick={() => setCreateDrawerOpen(true)}>
          <span>+ Crear</span>
        </button>
        
        <div className="header-company">
          <div className="company-avatar">R</div>
          <span>Rebel One SAS</span>
        </div>

        <div className="header-icon-btn">
          <span>🔔</span>
          <div className="header-badge"></div>
        </div>

        <div className="user-avatar">U</div>
      </div>
      
      <CreateMenuDrawer 
        isOpen={isCreateDrawerOpen} 
        onClose={() => setCreateDrawerOpen(false)} 
      />
    </header>
  );
}
