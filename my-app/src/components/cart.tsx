"use client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Button, ProductCardLayout, SectionContainer } from "tp-kit/components";
import {ProductCartLine} from "tp-kit/components/products";
import {FormattedPrice} from "tp-kit/components/data-display";
import useCart, {addLine, clearCart, computeCartTotal, removeLine, updateLine } from "../hooks/use-cart";
import {FC, memo} from "react";

const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);


const Cart : FC = memo(function () {
    const lines  = useCart((state) => state.lines)

    const handleQuantityChange = (line, newQty) => {
        if (newQty > 0) {
            updateLine( {...line, qty : newQty})
        }
        else {
            removeLine(line.product.id)
        }
    };

    const handleRemove = (product) => {
        removeLine(product.id)
    }

    let total = 0
    return (

        <section>
                <h2>Mon panier</h2>

                <div>
                    {lines.map((line) => (
                        <ProductCartLine
                            key={line.id}
                            product={line.product}
                            qty = {line.qty}
                            onQtyChange={(qty) => {handleQuantityChange(line, qty)}}
                            remove={() => {handleRemove(line.product)}}
                            onDelete={() => {handleRemove(line.product)}}
                        />
                    ))}
                </div>
                <p>Total du panier: <FormattedPrice price={computeCartTotal(lines)} /></p>
                <Button onClick={() => alert('Commande passée !')} variant={"primary"} fullWidth>Commander</Button>
                <Button variant={"outline"} fullWidth onClick={() => clearCart()}>Vider le panier</Button>

        </section>
    );
});

Cart.displayName = "Cart";
export { Cart };