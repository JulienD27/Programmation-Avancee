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
import Link from 'next/link';

type Props = {
    showFilters: boolean,
    categories: ProductsCategoryData[]
}

export const ProductList: FC<Props> = function ({categories, showFilters}) {

    const [filters, setFilters] = useState<ProductFiltersResult>({
        checkedCategories: [],
        keyword: ""
    })

    const filteredCategories = useMemo(() => filterProducts(categories, filters), [categories, filters]);

    return (
        <div className="flex">
            <div className="flex">
                <SectionContainer>
                    {showFilters ? <ProductFilters categories={categories} onChange={values => setFilters(values)}/> : ""}
                </SectionContainer>
            </div>
            <div>
                <SectionContainer>
                    {filteredCategories.map(category => (
                        <div key={category.id}>
                            <BreadCrumbs items={[
                                {
                                    label: (
                                        <Link href={`/${category.slug}`} legacyBehavior={true}>
                                            <a className="link">{category.name}</a>
                                        </Link>
                                    ),
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
