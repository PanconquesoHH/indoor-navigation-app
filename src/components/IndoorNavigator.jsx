import React, { useState } from 'react';
import { Compass, Sun, Moon, Radar } from 'lucide-react';
import MapViewer from './MapViewer';
import SearchPanel from './SearchPanel';
import BottomSheet from './BottomSheet';
import SimulatorControls from './SimulatorControls';
import { floors, rooms, graphNodes, roomToNodeMap, graphEdges } from '../data/buildingData';
import { findShortestPath } from '../utils/pathfinding';
import GpsLocationController from './GpsLocationController';

export default function IndoorNavigator() {
  const [activeFloor, setActiveFloor] = useState('PB');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [userLocation, setUserLocation] = useState({
    id: 'user_simulated',
    name: 'Ingreso Principal',
    floor: 'PB',
    x: 940,
    y: 360
  });

  const [routeInfo, setRouteInfo] = useState(null);
  const [isLightTheme, setIsLightTheme] = useState(false);

  const [gpsEnabled, setGpsEnabled] = useState(false);
  const [gpsStatus, setGpsStatus] = useState('GPS apagado');

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
    if (!isLightTheme) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  const findNearestNode = (x, y, floor) => {
    let nearestNode = null;
    let minDistance = Infinity;

    Object.values(graphNodes).forEach(node => {
      if (node.floor === floor) {
        const dist = Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.y - y, 2));
        if (dist < minDistance) {
          minDistance = dist;
          nearestNode = node;
        }
      }
    });

    return nearestNode;
  };

  const recalculateRoute = (currentUserLoc, destinationRoom) => {
    if (!destinationRoom) return;

    const endNodeId = roomToNodeMap[destinationRoom.id];
    if (!endNodeId) return;

    const startNode = findNearestNode(currentUserLoc.x, currentUserLoc.y, currentUserLoc.floor);
    if (!startNode) return;

    const result = findShortestPath(startNode.id, endNodeId);

    if (result.path.length > 0) {
      setRouteInfo({
        distance: result.distance,
        instructions: result.instructions,
        path: result.path,
        startName: currentUserLoc.name || 'Mi Ubicación',
        endName: destinationRoom.name,
        targetRoomId: destinationRoom.id
      });
    }
  };

  const handleStartRoute = (room, setAsOrigin = false) => {
    if (setAsOrigin) {
      const nodeGoalId = roomToNodeMap[room.id];
      const targetNode = graphNodes[nodeGoalId];
      if (targetNode) {
        const newUserLoc = {
          id: targetNode.id,
          name: room.name,
          floor: room.floor,
          x: targetNode.x,
          y: targetNode.y
        };
        setUserLocation(newUserLoc);
        setActiveFloor(room.floor);
        if (selectedRoom && selectedRoom.id !== room.id) {
          recalculateRoute(newUserLoc, selectedRoom);
        }
      }
    } else {
      recalculateRoute(userLocation, room);
    }
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    setActiveFloor(room.floor);

    if (routeInfo) {
      recalculateRoute(userLocation, room);
    }
  };

  const handleTeleport = (node) => {
    const newUserLoc = {
      id: node.id,
      name: node.name.replace('QR: ', '').replace('Puerta ', ''),
      floor: node.floor,
      x: node.x,
      y: node.y
    };
    setUserLocation(newUserLoc);
    setActiveFloor(node.floor);

    if (routeInfo) {
      const destRoom = rooms.find(r => r.id === routeInfo.targetRoomId);
      recalculateRoute(newUserLoc, destRoom);
    }
  };

  const handleGpsUpdate = ({ floor, entryName, internalX, internalY, isRelative }) => {
    const anchor = {
      PB: { x: 940, y: 360 },
      '1': { x: 790, y: 290 },
      '2': { x: 790, y: 290 },
      '3': { x: 490, y: 245 },
    };

    const actualFloor = isRelative ? activeFloor : floor;
    const a = anchor[actualFloor] || anchor.PB;

    const newUserLoc = {
      id: 'user_gps',
      name: entryName || 'Mi Ubicación',
      floor: actualFloor,
      x: internalX ?? a.x,
      y: internalY ?? a.y,
    };

    setUserLocation(newUserLoc);
    if (!isRelative) {
      setActiveFloor(actualFloor);
    }
    setGpsStatus(isRelative ? 'GPS Relativo (Demo)' : 'GPS Conectado');

    if (routeInfo) {
      const destRoom = rooms.find(r => r.id === routeInfo.targetRoomId);
      recalculateRoute(newUserLoc, destRoom);
    }
  };

  const handleGpsError = (msg) => {
    setGpsStatus(msg || 'GPS error');
  };

  const handleWalk = (dx, dy) => {
    const newX = userLocation.x + dx;
    const newY = userLocation.y + dy;

    if (newX < 60 || newX > 960 || newY < 50 || newY > 430) return;

    const updatedUserLoc = {
      ...userLocation,
      id: 'user_simulated',
      name: 'Simulando a pie',
      x: newX,
      y: newY
    };

    setUserLocation(updatedUserLoc);

    if (routeInfo) {
      const destRoom = rooms.find(r => r.id === routeInfo.targetRoomId);
      recalculateRoute(updatedUserLoc, destRoom);
    }
  };

  const handleCancelRoute = () => {
    setRouteInfo(null);
  };

  // Lógica para detectar si el usuario está parado en una escalera y puede cambiar de piso
  const nearestNodeForStairs = findNearestNode(userLocation.x, userLocation.y, userLocation.floor);
  const isOnStairs = nearestNodeForStairs && nearestNodeForStairs.isStairs &&
    Math.sqrt(Math.pow(nearestNodeForStairs.x - userLocation.x, 2) + Math.pow(nearestNodeForStairs.y - userLocation.y, 2)) < 35;

  // Encontrar conexiones verticales en el grafo
  const verticalConnections = isOnStairs ? graphEdges.filter(edge => 
    edge.isVertical && (edge.from === nearestNodeForStairs.id || edge.to === nearestNodeForStairs.id)
  ).map(edge => {
    const neighborId = edge.from === nearestNodeForStairs.id ? edge.to : edge.from;
    return graphNodes[neighborId];
  }) : [];

  return (
    <div className="app-container">
      <MapViewer
        activeFloor={activeFloor}
        selectedRoom={selectedRoom}
        onSelectRoom={handleSelectRoom}
        userLocation={userLocation}
        routePath={routeInfo ? routeInfo.path : null}
      />

      <div className="floating-overlay-top">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-glass)',
          backdropFilter: 'blur(var(--blur-glass))',
          padding: '10px 16px',
          borderRadius: '14px',
          pointerEvents: 'auto',
          boxShadow: 'var(--shadow-premium)'
        }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '15px', fontWeight: '800', letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Compass size={18} style={{ color: 'var(--brand-primary)' }} />
              Turismo USFX
            </h1>
            <span className={`gps-status-subtitle ${gpsEnabled ? 'gps-status-active' : ''}`}>
              {gpsStatus}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className={`glass-btn gps-radar-btn ${gpsEnabled ? 'gps-radar-active' : ''}`}
              onClick={() => setGpsEnabled(v => !v)}
              style={{ width: '32px', height: '32px', borderRadius: '8px' }}
              title={gpsEnabled ? 'Desactivar GPS' : 'Activar GPS'}
            >
              <Radar size={16} className={gpsEnabled ? 'gps-radar-icon' : ''} />
            </button>
            <button className="glass-btn" onClick={toggleTheme} style={{ width: '32px', height: '32px', borderRadius: '8px' }} title="Cambiar tema">
              {isLightTheme ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
        </div>

        <SearchPanel
          onSelectRoom={handleSelectRoom}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFloor={activeFloor}
        />
      </div>

      <div className="floating-controls-right" style={{ top: '35%' }}>
        <div className="floor-selector-pill">
          {floors.slice().reverse().map(floor => (
            <button
              key={floor.id}
              className={`floor-btn ${activeFloor === floor.id ? 'active' : ''}`}
              onClick={() => setActiveFloor(floor.id)}
            >
              {floor.shortName}
            </button>
          ))}
        </div>
      </div>

      <GpsLocationController
        enabled={gpsEnabled}
        onGpsUpdate={handleGpsUpdate}
        onGpsError={handleGpsError}
      />

      <BottomSheet
        selectedRoom={selectedRoom}
        routeInfo={routeInfo}
        onStartRoute={handleStartRoute}
        onCancelRoute={handleCancelRoute}
        onClose={() => setSelectedRoom(null)}
        userLocation={userLocation}
      />

      {isOnStairs && verticalConnections.length > 0 && (
        <div className="stairs-transition-panel">
          <span className="stairs-panel-title">🚪 Transición de Piso</span>
          <div className="stairs-panel-buttons">
            {verticalConnections.map(targetNode => {
              const currentFloorNum = activeFloor === 'PB' ? 0 : parseInt(activeFloor);
              const targetFloorNum = targetNode.floor === 'PB' ? 0 : parseInt(targetNode.floor);
              const isUp = targetFloorNum > currentFloorNum;
              return (
                <button
                  key={targetNode.id}
                  className="glass-btn stairs-action-btn"
                  onClick={() => handleTeleport(targetNode)}
                  style={{ gap: '4px', cursor: 'pointer' }}
                >
                  <span>{isUp ? '▲ Subir al' : '▼ Bajar al'} {targetNode.floor === 'PB' ? 'Piso PB' : `${targetNode.floor}º Piso`}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <SimulatorControls
        userLocation={userLocation}
        onTeleport={handleTeleport}
        onWalk={handleWalk}
      />
    </div>
  );
}
