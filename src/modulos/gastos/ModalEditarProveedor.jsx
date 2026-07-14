import React from 'react';

export default function ModalEditarProveedor({ provider, onClose }) {
  if (!provider) return null;

  // Usa los datos del proveedor si existen, o los del mock
  const razonSocial = provider.provider || '';
  
  let nit = "901.678.234-7";
  let telefono = "312 555 0005";
  let correo = "ventas@sumitecnicos.com";
  let ciudad = "Barranquilla";

  if (razonSocial === 'Carlos Pérez') {
    nit = "12.345.678";
    telefono = "300 555 0003";
    correo = "carlos@perez.com";
    ciudad = "Medellín";
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content-modern">
        {/* Header */}
        <div className="modal-header-modern">
          <h2 className="modal-title-modern">Editar Tercero</h2>
          <button onClick={onClose} className="modal-close-btn">&times;</button>
        </div>
        
        {/* Body */}
        <div className="modal-body-modern">
          <div className="modal-row-modern">
            <div style={{ flex: '1 1 200px' }}>
              <label className="modal-label-modern">Tipo Persona *</label>
              <select className="modal-input-modern" defaultValue="Persona Jurídica">
                <option>Persona Jurídica</option>
                <option>Persona Natural</option>
              </select>
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <label className="modal-label-modern">Identificación / NIT / C.C. *</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input type="text" defaultValue={nit} className="modal-input-modern" style={{ flex: 1 }} />
                <input type="text" defaultValue="D'" className="modal-input-modern modal-input-addon" readOnly />
              </div>
            </div>
          </div>

          <div>
            <label className="modal-label-modern">Razón Social *</label>
            <input type="text" defaultValue={razonSocial} className="modal-input-modern" readOnly />
          </div>

          <div className="modal-row-modern">
            <div style={{ flex: '1 1 200px' }}>
              <label className="modal-label-modern">Celular / Teléfono *</label>
              <input type="text" defaultValue={telefono} className="modal-input-modern" />
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <label className="modal-label-modern">Correo Electrónico</label>
              <input type="email" defaultValue={correo} className="modal-input-modern" />
            </div>
          </div>

          <div className="modal-row-modern">
            <div style={{ flex: '1 1 140px' }}>
              <label className="modal-label-modern">Ciudad</label>
              <input type="text" defaultValue={ciudad} className="modal-input-modern" />
            </div>
            <div style={{ flex: '2 1 240px' }}>
              <label className="modal-label-modern">Dirección</label>
              <input type="text" className="modal-input-modern" />
            </div>
          </div>

          <div className="modal-section-bg">
            <label className="modal-label-modern" style={{ marginBottom: '12px' }}>Roles y Clasificación *</label>
            <div className="modal-row-modern" style={{ gap: '24px' }}>
              <label className="modal-checkbox-label">
                <input type="checkbox" className="modal-checkbox" /> Cliente
              </label>
              <label className="modal-checkbox-label">
                <input type="checkbox" defaultChecked className="modal-checkbox" /> Proveedor
              </label>
              <label className="modal-checkbox-label">
                <input type="checkbox" className="modal-checkbox" /> Empleado (Nómina)
              </label>
            </div>
          </div>

          <div className="modal-row-modern">
            <div style={{ flex: '1 1 200px' }}>
              <label className="modal-label-modern">Responsabilidad Tributaria *</label>
              <select className="modal-input-modern" defaultValue="No Responsable de IVA">
                <option>No Responsable de IVA</option>
                <option>Responsable de IVA</option>
              </select>
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <label className="modal-label-modern">Régimen Fiscal *</label>
              <select className="modal-input-modern" defaultValue="Régimen Simplificado">
                <option>Régimen Simplificado</option>
                <option>Régimen Común</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer-modern">
          <button className="btn-pill-cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-pill-save" onClick={onClose}>Guardar Cambios</button>
        </div>
      </div>
    </div>
  );
}
