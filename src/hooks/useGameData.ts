import { useState, useCallback, useEffect } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import * as RAWGService from '../services/rawg.service';
import * as CheapSharkService from '../services/cheapsharkdeals.service';
import { GameWithPrices } from '../types/game.types';
import { PlatformOption } from '../types/rawg.types';

const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
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

const platformsFetcher = async ([_]: ['platforms']): Promise<PlatformOption[]> => {
  return await RAWGService.getPlatforms();
};

const searchGamesWithFiltersFetcher = async (
  [_, query, genreId, platformId, sortOrder, page, pageSize]:
    ['searchGamesWithFilters', string, number | null, number | null, 'best' | 'worst' | null, number, number]
) => {
  return await RAWGService.searchGamesWithFilters(query, genreId, platformId, sortOrder, page, pageSize);
};


// Hook para obtener los detalles de un juego


export const useGameDetails = (gameId: number) => {
  const [gameWithPrices, setGameWithPrices] = useState<GameWithPrices | null>(null);

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    gameId ? ['gameDetails', gameId] : null,
    gameDetailsFetcher,
    swrConfig
  );

  useEffect(() => {
      setGameWithPrices(null);
    }, [gameId]);

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

  useSWR(data ? ['enrichGameDetails', gameId] : null, () => fetchPrices(), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: true
  });
  const combinedLoading = isLoading || (!gameWithPrices && !error) || isValidating;

  return {
    game: gameWithPrices,
    loading: combinedLoading,
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


// Hook para realizar la busqueda de juegos con filtros concatenados


export const useGameSearchWithFilters = (
  searchTerm: string,
  genreId: number | null = null,
  platformId: number | null = null,
  sortOrder: 'best' | 'worst' | null = null,
  page = 1,
  pageSize = 10
) => {
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

  return {
    games: data?.results || [],
    loading: isLoading || isValidating,
    error,
    hasMore: !!data?.next,
    totalCount: data?.count || 0,
    refetch: mutate
  };
};


//Hook para obtener las plataformas que existen


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
