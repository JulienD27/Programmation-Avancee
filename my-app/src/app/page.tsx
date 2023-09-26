import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {BreadCrumbs, SectionContainer} from "tp-kit/components";
import {ProductGridLayout, ProductCardLayout} from "tp-kit/components/products";
import {Button} from "tp-kit/components/button";
import {ProductList} from "@/components/product-list";
import React from "react";

const categories = PRODUCTS_CATEGORY_DATA;

export default function Home() {
    return (
        <main>
            <div className="relative">
            <BreadCrumbs
                items={[
                    {
                        label: 'Accueil',
                        url: '#'
                    }
                ]}
            />
            </div>
            <div className="relative">
                <ProductList categories={categories} showFilters={true}/>
            </div>
        </main>
    )
}