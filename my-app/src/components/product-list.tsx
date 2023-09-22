"use client";

import {ProductFilters} from "@/components/product-filters";
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {BreadCrumbs, SectionContainer} from "tp-kit/components";
import {ProductGridLayout, ProductCardLayout} from "tp-kit/components/products";
import {Button} from "tp-kit/components/button";
import React, {useState, FC, useMemo} from 'react';
import {filterProducts} from "@/utils/filter-products";
import {ProductFiltersResult} from "@/types";
import {ProductsCategoryData} from "tp-kit/types";

type Props = {
    showFilters: boolean,
    categories: ProductsCategoryData[]
}

export const ProductList: FC<Props> = function ({categories, showFilters}) {

    const [filters, setFilters] = useState<ProductFiltersResult>()
    const filteredCategories = useMemo(() => filterProducts(categories, filters), [categories, filters]);

    return (
        <div>
            {showFilters ? <div>
                <ProductFilters categories={categories} onChange={values => setFilters(values)}></ProductFilters>
            </div> : ""}
            <div>
                <ProductFilters categories={categories} onChange={values => setFilters(values)}/>

                <SectionContainer>
                    {filteredCategories.map(category => (
                        <div key={category.id}>
                            <BreadCrumbs items={[
                                {
                                    label: category.name + ' (' + category.products.length + ')',
                                    url: '#'
                                }
                            ]}/>
                            <ProductGridLayout products={category.products}>
                                {product => (
                                    <ProductCardLayout product={product}
                                                       button={<Button fullWidth variant="ghost">Ajouter au
                                                           panier</Button>}/>
                                )}
                            </ProductGridLayout>
                        </div>
                    ))}
                </SectionContainer>
            </div>
        </div>
    )
}
