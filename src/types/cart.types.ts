//Tipo de datos para el carrito

import { GameWithPrices } from "./game.types";

export interface CartItem extends GameWithPrices {
    quantity: number;
}

export interface CartContextType {
    cart: CartItem[];
    addToCart: (game: GameWithPrices) => void;
    removeFromCart: (gameId: number) => void;
    updateQuantity: (gameId: number, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
} 