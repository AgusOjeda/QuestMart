/**
 * Tipos de datos combinados para la aplicación
 */

import { Game } from './rawg.types';
import { GameDeal } from './cheapshark.types';

export interface GameWithPrices extends Game {
  deals?: GameDeal[];
  cheapestPrice?: string;
} 

export interface GameRowProps {
  title: string;
  genreId: number | null;
  platformId: number | null;
  sortOrder: 'best' | 'worst' | null;
}

export type Props = {
  game: GameWithPrices;
};