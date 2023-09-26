import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import ProductFilters from "@/components/product-filters";
import {BreadCrumbs, Button, ProductCardLayout, ProductGridLayout, SectionContainer} from "tp-kit/components";
import {ProductList} from "@/components/product-list";
import React from "react";
import {notFound} from "next/navigation";
const categories = PRODUCTS_CATEGORY_DATA;

type Props = {
    categorySlug : string
}

export type NextPageProps<T = Record<string, string>> = {
    params: T,
    searchParams: { [key: string]: string | string[] | undefined }
}

export default function Home({params} : NextPageProps<Props>) {
    const currentcategories = categories.filter(category => {
        return category.slug == params.categorySlug
    })[0]

    if (!currentcategories) notFound();

    return (
        <main>
            <SectionContainer>
                <BreadCrumbs
                    items={[
                        {
                            label: 'Accueil',
                            url: '/'
                        },{
                            label: currentcategories.name,
                            url: '/'+params.categorySlug
                        }
                    ]}
                />
            </SectionContainer>
            <ProductList showFilters={false} categories={[currentcategories]}/>
        </main>
    )
}
