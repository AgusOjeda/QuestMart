import { useState } from 'react';
import Header from '../components/Header';
import './ProductDetail.css';
import { useParams } from 'react-router-dom';
import { useGameDetails } from '../hooks/useGameData';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const gameId = Number(id);
  const { game, loading, error } = useGameDetails(gameId);
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();

  const getDescriptionExcerpt = (description: string, maxWords: number) => {
    const words = description.split(' ');
    if (words.length <= maxWords) return description;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Header />
      <main className="product-detail">
        {loading && <div className="loading">Cargando detalles...</div>}

        {(!loading && (error)) && (
          <div className="error">No se pudo cargar la información del juego.</div>
        )}

        {!loading && game && (
          <>
            <section className="game-header">
              <div className="game-image-container">
                <img src={game.background_image} alt={game.name} className="game-image-details" />
              </div>
              <div className="game-info">
                <h1 className="game-title">{game.name}</h1>
                <div className="rating">
                  <strong>Rating:</strong> {game.rating.toFixed(1)} / 5
                </div>
              </div>
            </section>

            <section className="game-details">
              <div className="description-section">
                {game.description_raw && (
                  <div className="info-item description">
                    <strong>Descripción:</strong>
                    <p>
                      {isExpanded
                        ? game.description_raw
                        : getDescriptionExcerpt(game.description_raw, 166)}
                    </p>
                    {game.description_raw.split(' ').length > 166 && (
                      <button className="toggle-description-btn" onClick={handleToggleDescription}>
                        {isExpanded ? 'Ver menos' : 'Ver más'}
                      </button>
                    )}
                  </div>
                )}
                <div className="price-section">
                  <button className="buy-button">
                    Precio: <strong>${game.cheapestPrice || "0.00"}</strong>
                  </button>
                  <button
                    className="share-button"
                    onClick={() => navigate('/share', { state: { game } })}
                  >
                    Compartir con un amigo
                  </button>
                </div>

              </div>
              <div className="details-grid">
                <div className="info-item">
                  <strong>Géneros:</strong> {game.genres?.map(g => g.name).join(', ')}
                </div>

                {game.released && (
                  <div className="info-item">
                    <strong>Lanzamiento:</strong> {new Date(game.released).toLocaleDateString()}
                  </div>
                )}

                <div className="info-item">
                  <strong>Metacritic:</strong> {game.metacritic}
                </div>

                <div className="info-item">
                  <strong>Plataformas:</strong> {game.platforms?.map(p => p.platform.name).join(', ')}
                </div>

                <div className="info-item">
                  <strong>Desarrolladores:</strong> {game.developers?.map(d => d.name).join(', ')}
                </div>

                <div className="info-item">
                  <strong>Distribuidores:</strong> {game.publishers?.map(p => p.name).join(', ')}
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
