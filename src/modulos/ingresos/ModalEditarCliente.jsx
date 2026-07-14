import React from 'react';

export default function ModalEditarCliente({ customer, onClose }) {
  if (!customer) return null;

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
              <select className="modal-input-modern">
                <option>Persona Jurídica</option>
                <option>Persona Natural</option>
              </select>
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <label className="modal-label-modern">Identificación / NIT / C.C. *</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input type="text" defaultValue="900.234.567-1" className="modal-input-modern" style={{ flex: 1 }} />
                <input type="text" defaultValue="D'" className="modal-input-modern modal-input-addon" readOnly />
              </div>
            </div>
          </div>

          <div>
            <label className="modal-label-modern">Razón Social *</label>
            <input type="text" defaultValue={customer.customer} className="modal-input-modern" readOnly />
          </div>

          <div className="modal-row-modern">
            <div style={{ flex: '1 1 200px' }}>
              <label className="modal-label-modern">Celular / Teléfono *</label>
              <input type="text" defaultValue="316 555 0001" className="modal-input-modern" readOnly />
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <label className="modal-label-modern">Correo Electrónico</label>
              <input type="email" defaultValue="contacto@andina.co" className="modal-input-modern" readOnly />
            </div>
          </div>

          <div className="modal-row-modern">
            <div style={{ flex: '1 1 140px' }}>
              <label className="modal-label-modern">Ciudad</label>
              <input type="text" defaultValue="Cali" className="modal-input-modern" readOnly />
            </div>
            <div style={{ flex: '2 1 240px' }}>
              <label className="modal-label-modern">Dirección</label>
              <input type="text" className="modal-input-modern" readOnly />
            </div>
          </div>

          <div className="modal-section-bg">
            <label className="modal-label-modern" style={{ marginBottom: '12px' }}>Roles y Clasificación *</label>
            <div className="modal-row-modern" style={{ gap: '24px' }}>
              <label className="modal-checkbox-label">
                <input type="checkbox" defaultChecked className="modal-checkbox" /> Cliente
              </label>
              <label className="modal-checkbox-label">
                <input type="checkbox" className="modal-checkbox" /> Proveedor
              </label>
              <label className="modal-checkbox-label">
                <input type="checkbox" className="modal-checkbox" /> Empleado (Nómina)
              </label>
            </div>
          </div>

          <div className="modal-row-modern">
            <div style={{ flex: '1 1 200px' }}>
              <label className="modal-label-modern">Responsabilidad Tributaria *</label>
              <select className="modal-input-modern">
                <option>No Responsable de IVA</option>
              </select>
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <label className="modal-label-modern">Régimen Fiscal *</label>
              <select className="modal-input-modern">
                <option>Régimen Simplificado</option>
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
