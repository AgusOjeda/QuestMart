import { Link } from 'react-router-dom';
import { Props } from '../types/game.types';
import './GameCard.css';



const GameCard = ({ game }: Props) => {
  return (
    <div className="game-card">
      <img src={game.background_image} alt={game.name} className="game-image" />
      <h3>
        <Link to={`/product/${game.id}`} className="game-name-link">
          {game.name}
        </Link>
      </h3>
      <p>Rating: {game.rating.toFixed(1)}/5</p>
      {game.released && <p>Fecha de Salida: {new Date(game.released).toLocaleDateString()}</p>}
    </div>
  );
};

export default GameCard;
