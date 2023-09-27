import React, {FC, memo} from 'react';
import useCart  from '../hooks/use-cart';

const CartCounter : FC = memo(function () {
    const count = useCart((state) => state.count);
    console.log("rendu counter");

    return (
        <div>
            Nombre de lignes dans le panier : {count}
        </div>
    );
});

CartCounter.displayName = "CartCounter";
export { CartCounter };