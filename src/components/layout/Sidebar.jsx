import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';

export default function Sidebar({ collapsed }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get('tab') || '';

  // Configuración del menú para escalabilidad y fácil mantenimiento (Buenas Prácticas)
  const menuItems = [
    { type: 'link', to: '/', label: 'Inicio', icon: 'grid_view' },
    { type: 'label', label: 'Operaciones' },
    {
      type: 'dropdown',
      id: 'ingresos',
      label: 'Ingresos',
      icon: 'description',
      path: '/sales',
      subItems: [
        { to: '/sales?tab=facturas', label: 'Facturas de venta', tab: 'facturas' },
        { to: '/sales?tab=cotizaciones', label: 'Cotizaciones', tab: 'cotizaciones' },
        { to: '/sales?tab=pagos', label: 'Pagos recibidos', tab: 'pagos' },
        { to: '/sales?tab=notas', label: 'Notas crédito', tab: 'notas' },
        { to: '/sales?tab=remisiones', label: 'Remisiones', tab: 'remisiones' }
      ]
    },
    {
      type: 'dropdown',
      id: 'gastos',
      label: 'Gastos',
      icon: 'receipt_long',
      path: '/gastos',
      subItems: [
        { to: '/gastos?tab=facturas', label: 'Facturas de compra', tab: 'facturas' },
        { to: '/gastos?tab=soporte', label: 'Documento soporte', tab: 'soporte' },
        { to: '/gastos?tab=ordenes', label: 'Órdenes de compra', tab: 'ordenes' },
        { to: '/gastos?tab=recepcion_dian', label: 'Recepción DIAN', tab: 'recepcion_dian' },
        { to: '/gastos?tab=egresos', label: 'Pagos / Egresos', tab: 'egresos' },
        { to: '/gastos?tab=notas', label: 'Notas de ajuste', tab: 'notas' }
      ]
    },
    { type: 'link', to: '/contactos', label: 'Contactos', icon: 'group' },
    { type: 'link', to: '/inventario', label: 'Inventario', icon: 'inventory_2' },
    { type: 'static', label: 'Bancos y Cajas', icon: 'account_balance' },
    { type: 'label', label: 'Gestión' },
    { type: 'static', label: 'Nómina', icon: 'person' },
    { type: 'static', label: 'Contabilidad', icon: 'bar_chart' },
    { type: 'link', to: '/reportes', label: 'Reportes', icon: 'trending_up' },
    { type: 'static', label: 'Tareas', icon: 'check_circle' },
    { type: 'label', label: 'Sistema' },
    { type: 'static', label: 'Configuración', icon: 'settings' }
  ];

  // Estado de secciones abiertas
  const [openSections, setOpenSections] = useState({
    ingresos: false,
    gastos: false
  });

  // Auto-abrir sección del dropdown si coincide con la ruta actual
  useEffect(() => {
    const activeDropdown = menuItems.find(
      item => item.type === 'dropdown' && location.pathname.startsWith(item.path)
    );
    if (activeDropdown) {
      setOpenSections(prev => ({
        ...prev,
        [activeDropdown.id]: true
      }));
    }
  }, [location.pathname]);

  const toggleSection = (id) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} id="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">R1</div>
        <div className="logo-text">Rebel One</div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          if (item.type === 'label') {
            return (
              <div key={index} className="nav-section-label">
                {item.label}
              </div>
            );
          }

          if (item.type === 'link') {
            return (
              <NavLink 
                key={index} 
                to={item.to} 
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <span className="nav-icon material-symbols-outlined">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            );
          }

          if (item.type === 'static') {
            return (
              <div key={index} className="nav-item">
                <span className="nav-icon material-symbols-outlined">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </div>
            );
          }

          if (item.type === 'dropdown') {
            const isSectionActive = location.pathname.startsWith(item.path);
            const isOpen = openSections[item.id];

            return (
              <React.Fragment key={index}>
                <Link 
                  to={isSectionActive ? '#' : item.subItems[0].to}
                  className={`nav-item ${isSectionActive ? 'active' : ''}`} 
                  onClick={(e) => {
                    if (isSectionActive) {
                      e.preventDefault();
                    }
                    if (!isOpen) {
                      toggleSection(item.id);
                    }
                  }}
                  style={{ textDecoration: 'none' }}
                >
                  <span className="nav-icon material-symbols-outlined">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  <span 
                    className={`nav-arrow ${isOpen ? 'open' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleSection(item.id);
                    }}
                  >▶</span>
                </Link>
                <div className={`nav-sub-items ${isOpen ? 'open' : ''}`}>
                  {item.subItems.map((sub, subIdx) => {
                    const isSubActive = isSectionActive && (currentTab === sub.tab || (!currentTab && subIdx === 0));
                    return (
                      <Link 
                        key={subIdx} 
                        to={sub.to} 
                        className={`nav-sub-item ${isSubActive ? 'active' : ''}`} 
                        style={{ textDecoration: 'none' }}
                      >
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              </React.Fragment>
            );
          }

          return null;
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="plan-badge">
          <div className="plan-dot"></div>
          <span>Plan Pyme Activo</span>
        </div>
      </div>
    </aside>
  );
}
