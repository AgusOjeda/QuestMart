import React, { useState } from 'react';
import { useGames } from '../hooks/useGameData';

const GameList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { games, loading, error, hasMore, totalCount } = useGames(page, 20);

  // Manejador para cargar más juegos
  const loadMore = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  };

  // Estilo para las tarjetas de juego
  const cardStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    maxWidth: '300px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  // Estilo para la imagen
  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px',
  };

  // Estilo para el contenedor de juegos
  const gamesContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
  };

  if (loading && games.length === 0) {
    return <div className="loading">Cargando juegos...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Catálogo de Juegos</h1>
      <p>Total de juegos disponibles: {totalCount}</p>
      
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

      {hasMore && !loading && (
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

export default GameList; 