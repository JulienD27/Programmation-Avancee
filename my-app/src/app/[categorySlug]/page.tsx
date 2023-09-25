import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import ProductFilters from "@/components/product-filters";
import {BreadCrumbs, Button, ProductCardLayout, ProductGridLayout, SectionContainer} from "tp-kit/components";
import {ProductList} from "@/components/product-list";
import React from "react";
const category = PRODUCTS_CATEGORY_DATA[0];

type Props = {
    categorySlug : string
}

export type NextPageProps<T = Record<string, string>> = {
    /**
     * The path parameters received
     * e.g. : page/[slug] --> params.slug
     */
    params: T,
    /**
     * The HTTP query parameters received
     * e.g. : my-page?page=1 --> searchParams.page (= '1')
     */
    searchParams: { [key: string]: string | string[] | undefined }
}

export default function Home({params} : NextPageProps<Props>) {
    const currentcategories = category.filter(category => {
        return category.slug == params.categorySlug
    })[0]

    return (
        <main>
            <SectionContainer>
                <div className="relative">
                    <BreadCrumbs
                        items={[
                            {
                                label: currentcategories.name,
                                url: '/'+params.categorySlug
                            }
                        ]}
                    />
                </div>
            </SectionContainer>
            <div className="relative">
                <ProductList categories={currentcategories} showFilters={false} />
            </div>
        </main>
    )
}