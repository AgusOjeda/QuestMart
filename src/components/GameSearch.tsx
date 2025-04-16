import React, { useState, useEffect } from 'react';
import { useGameSearch } from '../hooks/useGameData';

const GameSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedTerm, setDebouncedTerm] = useState<string>('');
  const [page, setPage] = useState(1);
  const { games, loading, error, hasMore } = useGameSearch(debouncedTerm, page, 20);

  // Debounce para la búsqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      setPage(1); // Resetear la página cuando cambia la búsqueda
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Manejador para cargar más juegos
  const loadMore = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  };

  // Estilos (los mismos que en GameList)
  const cardStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    maxWidth: '300px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px',
  };

  const gamesContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
  };

  const searchInputStyle: React.CSSProperties = {
    padding: '10px',
    width: '100%',
    maxWidth: '400px',
    margin: '20px auto',
    display: 'block',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  };

  return (
    <div>
      <h1>Buscar Juegos</h1>
      
      <input
        type="text"
        placeholder="Buscar juegos..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={searchInputStyle}
      />
      
      {loading && games.length === 0 && debouncedTerm && (
        <div className="loading">Buscando juegos...</div>
      )}
      
      {error && (
        <div className="error">Error: {error.message}</div>
      )}
      
      {debouncedTerm && games.length === 0 && !loading && (
        <div>No se encontraron juegos para "{debouncedTerm}"</div>
      )}
      
      <div style={gamesContainerStyle}>
        {games.map(game => (
          <div key={game.id} style={cardStyle}>
            {game.background_image && (
              <img 
                src={game.background_image} 
                alt={game.name} 
                style={imageStyle}
              />
            )}
            <h3>{game.name}</h3>
            <p>Rating: {game.rating.toFixed(1)}/5</p>
            {game.cheapestPrice && (
              <p style={{ color: 'green', fontWeight: 'bold' }}>
                Desde: ${game.cheapestPrice}
              </p>
            )}
            {!game.cheapestPrice && (
              <p style={{ color: 'gray' }}>Precio no disponible</p>
            )}
          </div>
        ))}
      </div>
      
      {loading && games.length > 0 && (
        <div className="loading-more">Cargando más juegos...</div>
      )}
      
      {hasMore && !loading && games.length > 0 && (
        <button 
          onClick={loadMore}
          style={{
            padding: '10px 20px',
            margin: '20px auto',
            display: 'block',
            backgroundColor: '#4a90e2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Cargar más
        </button>
      )}
    </div>
  );
};

export default GameSearch; 