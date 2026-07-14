import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Contacts() {
  const [activeTab, setActiveTab] = useState('clientes');

  // Mock data based on screenshot
  const contactsData = [
    { id: 1, name: 'Constructora Andina S.A.S', nit: '900.234.567-1', type: 'Cliente', phone: '316 555 0001', email: 'contacto@andina.co', city: 'Cali', iva: 'No Responsable', regimen: 'Especial' },
    { id: 2, name: 'Distribuidora El Pino Ltda.', nit: '800.123.456-9', type: 'Ambos', phone: '314 555 0002', email: 'contacto@elpino.co', city: 'Bogotá', iva: 'No Responsable', regimen: 'Especial' },
    { id: 3, name: 'Textiles Medina S.A.', nit: '890.543.210-3', type: 'Cliente', phone: '311-2345678', email: 'facturacion@textilesmedina.co', city: 'Cali', iva: 'No Responsable', regimen: 'Especial' },
    { id: 4, name: 'Grupo Empresarial Cali S.A.S', nit: '901.234.567-8', type: 'Cliente', phone: '310-9876543', email: 'contacto@grupocali.co', city: 'Cali', iva: 'No Responsable', regimen: 'Especial' },
    { id: 5, name: 'Alimentos y Bebidas del Valle', nit: '830.456.123-4', type: 'Ambos', phone: '315-4445566', email: 'compras@alimentosvalle.co', city: 'Palmira', iva: 'No Responsable', regimen: 'Especial' },
    { id: 6, name: 'Inversiones Torres & Co.', nit: '900.789.456-3', type: 'Cliente', phone: '315-9998877', email: 'contacto@torres.com.co', city: 'Cali', iva: 'No Responsable', regimen: 'Especial' },
    { id: 7, name: 'Editorial Pacífico', nit: '800.999.888-2', type: 'Proveedor', phone: '311-1234567', email: 'ventas@editorialpacifico.co', city: 'Cali', iva: 'No Responsable', regimen: 'Especial' }
  ];

  // Helper to render type chip
  const getTypeChipClass = (type) => {
    switch (type) {
      case 'Cliente': return 'chip-primary';
      case 'Proveedor': return 'chip-warning';
      case 'Ambos': return 'chip-success';
      default: return 'chip-neutral';
    }
  };

  // Filter contacts based on active tab
  const filteredContacts = contactsData.filter(c => {
    if (activeTab === 'clientes') return c.type === 'Cliente' || c.type === 'Ambos';
    if (activeTab === 'proveedores') return c.type === 'Proveedor' || c.type === 'Ambos';
    if (activeTab === 'nomina') return c.type === 'Empleado';
    return true;
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const isCreating = searchParams.get('action') === 'new';

  if (isCreating) {
    const labelStyle = { display: 'block', fontWeight: 700, fontSize: '12px', marginBottom: '4px', color: '#1e293b' };
    const inputStyle = { width: '100%', height: '36px', borderRadius: '18px', background: '#eff4ff', border: 'none', padding: '0 16px', outline: 'none', fontSize: '14px', color: '#334155' };
    
    return (
      <div className="page-container fade-in">
        <h2 style={{ color: 'var(--color-primary)', marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>
          Registrar Nuevo Tercero
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Tipo Persona *</label>
              <select style={inputStyle}>
                <option>Persona Jurídica</option>
                <option>Persona Natural</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Identificación / NIT / C.C. *</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="text" style={{ ...inputStyle, flex: 1 }} placeholder="Ej: 901234567" />
                <input type="text" style={{ ...inputStyle, width: '60px', textAlign: 'center', padding: 0, background: '#eff4ff' }} placeholder="DV" readOnly />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div>
            <label style={labelStyle}>Razón Social *</label>
            <input type="text" style={inputStyle} placeholder="Ej: Inversiones ABC SAS" />
          </div>

          {/* Row 3 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Celular / Teléfono *</label>
              <input type="text" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Correo Electrónico</label>
              <input type="email" style={inputStyle} />
            </div>
          </div>

          {/* Row 4 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Ciudad</label>
              <input type="text" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Dirección</label>
              <input type="text" style={inputStyle} />
            </div>
          </div>

          {/* Row 5 - Roles */}
          <div style={{ background: '#eff4ff', padding: '12px 16px', borderRadius: '12px' }}>
            <label style={{ ...labelStyle, marginBottom: '8px' }}>Roles y Clasificación *</label>
            <div style={{ display: 'flex', gap: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#475569', fontWeight: 500 }}>
                <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }} /> Cliente
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#475569', fontWeight: 500 }}>
                <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }} /> Proveedor
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#475569', fontWeight: 500 }}>
                <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }} /> Empleado (Nómina)
              </label>
            </div>
          </div>

          {/* Row 6 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Responsabilidad Tributaria *</label>
              <select style={inputStyle}>
                <option>No Responsable de IVA</option>
                <option>Responsable de IVA</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Régimen Fiscal *</label>
              <select style={inputStyle}>
                <option>Régimen Simplificado</option>
                <option>Régimen Común</option>
                <option>Régimen Especial</option>
              </select>
            </div>
          </div>

          {/* Footer actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
            <button className="btn btn-secondary" style={{ borderRadius: '20px', fontWeight: 600, border: 'none', color: '#475569', background: 'transparent' }} onClick={() => setSearchParams({})}>Cancelar</button>
            <button className="btn btn-primary" style={{ borderRadius: '20px', fontWeight: 600, padding: '0 24px' }} onClick={() => setSearchParams({})}>Registrar Tercero</button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="page-container fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="page-header-left">
          <h1>Personas & Contactos</h1>
          <p>Directorio maestro de clientes, proveedores y empleados.</p>
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => setSearchParams({ action: 'new' })}>+ Nuevo Tercero</button>
        </div>
      </div>

      <div className="tabs" style={{ overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px', marginBottom: '20px' }}>
        {[
          { id: 'clientes', label: 'Clientes' },
          { id: 'proveedores', label: 'Proveedores' },
          { id: 'nomina', label: 'Nómina / Empleados' }
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

      <div className="card" style={{ padding: 0 }}>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th className="rounded-left">NOMBRE / RAZÓN SOCIAL</th>
                <th>IDENTIFICACIÓN / NIT</th>
                <th>TIPO</th>
                <th>CELULAR / TELÉFONO</th>
                <th>EMAIL</th>
                <th>CIUDAD / DIRECCIÓN</th>
                <th>RESP. IVA</th>
                <th>RÉGIMEN FISCAL</th>
                <th className="rounded-right" style={{ textAlign: 'right' }}>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <tr key={contact.id}>
                    <td className="cell-bold">{contact.name}</td>
                    <td style={{ fontFamily: 'var(--font-family-mono)' }}>{contact.nit}</td>
                    <td>
                      <span className={`chip ${getTypeChipClass(contact.type)}`}>
                        {contact.type}
                      </span>
                    </td>
                    <td>{contact.phone}</td>
                    <td className="cell-muted">{contact.email}</td>
                    <td>{contact.city}</td>
                    <td>
                      <span className="chip chip-neutral" style={{ fontSize: '11px' }}>
                        <span className="dot" style={{ background: '#94a3b8' }}></span>
                        {contact.iva}
                      </span>
                    </td>
                    <td>{contact.regimen}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button className="btn btn-secondary btn-sm" style={{ fontWeight: 600 }}>Editar</button>
                        <button className="btn btn-sm" style={{ background: '#b91c1c', color: 'white', fontWeight: 600, border: 'none' }}>Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted" style={{ padding: '48px 24px' }}>
                    No hay contactos para mostrar en esta sección.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
