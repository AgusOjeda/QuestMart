import { Game, Genre, RAWGResponse, PlatformOption } from '../types/rawg.types';

const API_BASE_URL = 'https://api.rawg.io/api';
const API_KEY = import.meta.env.VITE_RAWG_API_KEY || 'be157d3e734b4d8bb1b45a4853b96a58';

const buildUrl = (endpoint: string, params: Record<string, string | number> = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  url.searchParams.append('key', API_KEY);
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });
  
  return url.toString();
};

// Obtiene los detalles de un juego específico 

export const getGameDetails = async (gameId: number): Promise<Game> => {
  try {
    const url = buildUrl(`/games/${gameId}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching game details for ID ${gameId}:`, error);
    throw error;
  }
};

// Obtiene lista de géneros disponibles 

export const getGenres = async (): Promise<{ results: Genre[] }> => {
  try {
    const url = buildUrl('/genres');
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

// Buscar juegos por palabra clave y filtros 

export const searchGamesWithFilters = async (
  query: string,
  genreId: number | null = null,
  platformId: number | null = null,
  sortOrder: 'best' | 'worst' | null = null,
  page = 1,
  pageSize = 10
): Promise<RAWGResponse> => {
  try {
    const params: Record<string, string | number> = { page, page_size: pageSize };

    if (query.trim()) {
      params.search = query;
    }

    if (genreId) {
      params.genres = genreId;
    }

    if (platformId) {
      params.platforms = platformId;
    }

    if (sortOrder === 'best') {
      params.ordering = '-rating'; 
    } else if (sortOrder === 'worst') {
      params.ordering = 'rating'; 
    }

    const url = buildUrl('/games', params);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching games with filters:', error);
    throw error;
  }
};

// Obtiene la lista de plataformas disponibles

export const getPlatforms = async (): Promise<PlatformOption[]> => {
  try {
    const url = buildUrl('/platforms');
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    return data.results.map((platform: any) => ({
      id: platform.id,
      name: platform.name
    }));
  } catch (error) {
    console.error('Error fetching platforms:', error);
    throw error;
  }
};