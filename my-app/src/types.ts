import {ProductData} from "tp-kit/types";

export type ProductFiltersResult = {
    categoriesSlug: string[];
    search?: string ;
}

export type ProductAttribute = {
    label : String,
    rating : number
}

declare module "@supabase/supabase-js" {
    export interface UserMetadata {
        name?: string
    }
}

export type ProductLineData = {
    product: ProductData,
    qty: number
};

export type CartData = {
    lines: ProductLineData[],
    count: number,
}

export type NextPageProps<T = Record<string, string>> = {
    /**
     * The path parameters received
     * e.g. : page/[slug] --> params.slug
     */
    params: T,
    /**
     * The HTTP query parameters received
     * e.g. : my-page?page=1&order=asc --> searchParams.page and searchParams.order
     */
    searchParams: { [key: string]: string | string[] | undefined }
};