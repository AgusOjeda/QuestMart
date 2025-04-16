import { Game, Genre, RAWGResponse } from '../types/rawg.types';

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

/**
 * Obtiene una lista de juegos con paginación opcional
 * @param page Número de página (por defecto: 1)
 * @param pageSize Tamaño de la página (por defecto: 10)
 */
export const getGames = async (page = 1, pageSize = 10): Promise<RAWGResponse> => {
  try {
    const url = buildUrl('/games', { page, page_size: pageSize });
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

/**
 * Busca juegos por una palabra clave
 * @param query Término de búsqueda
 * @param page Número de página (por defecto: 1)
 * @param pageSize Tamaño de la página (por defecto: 10)
 */
export const searchGames = async (query: string, page = 1, pageSize = 10): Promise<RAWGResponse> => {
  try {
    const url = buildUrl('/games', { search: query, page, page_size: pageSize });
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching games:', error);
    throw error;
  }
};

/**
 * Filtra juegos por género
 * @param genreId ID del género
 * @param page Número de página (por defecto: 1)
 * @param pageSize Tamaño de la página (por defecto: 10)
 */
export const filterGamesByGenre = async (genreId: number, page = 1, pageSize = 10): Promise<RAWGResponse> => {
  try {
    const url = buildUrl('/games', { genres: genreId, page, page_size: pageSize });
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error filtering games by genre:', error);
    throw error;
  }
};

/**
 * Obtiene los detalles de un juego específico
 * @param gameId ID del juego
 */
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

/**
 * Obtiene lista de géneros disponibles
 */
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

