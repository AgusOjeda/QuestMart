import React, { useState } from 'react';
import GameList from './GameList';
import GameSearch from './GameSearch';

enum View {
  LIST = 'list',
  SEARCH = 'search',
}

const GameApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LIST);

  const navStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    marginBottom: '20px',
  };

  const navButtonStyle = (active: boolean): React.CSSProperties => ({
    padding: '10px 20px',
    backgroundColor: active ? '#4a90e2' : 'white',
    color: active ? 'white' : '#333',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: active ? 'bold' : 'normal',
  });

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center' }}>QuestMart - Tienda de Videojuegos</h1>

      {/* Barra de navegación */}
      <nav style={navStyle}>
        <button
          style={navButtonStyle(currentView === View.LIST)}
          onClick={() => setCurrentView(View.LIST)}
        >
          Catálogo de Juegos
        </button>
        <button
          style={navButtonStyle(currentView === View.SEARCH)}
          onClick={() => setCurrentView(View.SEARCH)}
        >
          Buscar Juegos
        </button>
      </nav>

      {/* Contenido principal */}
      <main>
        {currentView === View.LIST && <GameList />}
        {currentView === View.SEARCH && <GameSearch />}
      </main>
    </div>
  );
};

export default GameApp; 