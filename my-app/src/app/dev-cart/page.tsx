"use client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Button, ProductCardLayout, SectionContainer } from "tp-kit/components";
import {ProductCartLine} from "tp-kit/components/products";
import {FormattedPrice} from "tp-kit/components/data-display";
import {addLine, clearCart, computeCartTotal, removeLine, updateLine, useCart} from "../../hooks/use-cart";
import {Cart} from "../../components/cart";

const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);


export default function DevCartPage() {
    console.log("rendu page");
    return (
        <Cart></Cart>
    )
}