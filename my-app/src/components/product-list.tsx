"use client";

import {ProductFilters} from "@/components/product-filters";
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {BreadCrumbs, SectionContainer} from "tp-kit/components";
import {ProductGridLayout, ProductCardLayout} from "tp-kit/components/products";
import {Button} from "tp-kit/components/button";
import React, { useState } from 'react';
import {filterProducts} from "@/utils/filter-products";
import {ProductFiltersResult} from "@/types";

//const [filters, setFilters] = useState([])

const ProductList = ({categories}) => {
    return (
        <main>
            <BreadCrumbs
                items={[
                    {
                        label: 'Accueil',
                        url: '#'
                    }
                ]}
            />
            <ProductFilters categories={categories}/>
            <SectionContainer>
                {categories.map(category => (
                    <div key={category.id}>
                        <BreadCrumbs items={[
                            {
                                label: category.name + ' (' + category.products.length + ')',
                                url: '#'
                            }
                        ]}/>
                        <ProductGridLayout products={category.products}>
                            {product => (
                                <ProductCardLayout product={product} button={<Button fullWidth variant="ghost">Ajouter au panier</Button>} />
                            )}
                        </ProductGridLayout>
                    </div>
                ))}
            </SectionContainer>
        </main>
    )
}

export default ProductList;
