import React, { useState } from 'react';
import { usePlatforms } from '../hooks/useGameData';  // Asegúrate de tener el hook de plataformas
import './PlatformFilter.css';  // Estilos para tu componente (si los tienes)

interface PlatformFilterProps {
  selectedPlatformId: number | null;
  onPlatformSelect: (platformId: number | null) => void;
}

const PlatformFilter: React.FC<PlatformFilterProps> = ({ selectedPlatformId, onPlatformSelect }) => {
  const { platforms, loading, error } = usePlatforms();
  const [isOpen, setIsOpen] = useState(false);

  if (loading) return <p>Cargando plataformas...</p>;
  if (error) return <p>Error al cargar las plataformas</p>;

  return (
    <aside className="platform-filter">
      <button
        className="platform-toggle"
        onClick={() => setIsOpen(prev => !prev)}
      >
        Plataforma
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      <ul className={`platform-list ${isOpen ? 'open' : ''}`}>
        <li
          className={selectedPlatformId === null ? 'selected' : ''}
          onClick={() => onPlatformSelect(null)}
        >
          Todos
        </li>
        {platforms.map((platform) => (
          <li
            key={platform.id}
            className={selectedPlatformId === platform.id ? 'selected' : ''}
            onClick={() => onPlatformSelect(platform.id)}
          >
            {platform.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default PlatformFilter;
