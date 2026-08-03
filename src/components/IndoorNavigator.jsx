import React, { useState } from 'react';
import { Compass, Sun, Moon } from 'lucide-react';
import MapViewer from './MapViewer';
import SearchPanel from './SearchPanel';
import BottomSheet from './BottomSheet';
import SimulatorControls from './SimulatorControls';
import { floors, rooms, graphNodes, roomToNodeMap } from '../data/buildingData';
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

  const handleGpsUpdate = ({ floor, entryName, internalX, internalY }) => {
    const anchor = {
      PB: { x: 940, y: 360 },
      '1': { x: 790, y: 290 },
      '2': { x: 790, y: 290 },
      '3': { x: 490, y: 245 },
    };

    const a = anchor[floor] || anchor.PB;

    const newUserLoc = {
      id: 'user_gps',
      name: entryName || 'Mi Ubicación',
      floor,
      x: internalX ?? a.x,
      y: internalY ?? a.y,
    };

    setUserLocation(newUserLoc);
    setActiveFloor(floor);

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
            <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Mapa de Localización e Interiores</span>
          </div>
          <button className="glass-btn" onClick={toggleTheme} style={{ width: '32px', height: '32px', borderRadius: '8px' }} title="Cambiar tema">
            {isLightTheme ? <Moon size={16} /> : <Sun size={16} />}
          </button>
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

      <SimulatorControls
        userLocation={userLocation}
        onTeleport={handleTeleport}
        onWalk={handleWalk}
      />

      <div style={{ position: 'absolute', right: 16, top: 16, zIndex: 20, display: 'flex', gap: 10, pointerEvents: 'auto' }}>
        <button
          className="glass-btn"
          onClick={() => setGpsEnabled(v => !v)}
          style={{ width: 52, height: 52, borderRadius: 14, background: gpsEnabled ? 'rgba(16,185,129,0.15)' : undefined, borderColor: gpsEnabled ? 'rgba(16,185,129,0.35)' : undefined }}
          title="Activar GPS"
        >
          GPS
        </button>
        <div style={{ alignSelf: 'center', padding: '0 10px', background: 'rgba(0,0,0,0.12)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, fontSize: 11, color: 'var(--text-secondary)', maxWidth: 170, lineHeight: 1.2 }}>
          {gpsStatus}
        </div>
      </div>
    </div>
  );
}
