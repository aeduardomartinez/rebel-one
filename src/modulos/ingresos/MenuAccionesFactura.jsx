import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function MenuAccionesFactura({ invoice, onClose, activeTab }) {
  const [, setSearchParams] = useSearchParams();

  const handleAction = (e, actionType) => {
    e.stopPropagation();
    if (actionType === 'view') {
      setSearchParams({ tab: activeTab, action: 'view', id: invoice.id });
    }
    onClose();
  };

  return (
    <div style={{
      position: 'absolute',
      right: '30px',
      top: '20px',
      backgroundColor: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      borderRadius: '8px',
      border: '1px solid var(--border-color)',
      zIndex: 100,
      minWidth: '150px',
      display: 'flex',
      flexDirection: 'column',
      padding: '8px 0',
      textAlign: 'right'
    }}>
      <button 
        onClick={(e) => handleAction(e, 'view')} 
        style={{ padding: '8px 16px', fontSize: '13px', color: 'var(--text-primary)', textAlign: 'right', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }} 
        onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'} 
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Ver detalle
      </button>
      <button 
        onClick={(e) => handleAction(e, 'cobro')}
        style={{ padding: '8px 16px', fontSize: '13px', color: 'var(--text-primary)', textAlign: 'right', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }} 
        onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'} 
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Registrar cobro
      </button>
      <button 
        onClick={(e) => handleAction(e, 'email')}
        style={{ padding: '8px 16px', fontSize: '13px', color: 'var(--text-primary)', textAlign: 'right', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }} 
        onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'} 
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Enviar email
      </button>
      <button 
        onClick={(e) => handleAction(e, 'duplicate')}
        style={{ padding: '8px 16px', fontSize: '13px', color: 'var(--text-primary)', textAlign: 'right', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }} 
        onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'} 
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Duplicar
      </button>
      <button 
        onClick={(e) => handleAction(e, 'pdf')}
        style={{ padding: '8px 16px', fontSize: '13px', color: 'var(--text-primary)', textAlign: 'right', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }} 
        onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'} 
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Descargar PDF
      </button>
      <button 
        onClick={(e) => handleAction(e, 'cancel')}
        style={{ padding: '8px 16px', fontSize: '13px', color: 'var(--color-danger)', textAlign: 'right', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }} 
        onMouseEnter={(e) => e.target.style.backgroundColor = '#fee2e2'} 
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Anular factura
      </button>
    </div>
  );
}
