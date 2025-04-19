import { useState, useEffect } from 'react';
import './PromoCarousel.css';
import bannerJuegos from '../assets/BannerJuegos.jpg';
import bannerConsolas from '../assets/BannerConsolas.jpg';
import bannerProximo from '../assets/BannerProximo.jpg';

const slides = [
  {
    image: bannerJuegos,
    text: 'Disfrutá de nuestro catálogo con más de 800.000 juegos',
  },
  {
    image: bannerConsolas,
    text: 'Encontrá tus juegos favoritos en la plataforma que quieras',
  },
  {
    image: bannerProximo,
    text: 'Estate atento a futuros lanzamientos',
  },
];

const PromoCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 10000); 

    return () => clearTimeout(timer); 
  }, [current]); 

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length); 
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length); 
  };

  return (
    <div className="promo-carousel">
      <button className="carousel-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`carousel-slide ${index === current ? 'active' : ''}`}
        >
          <img src={slide.image} alt={`Promo ${index + 1}`} />
          <div className="carousel-text">
            <h2>{slide.text}</h2>
          </div>
        </div>
      ))}
      <button className="carousel-button next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default PromoCarousel;
