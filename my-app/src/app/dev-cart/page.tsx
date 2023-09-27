"use client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Button, ProductCardLayout, SectionContainer } from "tp-kit/components";
import {ProductCartLine} from "tp-kit/components/products";
import {FormattedPrice} from "tp-kit/components/data-display";
import {addLine, clearCart, computeCartTotal, removeLine, useCart} from "../../hooks/use-cart";

const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);


export default function DevCartPage() {

    const lines  = useCart((state) => state.lines)

    const handleQuantityChange = (product, quantity) => {
        lines.forEach((line) => {
            if (line.product.id === product.id) {
                line.quantity = quantity;
            }
        })
    }

    const handleRemove = (product) => {
        removeLine(product.id)
    }

    let total = 0
    return (
        <SectionContainer
            className="py-36"
            wrapperClassName="flex flex-col lg:flex-row gap-24"
        >
            {/* Produits */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
                {products.map((product) => (
                    <ProductCardLayout
                        key={product.id}
                        product={product}
                        button={<Button variant={"ghost"} fullWidth onClick={() => addLine(product)}>Ajouter au panier</Button>}
                    />
                ))}
            </section>
            {/* /Produits */}

            {/* Panier */}
            <section className="w-full lg:w-1/3 space-y-8">
                    <h2>Mon panier</h2>
                <pre>{JSON.stringify(lines, null, 2)}</pre>
                    <div>
                        {lines.map((line) => (
                                <ProductCartLine
                                    key={line.product.id}
                                    product={line.product}
                                    qty = {line.quantity}
                                    onQuantityChange={() => {}}
                                    remove={() => {handleRemove(line.product)}}
                                />
                        ))}
                    </div>
                    <p>Total du panier: <FormattedPrice price={computeCartTotal(lines)} /></p>
                <Button onClick={() => alert('Commande passée !')} variant={"primary"} fullWidth>Commander</Button>
                <Button variant={"outline"} fullWidth onClick={() => clearCart()}>Vider le panier</Button>
            </section>
            {/* /Panier */}
        </SectionContainer>
    );
}