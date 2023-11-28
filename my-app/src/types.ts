export type ProductFiltersResult = {
    categoriesSlug: string[];
    search: string;
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