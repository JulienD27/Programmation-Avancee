
import {CartData} from "../types";
import {ProductData, ProductLineData} from "../types";
import {create, useStore} from "zustand";

const useCart = create<CartData>(() => ({
    lines: [],
    count : 0,
}));

export default useCart;

// Actions du panier
export async function addLine(product: ProductData) {

    useCart.setState((state) => {
        const existingLine = state.lines.find((line) => line.product.id === product.id);
        if (existingLine) {
            existingLine.qty += 1;
        } else {
            state.lines.push({ product, qty: 1 });
            state.count += 1;
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
        state.count -= 1;
        const filteredLines = state.lines.filter(
            (line) => line.product.id !== productId
        );
        return { lines: filteredLines };
    });
}

export function clearCart() {
    useCart.setState({ lines: [], count: 0});
}

export function computeLineSubTotal(line: ProductLineData): number {
    return line.product.price * line.qty;
}

export function computeCartTotal(lines: ProductLineData[]): number {
    return lines.reduce(
        (total, line) => total + computeLineSubTotal(line), 0
    );
}