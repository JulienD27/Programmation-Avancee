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
            <b><h1>Mon panier</h1></b>
                <br/>
                <div class="content">
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
                <br/>
            <div className="flex justify-between items-center">

                <div className="text-lg font-semibold">Total</div>
                <div className="text-lg font-semibold">
                    <FormattedPrice price={lines.reduce((acc, line) => acc + line.product.price * line.qty, 0)}/>
                </div>
            </div>
                <br/>
            <div>
                <Button class="cartButton" onClick={() => alert('Commande passée !')} variant={"primary"} fullWidth>Commander</Button>
                <Button class="cartButton" variant={"outline"} fullWidth onClick={() => clearCart()}>Vider le panier</Button>
            </div>
        </section>
    );
});

Cart.displayName = "Cart";
export { Cart };