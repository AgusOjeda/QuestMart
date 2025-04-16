/**
 * Tipos de datos para la API CheapShark
 */

export interface GameDeal {
  gameID: string;
  steamAppID?: string;
  cheapest: string;
  cheapestDealID: string;
  external: string; // Nombre del juego
  thumb: string;
  deals: Deal[];
}

export interface Deal {
  storeID: string;
  dealID: string;
  price: string;
  retailPrice: string;
  savings: string;
  storeName?: string; // Añadido después de obtener el nombre de la tienda
}

export interface Store {
  storeID: string;
  storeName: string;
  isActive: number;
  images: {
    banner: string;
    logo: string;
    icon: string;
  };
} 