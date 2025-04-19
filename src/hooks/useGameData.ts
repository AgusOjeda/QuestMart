import { useEffect, useState, useCallback } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import * as RAWGService from '../services/rawg.service';
import * as CheapSharkService from '../services/cheapsharkdeals.service';
import { GameWithPrices } from '../types/game.types';
import { Game } from '../types/rawg.types';
import { PlatformOption } from '../types/rawg.types';

//Cache manual para evitar tantas llamadas

const MAX_CACHE_SIZE = 50;
const enrichmentCache = new Map<string, GameWithPrices>();


const swrConfig: SWRConfiguration = {
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0,
  shouldRetryOnError: true,
  dedupingInterval: 2000,
};

// Fetchers para SWR

const gameDetailsFetcher = async ([_, id]: ['gameDetails', number]) => {
  return await RAWGService.getGameDetails(id);
};

const genresFetcher = async ([_]: ['genres']) => {
  return await RAWGService.getGenres();
};

/*
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
*/

/*
Nuevo Update con Cache en diccionario para tratar de saturar menos las peticiones
*/

const updateCache = (gameName: string, enrichedGame: GameWithPrices) => {
  if (enrichmentCache.size >= MAX_CACHE_SIZE) {
    const firstKey = enrichmentCache.keys().next().value;
    if (firstKey !== undefined) {
      enrichmentCache.delete(firstKey); 
    }
  }

  enrichmentCache.set(gameName, enrichedGame);
};

const enrichGamesWithPrices = async (games: Game[]): Promise<GameWithPrices[]> => {
  if (!games || games.length === 0) return [];

  try {
    const gamesWithPrices = await Promise.all(
      games.map(async (game) => {
        if (enrichmentCache.has(game.name)) {
          return enrichmentCache.get(game.name)!; 
        }
        try {
          const deals = await CheapSharkService.getGameDeals(game.name, 5);
          
          const enrichedGame: GameWithPrices = {
            ...game,
            deals: deals.length > 0 ? deals : undefined,
            cheapestPrice: deals.length > 0 ? deals[0].cheapest : undefined
          };
          updateCache(game.name, enrichedGame);
          return enrichedGame;
        } catch (err) {
          console.warn(`No se encontraron precios para: ${game.name}`, err);
          const enrichedGame: GameWithPrices = {
            ...game
          };
          updateCache(game.name, enrichedGame);  
          return enrichedGame;
        }
      })
    );
    return gamesWithPrices;
  } catch (error) {
    console.error('Error enriqueciendo juegos con precios:', error);
    return games;
  }
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

// Hook para obtener géneros disponibles

export const useGenres = () => {
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


//Fetch

// Fetcher para juegos con filtros
const searchGamesWithFiltersFetcher = async (
  [_, query, genreId, platformId, sortOrder, page, pageSize]: 
  ['searchGamesWithFilters', string, number | null, number | null, 'best' | 'worst' | null, number, number]
) => {
  return await RAWGService.searchGamesWithFilters(query, genreId, platformId, sortOrder, page, pageSize);
};

// Busqueda con juegos con filtros concatenados

export const useGameSearchWithFilters = (
  searchTerm: string, 
  genreId: number | null = null, 
  platformId: number | null = null, 
  sortOrder: 'best' | 'worst' | null = null, 
  page = 1, 
  pageSize = 10
) => {
  const [gamesWithPrices, setGamesWithPrices] = useState<GameWithPrices[]>([]);

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    ['searchGamesWithFilters', searchTerm, genreId, platformId, sortOrder, page, pageSize],
    searchGamesWithFiltersFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      revalidateOnMount: true,
      dedupingInterval: 10000,
    }
  );

  useEffect(() => {
    if (data?.results && data.results.length > 0) {
      const fetchPrices = async () => {
        const enrichedGames = await enrichGamesWithPrices(data.results);
        setGamesWithPrices(enrichedGames);
      };
      fetchPrices();
    } else {
      setGamesWithPrices([]);
    }
  }, [data]);

  return {
    games: gamesWithPrices,
    loading: isLoading || isValidating,
    error,
    hasMore: !!data?.next,
    totalCount: data?.count || 0,
    refetch: mutate
  };
};

//Fetch y hook para obtener las plataformas que existen

const platformsFetcher = async ([_]: ['platforms']): Promise<PlatformOption[]> => {
  return await RAWGService.getPlatforms();
};

export const usePlatforms = () => {

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    ['platforms'],
    platformsFetcher, 
    swrConfig           
  );

  return {
    platforms: data || [], 
    loading: isLoading || isValidating, 
    error,
    refetch: mutate  
  };
};
