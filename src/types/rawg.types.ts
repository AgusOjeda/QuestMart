/**
 * Tipos de datos para la API RAWG
 */

export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released?: string;
  genres?: Genre[];
  platforms?: Platform[];
  esrb_rating?: {
    id: number;
    name: string;
  };
  description_raw?: string;
  metacritic?: number;
  developers?: Developer[];
  publishers?: Publisher[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Platform {
  platform: {
    id: number;
    name: string;
  };
  requirements: {
    minimum: string;
    recommended: string;
  };
}

export interface Developer {
  id: number;
  name: string;
}

export interface Publisher {
  id: number;
  name: string;
}

export interface RAWGResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
} 

export interface PlatformOption {
  id: number;
  name: string;
}
