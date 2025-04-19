import { useEffect, useState } from 'react';
import Header from '../components/Header';
import PromoCarousel from '../components/PromoCarousel';
import GameRow from '../components/GameRow';
import './HomePage.css';
import Footer from '../components/Footer';
import { useGenres } from '../hooks/useGameData'; 

const HomePage = () => {
  const [indieGenreId, setIndieGenreId] = useState<number | null>(null);
  
  const { genres, loading } = useGenres(); 

  useEffect(() => {
    if (genres.length > 0) {
      const indieGenre = genres.find((genre) => genre.name.toLowerCase() === 'indie');
      if (indieGenre) {
        setIndieGenreId(indieGenre.id); 
      }
    }
  }, [genres]); 

  return (
    <>
      <Header />
      <main className="home">
        <section className="hero">
          <PromoCarousel />
        </section>

        <section className="categories">
          <GameRow 
            title="Juegos Destacados" 
            genreId={null} 
            platformId={null} 
            sortOrder={null} 
          />
        </section>

        <section className="featured">
          <GameRow 
            title="Mejores por Calificación"
            genreId={null} 
            platformId={null} 
            sortOrder="best" 
          />
        </section>

        <section className="indie-games">
          {loading ? (
            <div>Cargando juegos...</div>
          ) : indieGenreId !== null ? (
            <GameRow 
              title="Juegos Indies"
              genreId={indieGenreId} 
              platformId={null} 
              sortOrder={null} 
            />
          ) : (
            <div>No se encontró el género Indie.</div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
