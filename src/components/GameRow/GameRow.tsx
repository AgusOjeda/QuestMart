import React from 'react';
import { useGameSearchWithFilters } from '../../hooks/useGameData'; 
import GameCard from '../GameCard/GameCard';
import './GameRow.css'
import { GameRowProps } from '../../types/game.types';

const GameRow: React.FC<GameRowProps> = ({ title, genreId, platformId, sortOrder }) => {
  const { games, loading, error } = useGameSearchWithFilters(
    '', 
    genreId,
    platformId,
    sortOrder,
    2,
    3 
  );

  if (loading) return <div>Cargando {title}...</div>;
  if (error) return <div>Error cargando los juegos.</div>;

  return (
    <section className="game-row">
      <h2 className="row-title">{title}</h2>
      <hr className="row-separator" /> 
      <div className="games-row-list">
        {games.map((game) => (
          <GameCard key={game.id} game={game} /> 
        ))}
      </div>
    </section>
  );
};

export default GameRow;
