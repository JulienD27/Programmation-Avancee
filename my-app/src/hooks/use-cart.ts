
import {CartData} from "../types";
import {ProductData, ProductLineData} from "../types";
import {create, useStore} from "zustand";

export const useCart = create<CartData>(() => ({
    lines: [],
}));

// Actions du panier
export function addLine(product: ProductData) {
    useCart.setState((state) => {
        const existingLine = state.lines.find((line) => line.product.id === product.id);

        if (existingLine) {
            existingLine.quantity += 1;
        } else {
            state.lines.push({ product, quantity: 1 });
        }
        return { lines: [...state.lines] };
    });
}

export function updateLine(line: ProductLineData) {
    useCart.setState((state) => {
        const updatedLines = state.lines.map((l) =>
            l.product.id === line.product.id ? line : l
        );
        return { lines: updatedLines };
    });
}

export function removeLine(productId: number) {
    useCart.setState((state) => {
        const filteredLines = state.lines.filter(
            (line) => line.product.id !== productId
        );
        return { lines: filteredLines };
    });
}

export function clearCart() {
    useCart.setState({ lines: [] });
}

export function computeLineSubTotal(line: ProductLineData): number {
    return line.product.price * line.quantity;
}

export function computeCartTotal(lines: ProductLineData[]): number {
    return lines.reduce(
        (total, line) => total + computeLineSubTotal(line), 0
    );
}