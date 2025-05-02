import React, { useState } from 'react';
import { useGenres } from '../../hooks/useGameData'; 
import './GenreFilter.css'; 

interface GenreFilterProps {
  selectedGenreId: number | null;
  onGenreSelect: (genreId: number | null) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ selectedGenreId, onGenreSelect }) => {
  const { genres, loading, error } = useGenres();
  const [isOpen, setIsOpen] = useState(false);

  if (loading) return <p>Cargando géneros...</p>;
  if (error) return <p>Error al cargar los géneros</p>;

  return (
    <div className="genre-filter">
      <button
        className="genre-toggle"
        onClick={() => setIsOpen(prev => !prev)}
      >
        Género
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      <ul className={`genre-list ${isOpen ? 'open' : ''}`}>
        <li
          className={selectedGenreId === null ? 'selected' : ''}
          onClick={() => onGenreSelect(null)}
        >
          Todos
        </li>
        {genres.map((genre) => (
          <li
            key={genre.id}
            className={selectedGenreId === genre.id ? 'selected' : ''}
            onClick={() => onGenreSelect(genre.id)}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreFilter;
