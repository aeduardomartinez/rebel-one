import React from 'react';

export default function ModalCrearTercero({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content-modern">
        {/* Header */}
        <div className="modal-header-modern">
          <h2 className="modal-title-modern">Registrar Nuevo Tercero</h2>
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
                <input type="text" className="modal-input-modern" style={{ flex: 1 }} placeholder="Ej: 901234567" />
                <input type="text" className="modal-input-modern modal-input-addon" placeholder="DV" />
              </div>
            </div>
          </div>

          <div>
            <label className="modal-label-modern">Razón Social / Nombre Completo *</label>
            <input type="text" className="modal-input-modern" placeholder="Ej: Inversiones ABC SAS" />
          </div>

          <div className="modal-row-modern">
            <div style={{ flex: '1 1 200px' }}>
              <label className="modal-label-modern">Celular / Teléfono *</label>
              <input type="text" className="modal-input-modern" placeholder="Ej: 316 555 0001" />
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <label className="modal-label-modern">Correo Electrónico</label>
              <input type="email" className="modal-input-modern" placeholder="Ej: contacto@empresa.com" />
            </div>
          </div>

          <div className="modal-row-modern">
            <div style={{ flex: '1 1 140px' }}>
              <label className="modal-label-modern">Ciudad</label>
              <input type="text" className="modal-input-modern" placeholder="Ej: Cali" />
            </div>
            <div style={{ flex: '2 1 240px' }}>
              <label className="modal-label-modern">Dirección</label>
              <input type="text" className="modal-input-modern" placeholder="Ej: Calle 10 # 5-51" />
            </div>
          </div>

          <div className="modal-section-bg">
            <label className="modal-label-modern" style={{ marginBottom: '12px' }}>Roles y Clasificación *</label>
            <div className="modal-row-modern" style={{ gap: '24px' }}>
              <label className="modal-checkbox-label">
                <input type="checkbox" className="modal-checkbox" /> Cliente
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
                <option>Régimen Especial</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer-modern">
          <button className="btn-pill-cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-pill-save" onClick={onClose}>Registrar Tercero</button>
        </div>
      </div>
    </div>
  );
}
