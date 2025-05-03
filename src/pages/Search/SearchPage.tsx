import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGameSearchWithFilters } from '../../hooks/useGameData.ts'
import Header from '../../components/Header/Header.tsx'
import GenreFilter from '../../components/GenreFilter/GenreFilter.tsx'
import './SearchPage.css'
import { GameWithPrices } from '../../types/game.types.ts'
import useDebounce from '../../hooks/useDebounce.ts'
import PlatformFilter from '../../components/PlatformFilter/PlatformFilter.tsx'
import Footer from '../../components/Footer/Footer.tsx'
import GameCard from '../../components/GameCard/GameCard.tsx'




const SearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const rawSearchTerm = searchParams.get('q') || '';
    const rawGenre = searchParams.get('genre');
    const rawPlatform = searchParams.get('platform');
    const rawSort = searchParams.get('sort');

    const [searchTerm, setSearchTerm] = useState(rawSearchTerm);
    const [page, setPage] = useState(1);
    const [allGames, setAllGames] = useState<GameWithPrices[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(
        rawGenre ? parseInt(rawGenre) : null
    );
    const [sortOrder, setSortOrder] = useState<'best' | 'worst' | null>(
        rawSort === 'best' || rawSort === 'worst' ? rawSort : null
    );
    const [showFiltersMobile, setShowFiltersMobile] = useState(false);
    const [showPlatformMobile, setShowPlatformMobile] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState<number | null>(
        rawPlatform ? parseInt(rawPlatform) : null
    );
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const platformSidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSearchTerm(rawSearchTerm);
        setPage(1);
        setAllGames([]);
    }, [rawSearchTerm]);

    useEffect(() => {
        const parsedGenre = rawGenre ? parseInt(rawGenre) : null;
        const parsedPlatform = rawPlatform ? parseInt(rawPlatform) : null;
        const parsedSort = rawSort === 'best' || rawSort === 'worst' ? rawSort : null;
    
        const isSame =
            parsedGenre === selectedGenre &&
            parsedPlatform === selectedPlatform &&
            parsedSort === sortOrder;
    
        if (!isSame) {
            setSelectedGenre(parsedGenre);
            setSelectedPlatform(parsedPlatform);
            setSortOrder(parsedSort);
            setPage(1);
            setAllGames([]);
        }
    }, [rawGenre, rawPlatform, rawSort]);

    useEffect(() => {
        setPage(1);
        setAllGames([]);
    }, [sortOrder, selectedGenre]);

    const { games, loading, error, hasMore } = useGameSearchWithFilters(
        debouncedSearchTerm,
        selectedGenre,
        selectedPlatform,
        sortOrder,
        page,
        10
    );

    useEffect(() => {
        if (games.length > 0) {
            setAllGames(prev =>
                page === 1 ? games : [...prev, ...games]
            );
        }
    }, [games]);

    const loadMore = () => {
        if (hasMore && !loading) {
            setPage(prev => prev + 1);
        }
    };

    const handleGenreSelect = (genreId: number | null) => {
        setSelectedGenre(genreId);
        updateSearchParams({ genre: genreId?.toString() || null });
        setAllGames([]);
        setShowFiltersMobile(false);
    };

    useEffect(() => {
        document.body.style.overflow = showFiltersMobile ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showFiltersMobile]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                showFiltersMobile &&
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                setShowFiltersMobile(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showFiltersMobile]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                showPlatformMobile &&
                platformSidebarRef.current &&
                !platformSidebarRef.current.contains(event.target as Node)
            ) {
                setShowPlatformMobile(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPlatformMobile]);

    const handlePlatformSelect = (platformId: number | null) => {
        setSelectedPlatform(platformId);
        updateSearchParams({ platform: platformId?.toString() || null });
        setAllGames([]);
        setShowPlatformMobile(false);
    };

    const updateSearchParams = (updates: Record<string, string | null>) => {
        const newParams = new URLSearchParams(searchParams.toString());
    
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === '') {
                newParams.delete(key);
            } else {
                newParams.set(key, value);
            }
        });
    
        setSearchParams(newParams);
    };

    return (
        <>
            <Header />
            <main className="search-page">
                <h1>
                    {searchTerm.trim()
                        ? `Resultados de búsqueda para "${searchTerm}"`
                        : 'Lista de juegos'}
                </h1>

                <hr className="search-separator" />

                <button
                    className="filter-toggle-btn"
                    onClick={() => {
                        setShowFiltersMobile(prev => !prev);
                        setShowPlatformMobile(false); 
                    }}
                >
                    {showFiltersMobile ? 'Ocultar filtros' : 'Mostrar filtros'}
                </button>

                <button
                    className="platform-toggle-btn"
                    onClick={() => {
                        setShowPlatformMobile(prev => !prev);
                        setShowFiltersMobile(false); 
                    }}
                >
                    {showPlatformMobile ? 'Ocultar plataformas' : 'Mostrar plataformas'}
                </button>

                <div className="search-layout">
                    <div className="sidebars-container">
                        <div
                            className={`genre-sidebar ${showFiltersMobile ? 'open' : ''}`}
                            ref={sidebarRef}
                        >
                            <GenreFilter
                                selectedGenreId={selectedGenre}
                                onGenreSelect={handleGenreSelect}
                            />
                        </div>
                        <div
                            className={`platform-sidebar ${showPlatformMobile ? 'open' : ''}`}
                            ref={platformSidebarRef}
                        >
                            <PlatformFilter
                                selectedPlatformId={selectedPlatform}
                                onPlatformSelect={handlePlatformSelect}
                            />
                        </div>
                    </div>
                    <div className="content-container">
                        <div className="sort-container">
                            <label htmlFor="sortOrder">Ordenar por calificación:</label>
                            <select
                                id="sortOrder"
                                value={sortOrder || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const order = value === 'best' || value === 'worst' ? value : null;
                                    setSortOrder(order);
                                    updateSearchParams({ sort: order });
                                }}
                            >
                                <option value="">Mas Relevantes</option>
                                <option value="best">Mejor calificación</option>
                                <option value="worst">Peor calificación</option>
                            </select>
                        </div>
                        <div className="sort-separator" />
                        <div className="games-container">
                            {loading && allGames.length === 0 && <div>Buscando juegos...</div>}
                            {error && <div>Error: {error.message}</div>}

                            {allGames.map((game) => (
                                <GameCard key={game.id} game={game} />
                            ))}
                            {!loading && allGames.length > 0 && hasMore && (
                                <div className="load-more-container">
                                    <button onClick={loadMore} className="load-more-btn">
                                        Cargar más
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default SearchPage;