import React, {FC, memo} from 'react';
import { useCart } from '../hooks/use-cart';

const CartCounter : FC = memo(function () {
    const lines = useCart((state) => state.lines);
    console.log("rendu counter");

    const totalLines = lines.length

    return (
        <div>
            Nombre de lignes dans le panier : {totalLines}
        </div>
    );
});

CartCounter.displayName = "CartCounter";
export { CartCounter };