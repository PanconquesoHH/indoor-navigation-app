import React, { useState } from 'react';
import { Smartphone, Compass, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Circle, Eye, EyeOff } from 'lucide-react';
import { graphNodes } from '../data/buildingData';

// Puntos clave de códigos QR ficticios pegados en las paredes del edificio
const qrLocations = [
  { id: 'pb_ingreso_principal', name: 'QR: Ingreso Principal (PB)' },
  { id: 'pb_vestibulo', name: 'QR: Vestíbulo (PB)' },
  { id: 'pb_escalera_izq_node', name: 'QR: Escalera Izquierda (PB)' },
  { id: 'p1_escalera_izq_node', name: 'QR: Escalera Izquierda (P1)' },
  { id: 'p1_direccion_door', name: 'QR: Dirección de Carrera (P1)' },
  { id: 'p1_biblioteca_door', name: 'QR: Biblioteca (P1)' },
  { id: 'p2_escalera_izq_node', name: 'QR: Escalera Izquierda (P2)' },
  { id: 'p2_terraza_door', name: 'QR: Terraza (P2)' },
  { id: 'p3_escalera_izq_node', name: 'QR: Escalera Izquierda (P3)' },
  { id: 'p3_aula_301_door', name: 'QR: Aula A-301 (P3)' }
];

export default function SimulatorControls({ 
  userLocation, 
  onTeleport, 
  onWalk 
}) {
  const [collapsed, setCollapsed] = useState(false);

  const handleQrChange = (e) => {
    const nodeId = e.target.value;
    if (nodeId) {
      const node = graphNodes[nodeId];
      if (node) {
        onTeleport(node);
      }
    }
  };

  return (
    <div className="simulator-drawer">
      {/* Botón para colapsar/mostrar el simulador */}
      <button 
        className="glass-btn" 
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? "Mostrar Simulador IPS" : "Ocultar Simulador IPS"}
        style={{ alignSelf: 'flex-start' }}
      >
        {collapsed ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>

      {!collapsed && (
        <div className="simulator-panel">
          <div className="sim-title">
            <Smartphone size={16} />
            <span>Simulador de Posición (IPS)</span>
          </div>

          {/* Selector de códigos QR simulados */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span className="sim-section-label">Escanear código QR de pared</span>
            <select 
              className="qr-selector"
              onChange={handleQrChange}
              value={userLocation ? userLocation.id : ''}
            >
              <option value="" disabled>-- Selecciona un punto QR --</option>
              {qrLocations.map(loc => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Joystick Virtual para caminar por el plano */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span className="sim-section-label">Navegación Manual (Caminar)</span>
            <div className="joystick-container">
              <div className="joystick-pad">
                <button className="joy-btn up" onClick={() => onWalk(0, -25)} title="Caminar arriba">
                  <ChevronUp size={20} />
                </button>
                <button className="joy-btn left" onClick={() => onWalk(-25, 0)} title="Caminar izquierda">
                  <ChevronLeft size={20} />
                </button>
                <div className="joy-btn center" title="Ubicación actual">
                  <Circle size={10} style={{ fill: 'var(--brand-primary)' }} />
                </div>
                <button className="joy-btn right" onClick={() => onWalk(25, 0)} title="Caminar derecha">
                  <ChevronRight size={20} />
                </button>
                <button className="joy-btn down" onClick={() => onWalk(0, 25)} title="Caminar abajo">
                  <ChevronDown size={20} />
                </button>
              </div>
            </div>
          </div>
          
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
            {userLocation ? (
              <span>Ubicación: <strong>{userLocation.name}</strong> ({userLocation.floor === 'PB' ? 'PB' : `${userLocation.floor}º`})</span>
            ) : (
              <span>Sin señal de ubicación. Escanea un QR.</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
