import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus, Maximize2 } from 'lucide-react';
import { rooms, graphNodes } from '../data/buildingData';

// Dimensiones internas del plano SVG
const MAP_WIDTH = 1020;
const MAP_HEIGHT = 480;

// Breakpoint para considerar el dispositivo como móvil
const MOBILE_BREAKPOINT = 768;

// Zoom óptimo para móviles (auto-escalado inteligente)
const MOBILE_ZOOM = 1.55;

export default function MapViewer({ 
  activeFloor, 
  selectedRoom, 
  onSelectRoom, 
  userLocation, 
  routePath 
}) {
  // Estado para Zoom y Paneo del SVG
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Estado de dispositivo móvil y tamaño real de la pantalla/contenedor
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_BREAKPOINT);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const containerRef = useRef(null);

  // Filtrar habitaciones y nodos en el piso actual
  const currentRooms = rooms.filter(room => room.floor === activeFloor);
  const userIsOnCurrentFloor = userLocation && userLocation.floor === activeFloor;

  // Detectar móvil y medir el tamaño real de la pantalla/contenedor
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      setContainerSize({
        width: container ? container.clientWidth : window.innerWidth,
        height: container ? container.clientHeight : window.innerHeight
      });
    };

    handleResize();

    // ResizeObserver para detectar cambios en el tamaño real del contenedor del mapa
    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  // Auto-escalado inteligente: en móvil aplica zoom 1.8x y centra el plano
  // vertical y horizontalmente para que ocupe toda la pantalla.
  const applyAutoScale = () => {
    const w = containerSize.width || window.innerWidth;
    const h = containerSize.height || window.innerHeight;
    if (!w || !h) return;
    setZoom(MOBILE_ZOOM);
    setOffset({
      x: (w - MAP_WIDTH * MOBILE_ZOOM) / 2,
      y: (h - MAP_HEIGHT * MOBILE_ZOOM) / 2
    });
  };

  // Re-centrar automáticamente al cambiar el tamaño de pantalla en móvil
  useEffect(() => {
    if (isMobile) {
      applyAutoScale();
    } else {
      setZoom(0.95);
      setOffset({ x: 10, y: 15 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, containerSize]);

  // Ajustar el mapa al cambiar de piso
  useEffect(() => {
    resetView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFloor]);

  // Controles de zoom
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.15, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.15, 0.6));
  const resetView = () => {
    if (isMobile) {
      applyAutoScale();
    } else {
      setZoom(0.95);
      setOffset({ x: 10, y: 15 });
    }
  };

  // Manejo de paneo (arrastre) con ratón o gestos táctiles
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Manejo de paneo táctil para móviles (deslizar con el dedo)
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    if (!touch) return;
    setIsDragging(true);
    setDragStart({ x: touch.clientX - offset.x, y: touch.clientY - offset.y });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setOffset({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = 0.05;
    const direction = e.deltaY < 0 ? 1 : -1;
    setZoom(prev => Math.max(Math.min(prev + direction * zoomFactor, 3), 0.6));
  };

  // Previene comportamiento por defecto en rueda táctil
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  // Generar la ruta SVG (coordenadas d="M...") para el piso activo
  const renderRoutePath = () => {
    if (!routePath || routePath.length === 0) return null;

    let pathD = '';
    let isDrawing = false;

    for (let i = 0; i < routePath.length - 1; i++) {
      const nodeA = routePath[i];
      const nodeB = routePath[i + 1];

      // Solo dibujar segmentos que estén en el piso activo
      if (nodeA.floor === activeFloor && nodeB.floor === activeFloor) {
        if (!isDrawing) {
          pathD += `M ${nodeA.x} ${nodeA.y} L ${nodeB.x} ${nodeB.y} `;
          isDrawing = true;
        } else {
          pathD += `L ${nodeB.x} ${nodeB.y} `;
        }
      } else {
        isDrawing = false;
      }
    }

    return pathD ? <path d={pathD} className="route-path" /> : null;
  };

  // Obtener marcadores de inicio/fin si están en el piso activo
  const getMarkers = () => {
    if (!routePath || routePath.length === 0) return null;

    const startNode = routePath[0];
    const endNode = routePath[routePath.length - 1];
    const markers = [];

    if (startNode.floor === activeFloor) {
      markers.push(
        <g key="start-marker" transform={`translate(${startNode.x}, ${startNode.y})`}>
          <circle r="9" className="start-marker" />
          <text textAnchor="middle" dy="3.5" fill="white" fontSize="9" fontWeight="bold">A</text>
        </g>
      );
    }

    if (endNode.floor === activeFloor) {
      markers.push(
        <g key="end-marker" transform={`translate(${endNode.x}, ${endNode.y})`}>
          <circle r="9" className="end-marker" />
          <text textAnchor="middle" dy="3.5" fill="white" fontSize="9" fontWeight="bold">B</text>
        </g>
      );
    }

    // Dibujar alertas si hay una transferencia vertical de piso (escalera) en el camino
    routePath.forEach((node, index) => {
      if (node.floor === activeFloor && node.isStairs) {
        const nextNode = routePath[index + 1];
        const prevNode = routePath[index - 1];
        const verticalTransition = (nextNode && nextNode.floor !== activeFloor) || (prevNode && prevNode.floor !== activeFloor);

        if (verticalTransition) {
          const goesUp = (nextNode && parseInt(nextNode.floor) > parseInt(activeFloor)) || 
                         (prevNode && parseInt(prevNode.floor) > parseInt(activeFloor));
          markers.push(
            <g key={`transition-${node.id}`} transform={`translate(${node.x}, ${node.y - 18})`}>
              <rect x="-24" y="-9" width="48" height="18" rx="4" fill="var(--bg-primary)" stroke="var(--brand-primary)" strokeWidth="1" />
              <text textAnchor="middle" dy="3" fill="var(--brand-primary)" fontSize="8" fontWeight="bold">
                {goesUp ? '▲ SUBE' : '▼ BAJA'}
              </text>
            </g>
          );
        }
      }
    });

    return markers;
  };

  // Renderizar elementos comunes como pasillos (corridors) basados en planos de Turismo
  const renderCorridors = () => {
    switch (activeFloor) {
      case 'PB':
      case '1':
      case '2':
        return (
          <>
            {/* Pasillo central horizontal */}
            <rect x="150" y="225" width="670" height="35" rx="6" className="svg-corridor" />
            {/* Rama de conexión vertical al vestíbulo (sólo PB) */}
            {activeFloor === 'PB' && (
              <rect x="770" y="258" width="50" height="22" className="svg-corridor" />
            )}
          </>
        );
      case '3':
        return (
          <>
            {/* Pasillo central horizontal más corto en el 3er piso */}
            <rect x="150" y="225" width="375" height="35" rx="6" className="svg-corridor" />
          </>
        );
      default:
        return null;
    }
  };

  // Renderizar contorno exterior del edificio de Turismo - USFX
  const renderBuildingOutline = () => {
    // Polígono de las paredes del edificio, similar al borde irregular mostrado en el plano
    return (
      <polygon 
        points="50,40 960,40 930,440 80,440" 
        className="svg-wall-outline"
      />
    );
  };

  return (
    <div 
      className="map-canvas-container"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ overflow: 'hidden', touchAction: 'none' }}
    >
      {/* Botones de control del mapa */}
      <div className="floating-controls-right">
        <button className="glass-btn" onClick={handleZoomIn} title="Acercar">
          <Plus size={20} />
        </button>
        <button className="glass-btn" onClick={handleZoomOut} title="Alejar">
          <Minus size={20} />
        </button>
        <button className="glass-btn" onClick={resetView} title="Centrar Mapa">
          <Maximize2 size={20} />
        </button>
      </div>

      {/* SVG del plano */}
      <svg 
        className="building-svg"
        viewBox="0 0 1020 480"
        width="100%"
        height="100%"
      >
        <g transform={`translate(${offset.x}, ${offset.y}) scale(${zoom})`}>
          {/* Fondo */}
          <rect width="1050" height="500" fill="none" />

          {/* Contorno del Edificio */}
          {renderBuildingOutline()}

          {/* Áreas exteriores de Planta Baja */}
          {activeFloor === 'PB' && (
            <>
              {/* Patio Posterior */}
              <rect x="330" y="5" width="300" height="34" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" rx="4" />
              <text x="480" y="24" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Patio Posterior</text>
              
              {/* Patio Principal */}
              <rect x="480" y="300" width="150" height="110" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" rx="8" />
              <text x="555" y="355" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Patio Principal</text>

              {/* Área verde de ingreso */}
              <rect x="850" y="300" width="80" height="50" fill="rgba(16,185,129,0.03)" stroke="rgba(16,185,129,0.08)" rx="8" />
              <text x="890" y="325" fill="rgba(16,185,129,0.4)" fontSize="9" textAnchor="middle">Área Verde</text>
            </>
          )}

          {/* Terrazas en pisos superiores */}
          {activeFloor === '2' && (
            <g>
              <text x="925" y="245" fill="var(--text-muted)" fontSize="10" textAnchor="middle" transform="rotate(90, 925, 245)">Terraza</text>
            </g>
          )}
          {activeFloor === '3' && (
            <g>
              <text x="590" y="180" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Terraza</text>
            </g>
          )}

          {/* Pasillos */}
          {renderCorridors()}

          {/* Aulas / Oficinas / Servicios */}
          {currentRooms.map(room => {
            const isSelected = selectedRoom && selectedRoom.id === room.id;
            return (
              <g 
                key={room.id}
                className={`svg-room room-cat-${room.category} ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectRoom(room)}
              >
                <rect 
                  x={room.x} 
                  y={room.y} 
                  width={room.w} 
                  height={room.h} 
                  rx="6"
                  className="room-polygon"
                />
                <defs>
                  <clipPath id={`clip-${room.id}`}>
                    <rect 
                      x={room.x + 2} 
                      y={room.y + 2} 
                      width={room.w - 4} 
                      height={room.h - 4} 
                      rx="5" 
                    />
                  </clipPath>
                </defs>

                {/* Nombre recortado dentro del cuadro de la habitación */}
                {(() => {
                  const isTinyRoom = room.w < 45 || room.h < 45;
                  const isSmallRoom = room.w < 60 || room.h < 65;
                  
                  // En móvil reducir aún más los tamaños para evitar solapamiento con pasillos
                  const mainSize = isMobile
                    ? (isTinyRoom ? '5.8px' : isSmallRoom ? '6.8px' : '8px')
                    : (isSmallRoom ? '7.5px' : '9px');
                  
                  const subSize = isMobile
                    ? (isTinyRoom ? '0px' : isSmallRoom ? '5.2px' : '6.5px')
                    : (isSmallRoom ? '6.5px' : '8px');
                  
                  const showSub = subSize !== '0px' && !isTinyRoom;
                  
                  const mainY = showSub
                    ? room.y + room.h / 2 - (isMobile ? 1 : 2)
                    : room.y + room.h / 2 + 1;
                  
                  const subY = room.y + room.h / 2 + (isMobile ? 7 : 8);
                  
                  return (
                    <>
                      <text
                        x={room.x + room.w / 2}
                        y={mainY}
                        className="room-text"
                        clipPath={`url(#clip-${room.id})`}
                        style={{ fontSize: mainSize }}
                      >
                        {room.shortName || room.name}
                      </text>
                      {showSub && (
                        <text 
                          x={room.x + room.w / 2} 
                          y={subY} 
                          className="room-text-sub"
                          clipPath={`url(#clip-${room.id})`}
                          style={{ fontSize: subSize }}
                        >
                          {room.code}
                        </text>
                      )}
                    </>
                  );
                })()}
              </g>
            );
          })}

          {/* Línea de Ruta Activa */}
          {renderRoutePath()}

          {/* Marcadores de origen y fin */}
          {getMarkers()}

          {/* Ubicación del Usuario ("Punto Azul") */}
          {userIsOnCurrentFloor && (
            <g>
              <circle cx={userLocation.x} cy={userLocation.y} r="18" className="user-pulse" />
              <circle cx={userLocation.x} cy={userLocation.y} r="6" className="user-dot" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
