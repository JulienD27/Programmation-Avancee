import {CartData} from "../types";
import {ProductData, ProductLineData} from "../types";
import {create, useStore} from "zustand";

export const useCartStore = create<CartData>((set) => ({
    cart: [],
}));

// Actions
export function addLine(product: ProductData) {
    useCartStore.setState((state) => {
        const existingLine = state.cart.find((line) => line.product.id === product.id);

        if (existingLine) {
            existingLine.quantity += 1;
            return { cart: [...state.cart] };
        }

        return { cart: [...state.cart, { product, quantity: 1 }] };
    });
}

export function updateLine(line: ProductLineData) {
    useCartStore.setState((state) => {
        const updatedCart = state.cart.map((cartLine) =>
            cartLine.product.id === line.product.id ? line : cartLine
        );
        return { cart: updatedCart };
    });
}

export function removeLine(productId: number) {
    useCartStore.setState((state) => {
        const updatedCart = state.cart.filter((cartLine) => cartLine.product.id !== productId);
        return { cart: updatedCart };
    });
}

export function clearCart() {
    useCartStore.setState({ cart: [] });
}

export function computeLineSubTotal(line: ProductLineData): number {
    return line.product.price * line.quantity;
}

export function computeCartTotal(lines: ProductLineData[]): number {
    return lines.reduce((total, line) => total + computeLineSubTotal(line), 0);
}