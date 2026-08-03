import { graphNodes, graphEdges } from '../data/buildingData';

// Implementación del Algoritmo Dijkstra para ruteo de interiores
export function findShortestPath(startNodeId, endNodeId) {
  if (!graphNodes[startNodeId] || !graphNodes[endNodeId]) {
    return { path: [], distance: Infinity, instructions: [] };
  }

  const distances = {};
  const previous = {};
  const queue = [];

  // Inicializar distancias
  Object.keys(graphNodes).forEach(nodeId => {
    distances[nodeId] = Infinity;
    previous[nodeId] = null;
    queue.push(nodeId);
  });

  distances[startNodeId] = 0;

  // Construir mapa de adyacencia
  const adjacencyList = {};
  Object.keys(graphNodes).forEach(nodeId => {
    adjacencyList[nodeId] = [];
  });

  graphEdges.forEach(edge => {
    // Las conexiones del grafo de interiores son bidireccionales
    adjacencyList[edge.from].push({ node: edge.to, weight: edge.weight, isVertical: edge.isVertical });
    adjacencyList[edge.to].push({ node: edge.from, weight: edge.weight, isVertical: edge.isVertical });
  });

  while (queue.length > 0) {
    // Encontrar nodo con menor distancia
    queue.sort((a, b) => distances[a] - distances[b]);
    const u = queue.shift();

    if (u === endNodeId) break;
    if (distances[u] === Infinity) break;

    // Actualizar vecinos
    adjacencyList[u].forEach(neighbor => {
      const alt = distances[u] + neighbor.weight;
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt;
        previous[neighbor.node] = u;
      }
    });
  }

  // Reconstruir camino
  const pathIds = [];
  let current = endNodeId;
  while (current !== null) {
    pathIds.unshift(current);
    current = previous[current];
  }

  if (distances[endNodeId] === Infinity) {
    return { path: [], distance: Infinity, instructions: [] };
  }

  const pathNodes = pathIds.map(id => graphNodes[id]);
  const instructions = generateInstructions(pathNodes);

  return {
    path: pathNodes,
    distance: distances[endNodeId],
    instructions
  };
}

// Genera instrucciones textuales en español a partir del camino calculado
function generateInstructions(path) {
  const steps = [];
  if (path.length <= 1) return steps;

  let currentFloor = path[0].floor;
  
  steps.push(`Inicia en ${path[0].name}.`);

  for (let i = 0; i < path.length - 1; i++) {
    const nodeA = path[i];
    const nodeB = path[i + 1];

    if (nodeA.floor !== nodeB.floor) {
      // Cambio de piso (Escalera)
      const action = getFloorNumber(nodeB.floor) > getFloorNumber(nodeA.floor) ? 'Sube' : 'Baja';
      const stairsName = nodeA.name.includes('Izquierda') ? 'Escalera Izquierda' : 'Escalera Derecha';
      steps.push(`${action} por la ${stairsName} hasta el ${getFloorName(nodeB.floor)}.`);
      currentFloor = nodeB.floor;
    } else {
      // Movimiento en el mismo piso
      if (nodeB.id.includes('door') && i === path.length - 2) {
        // Llegada a destino
        const targetRoomName = nodeB.name.replace('Puerta ', '');
        steps.push(`Camina hacia la entrada de: ${targetRoomName}.`);
      } else if (nodeA.id.includes('pasillo') && nodeB.id.includes('pasillo')) {
        // Continuar caminando por pasillo
        if (steps[steps.length - 1] !== 'Camina por el pasillo principal.') {
          steps.push('Camina por el pasillo principal.');
        }
      } else if (nodeA.id.includes('node') && nodeB.id.includes('pasillo')) {
        // Saliendo de la escalera hacia el pasillo
        steps.push(`Incorpórate al pasillo del ${getFloorName(nodeB.floor)}.`);
      }
    }
  }

  steps.push('¡Has llegado a tu destino!');
  
  // Limpiar instrucciones duplicadas contiguas (por ejemplo, múltiples "Camina por el pasillo")
  const uniqueSteps = [];
  steps.forEach(step => {
    if (uniqueSteps.length === 0 || uniqueSteps[uniqueSteps.length - 1] !== step) {
      uniqueSteps.push(step);
    }
  });

  return uniqueSteps;
}

function getFloorNumber(floor) {
  if (floor === 'PB') return 0;
  return parseInt(floor, 10);
}

function getFloorName(floor) {
  switch (floor) {
    case 'PB': return 'Planta Baja';
    case '1': return 'Primer Piso';
    case '2': return 'Segundo Piso';
    case '3': return 'Tercer Piso';
    default: return `${floor} Piso`;
  }
}
