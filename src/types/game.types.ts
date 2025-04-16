/**
 * Tipos de datos combinados para la aplicación
 */

import { Game } from './rawg.types';
import { GameDeal } from './cheapshark.types';

export interface GameWithPrices extends Game {
  deals?: GameDeal[];
  cheapestPrice?: string;
} 