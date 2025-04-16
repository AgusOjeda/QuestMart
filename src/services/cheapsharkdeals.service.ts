import { GameDeal, Deal, Store } from '../types/cheapshark.types';

// Configuración de la API
const API_BASE_URL = 'https://www.cheapshark.com/api/1.0';

// Caché de las tiendas para no solicitarlas cada vez
let storesCache: Store[] | null = null;

/**
 * Obtiene todas las tiendas disponibles
 */
export const getStores = async (): Promise<Store[]> => {
  try {
    // Si ya están en caché, devuelve la caché
    if (storesCache) {
      return storesCache;
    }

    const response = await fetch(`${API_BASE_URL}/stores`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    const stores = await response.json();
    storesCache = stores;
    return stores;
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
};

/**
 * Busca ofertas de juegos por título
 * @param title Título del juego
 * @param limit Número máximo de resultados (por defecto: 10)
 */
export const getGameDeals = async (title: string, limit = 10): Promise<GameDeal[]> => {
  try {
    const encodedTitle = encodeURIComponent(title);
    const url = `${API_BASE_URL}/games?title=${encodedTitle}&limit=${limit}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    const deals: GameDeal[] = await response.json();
    
    const stores = await getStores();
    
    return deals.map(game => ({
      ...game,
      deals: game.deals?.map((deal: Deal) => ({
        ...deal,
        storeName: stores.find(store => store.storeID === deal.storeID)?.storeName
      }))
    }));
  } catch (error) {
    console.error(`Error fetching game deals for '${title}':`, error);
    throw error;
  }
};

/**
 * Obtiene los detalles de un juego específico por ID
 * @param gameId ID del juego en CheapShark
 */
export const getGameDealById = async (gameId: string): Promise<GameDeal> => {
  try {
    const url = `${API_BASE_URL}/games?id=${gameId}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    const game = await response.json();
    
    const stores = await getStores();
    
    return {
      ...game,
      deals: game.deals?.map((deal: Deal) => ({
        ...deal,
        storeName: stores.find(store => store.storeID === deal.storeID)?.storeName
      }))
    };
  } catch (error) {
    console.error(`Error fetching game deal for ID ${gameId}:`, error);
    throw error;
  }
};
