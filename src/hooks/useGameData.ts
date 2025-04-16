import { useState, useCallback } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import * as RAWGService from '../services/rawg.service';
import * as CheapSharkService from '../services/cheapsharkdeals.service';
import { GameWithPrices } from '../types/game.types';
import { Game } from '../types/rawg.types';

const swrConfig: SWRConfiguration = {
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0, 
  shouldRetryOnError: true,
  dedupingInterval: 2000,
};

// Fetchers para SWR
const gamesFetcher = async ([_, page, pageSize]: ['games', number, number]) => {
  const gamesData = await RAWGService.getGames(page, pageSize);
  return gamesData;
};

const searchGamesFetcher = async ([_, query, page, pageSize]: ['searchGames', string, number, number]) => {
  if (!query.trim()) {
    return { count: 0, results: [], next: null, previous: null };
  }
  return await RAWGService.searchGames(query, page, pageSize);
};

const genreGamesFetcher = async ([_, genreId, page, pageSize]: ['genreGames', number, number, number]) => {
  return await RAWGService.filterGamesByGenre(genreId, page, pageSize);
};

const gameDetailsFetcher = async ([_, id]: ['gameDetails', number]) => {
  return await RAWGService.getGameDetails(id);
};

const genresFetcher = async ([_]: ['genres']) => {
  return await RAWGService.getGenres();
};


const enrichGamesWithPrices = async (games: Game[]): Promise<GameWithPrices[]> => {
  if (!games || games.length === 0) return [];

  try {
    const gamesWithPrices = await Promise.all(
      games.map(async (game) => {
        try {
          const deals = await CheapSharkService.getGameDeals(game.name, 5);
          
          return {
            ...game,
            deals: deals.length > 0 ? deals : undefined,
            cheapestPrice: deals.length > 0 ? deals[0].cheapest : undefined
          };
        } catch (err) {
          console.warn(`No se encontraron precios para: ${game.name}`, err);
          return game;
        }
      })
    );
    return gamesWithPrices;
  } catch (error) {
    console.error('Error enriqueciendo juegos con precios:', error);
    return games;
  }
};


export const useGames = (page = 1, pageSize = 20) => {
  const [gamesWithPrices, setGamesWithPrices] = useState<GameWithPrices[]>([]);
  
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    ['games', page, pageSize],
    gamesFetcher,
    swrConfig
  );
  
  const fetchPrices = useCallback(async () => {
    if (data?.results && data.results.length > 0) {
      const enrichedGames = await enrichGamesWithPrices(data.results);
      setGamesWithPrices(enrichedGames);
    } else {
      setGamesWithPrices([]);
    }
  }, [data]);
  
  useSWR(data ? 'enrichGames' : null, () => fetchPrices(), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  
  return {
    games: gamesWithPrices,
    loading: isLoading || isValidating,
    error,
    hasMore: !!data?.next,
    totalCount: data?.count || 0,
    refetch: mutate
  };
};

export const useGameSearch = (searchTerm: string, page = 1, pageSize = 20) => {
  const [gamesWithPrices, setGamesWithPrices] = useState<GameWithPrices[]>([]);
  
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    searchTerm ? ['searchGames', searchTerm, page, pageSize] : null,
    searchGamesFetcher,
    swrConfig
  );
  
  const fetchPrices = useCallback(async () => {
    if (data?.results && data.results.length > 0) {
      const enrichedGames = await enrichGamesWithPrices(data.results);
      setGamesWithPrices(enrichedGames);
    } else {
      setGamesWithPrices([]);
    }
  }, [data]);
  
  useSWR(data ? 'enrichSearchGames' : null, () => fetchPrices(), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  
  return {
    games: gamesWithPrices,
    loading: isLoading || isValidating,
    error,
    hasMore: !!data?.next,
    totalCount: data?.count || 0,
    refetch: mutate
  };
};

export const useGameDetails = (gameId: number) => {
  const [gameWithPrices, setGameWithPrices] = useState<GameWithPrices | null>(null);
  
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    gameId ? ['gameDetails', gameId] : null,
    gameDetailsFetcher,
    swrConfig
  );
  
  const fetchPrices = useCallback(async () => {
    if (data) {
      try {
        const deals = await CheapSharkService.getGameDeals(data.name, 10);
        
        setGameWithPrices({
          ...data,
          deals: deals.length > 0 ? deals : undefined,
          cheapestPrice: deals.length > 0 ? deals[0].cheapest : undefined
        });
      } catch (err) {
        console.warn(`No se encontraron precios para: ${data.name}`, err);
        setGameWithPrices(data);
      }
    } else {
      setGameWithPrices(null);
    }
  }, [data]);
  
  useSWR(data ? 'enrichGameDetails' : null, () => fetchPrices(), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  
  return {
    game: gameWithPrices,
    loading: isLoading || isValidating,
    error,
    refetch: mutate
  };
};

// Hook para filtrar juegos por género
export const useGamesByGenre = (genreId: number, page = 1, pageSize = 20) => {
  const [gamesWithPrices, setGamesWithPrices] = useState<GameWithPrices[]>([]);
  
  // Utilizamos SWR para obtener juegos por género
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    genreId ? ['genreGames', genreId, page, pageSize] : null,
    genreGamesFetcher,
    swrConfig
  );
  
  // Al recibir juegos filtrados, añadimos los precios
  const fetchPrices = useCallback(async () => {
    if (data?.results && data.results.length > 0) {
      const enrichedGames = await enrichGamesWithPrices(data.results);
      setGamesWithPrices(enrichedGames);
    } else {
      setGamesWithPrices([]);
    }
  }, [data]);
  
  // Efecto para cargar precios cuando cambia la data
  useSWR(data ? 'enrichGenreGames' : null, () => fetchPrices(), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  
  return {
    games: gamesWithPrices,
    loading: isLoading || isValidating,
    error,
    hasMore: !!data?.next,
    totalCount: data?.count || 0,
    refetch: mutate
  };
};

// Hook para obtener géneros disponibles
export const useGenres = () => {
  // Utilizamos SWR para obtener géneros
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    ['genres'],
    genresFetcher,
    swrConfig
  );
  
  return {
    genres: data?.results || [],
    loading: isLoading || isValidating,
    error,
    refetch: mutate
  };
}; 