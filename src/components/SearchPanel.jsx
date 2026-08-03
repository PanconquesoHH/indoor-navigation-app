import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Coffee, BookOpen, User, HelpCircle } from 'lucide-react';
import { rooms } from '../data/buildingData';

export default function SearchPanel({ 
  onSelectRoom, 
  searchQuery, 
  setSearchQuery, 
  activeFloor 
}) {
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Filtrar habitaciones al escribir
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = rooms.filter(room => {
      return (
        room.name.toLowerCase().includes(query) ||
        room.code.toLowerCase().includes(query) ||
        room.tags.some(tag => tag.includes(query)) ||
        getCategoryName(room.category).toLowerCase().includes(query)
      );
    });

    setResults(filtered.slice(0, 5)); // Mostrar máximo 5 resultados
  }, [searchQuery]);

  const handleResultClick = (room) => {
    onSelectRoom(room);
    setSearchQuery(room.name);
    setShowDropdown(false);
  };

  const handleClear = () => {
    setSearchQuery('');
    setResults([]);
    setShowDropdown(false);
  };

  const handleQuickFilter = (category) => {
    // Filtrar directamente por etiquetas de categoría
    setSearchQuery(category);
    setShowDropdown(true);
  };

  function getCategoryName(cat) {
    switch(cat) {
      case 'aula': return 'Aulas';
      case 'oficina': return 'Oficinas';
      case 'laboratorio': return 'Laboratorios';
      case 'comida': return 'Cafetería';
      case 'baño': return 'Servicios / Baños';
      case 'auditorio': return 'Auditorio';
      default: return 'Otros';
    }
  }

  function getCategoryIcon(cat) {
    switch(cat) {
      case 'comida': return <Coffee size={14} />;
      case 'biblioteca': return <BookOpen size={14} />;
      case 'oficina': return <User size={14} />;
      case 'baño': return <MapPin size={14} />;
      default: return <MapPin size={14} />;
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {/* Barra de búsqueda */}
      <div className="search-bar-wrapper">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          className="search-input"
          placeholder="Buscar aulas, oficinas, baños..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
        />
        {searchQuery && (
          <button className="search-action-btn" onClick={handleClear}>
            <X size={18} />
          </button>
        )}
      </div>

      {/* Resultados de autocompletado */}
      {showDropdown && results.length > 0 && (
        <div className="search-results-panel">
          {results.map(room => (
            <div 
              key={room.id}
              className="search-result-item"
              onClick={() => handleResultClick(room)}
            >
              <div className="result-main-info">
                <span className="result-name">{room.name}</span>
                <span className="result-desc">{room.description}</span>
              </div>
              <span className="result-floor-badge">
                Piso {room.floor === 'PB' ? 'Bajo' : room.floor}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Chips de filtro rápido */}
      <div className="quick-tags-container">
        <button className="quick-tag-chip" onClick={() => handleQuickFilter('Aula')}>
          <BookOpen size={14} />
          <span>Aulas</span>
        </button>
        <button className="quick-tag-chip" onClick={() => handleQuickFilter('Oficina')}>
          <User size={14} />
          <span>Oficinas</span>
        </button>
        <button className="quick-tag-chip" onClick={() => handleQuickFilter('Baño')}>
          <MapPin size={14} />
          <span>Baños</span>
        </button>
        <button className="quick-tag-chip" onClick={() => handleQuickFilter('Cafetería')}>
          <Coffee size={14} />
          <span>Cafetería</span>
        </button>
      </div>
    </div>
  );
}
