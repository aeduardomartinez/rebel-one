import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateMenuDrawer({ isOpen, onClose }) {
  const drawerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const menuSections = [
    {
      title: 'INGRESOS',
      items: [
        { label: 'Factura de venta electrónica', icon: '📄', path: '/sales?tab=facturas&action=new' },
        { label: 'Cotización', icon: '📋', path: '/sales?tab=cotizaciones&action=new' },
        { label: 'Remisión', icon: '🚚', path: '/sales?tab=remisiones&action=new' },
        { label: 'Nota crédito', icon: '↩️', path: '/sales?tab=notas&action=new' },
        { label: 'Recibo de caja', icon: '💵', path: '/sales?tab=pagos&action=new' }
      ]
    },
    {
      title: 'GASTOS',
      items: [
        { label: 'Factura de compra', icon: '🧾', path: '#' },
        { label: 'Documento soporte', icon: '📝', path: '#' },
        { label: 'Orden de compra', icon: '🛒', path: '#' },
        { label: 'Comprobante de egreso', icon: '💸', path: '#' }
      ]
    },
    {
      title: 'MAESTROS',
      items: [
        { label: 'Producto / Servicio / Combo', icon: '📦', path: '#' },
        { label: 'Cliente / Proveedor / Empleado', icon: '👤', path: '#' }
      ]
    },
    {
      title: 'CONTABILIDAD',
      items: [
        { label: 'Comprobante contable manual', icon: '📒', path: '#' }
      ]
    },
    {
      title: 'TAREAS',
      items: [
        { label: 'Nueva tarea contable', icon: '✓', path: '#' }
      ]
    }
  ];

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 9998,
        backdropFilter: 'blur(2px)'
      }} />
      <div ref={drawerRef} style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '320px',
        backgroundColor: '#ffffff',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideInRight 0.3s ease-out'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: 'var(--text-primary)' }}>Crear nuevo</h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text-muted)'
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 24px'
        }}>
          {menuSections.map((section, idx) => (
            <div key={idx} style={{ marginBottom: '20px' }}>
              <h3 style={{
                fontSize: '11px',
                fontWeight: '700',
                color: 'var(--text-muted)',
                letterSpacing: '0.5px',
                marginBottom: '8px'
              }}>
                {section.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {section.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx}
                    onClick={() => handleNavigation(item.path)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '6px 8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-muted)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span style={{ fontSize: '16px', opacity: 0.9 }}>{item.icon}</span>
                    <span style={{ fontWeight: '500' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
