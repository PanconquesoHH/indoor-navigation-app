import React from 'react';
import { Navigation, Compass, MapPin, X, ArrowUpRight } from 'lucide-react';

export default function BottomSheet({ 
  selectedRoom, 
  routeInfo, 
  onStartRoute, 
  onCancelRoute, 
  onClose,
  userLocation 
}) {
  const isOpen = !!selectedRoom || !!routeInfo;

  if (!isOpen) return null;

  return (
    <div className={`bottom-sheet ${isOpen ? 'open' : ''}`}>
      <div className="sheet-handle-bar"></div>
      
      <div className="sheet-content">
        {/* CASO A: MOSTRAR RUTA Y NAVEGACIÓN */}
        {routeInfo ? (
          <>
            <div className="room-detail-header">
              <div>
                <h3 className="room-detail-title">Indicaciones de Ruta</h3>
                <p className="room-detail-subtitle">
                  De: {routeInfo.startName} → A: {routeInfo.endName}
                </p>
              </div>
              <button className="action-btn-secondary" onClick={onCancelRoute}>
                <X size={20} />
              </button>
            </div>

            <div className="route-summary-box">
              <div className="route-info-left">
                <span className="route-info-title">Ruta óptima calculada</span>
                <span className="route-info-meta">
                  Distancia: {Math.round(routeInfo.distance * 0.1)} metros | A pie: ~ {Math.ceil(routeInfo.distance * 0.05)} seg.
                </span>
              </div>
              <Navigation size={22} className="start-marker" style={{ stroke: 'none' }} />
            </div>

            <div className="route-directions-list">
              {routeInfo.instructions.map((step, index) => {
                let stepClass = 'direction-step-item';
                if (index === 0) stepClass += ' start';
                else if (index === routeInfo.instructions.length - 1) stepClass += ' end';
                else stepClass += ' active';

                return (
                  <div key={index} className={stepClass}>
                    <div className="step-icon-circle"></div>
                    <span className="step-text">{step}</span>
                  </div>
                );
              })}
            </div>

            <div className="sheet-buttons-row" style={{ marginTop: '8px' }}>
              <button className="action-btn-primary" onClick={onCancelRoute} style={{ background: 'var(--brand-danger)', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }}>
                <X size={18} />
                <span>Cancelar Ruta</span>
              </button>
            </div>
          </>
        ) : (
          /* CASO B: DETALLE DE HABITACIÓN SELECCIONADA */
          selectedRoom && (
            <>
              <div className="room-detail-header">
                <div>
                  <h3 className="room-detail-title">{selectedRoom.name}</h3>
                  <p className="room-detail-subtitle">Código: {selectedRoom.code}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span className="room-detail-badge">
                    Piso {selectedRoom.floor === 'PB' ? 'Bajo' : selectedRoom.floor}
                  </span>
                  <button className="action-btn-secondary" style={{ width: '36px', height: '36px' }} onClick={onClose}>
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div>
                <p className="room-detail-desc">{selectedRoom.description}</p>
                {selectedRoom.details && (
                  <div className="room-detail-extra" style={{ marginTop: '12px' }}>
                    <strong>Características:</strong> {selectedRoom.details}
                  </div>
                )}
              </div>

              <div className="sheet-buttons-row">
                <button 
                  className="action-btn-primary" 
                  onClick={() => onStartRoute(selectedRoom)}
                >
                  <Navigation size={18} />
                  <span>Cómo llegar</span>
                </button>
                <button 
                  className="action-btn-secondary"
                  title="Establecer como origen"
                  onClick={() => onStartRoute(selectedRoom, true)}
                >
                  <Compass size={18} />
                </button>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
