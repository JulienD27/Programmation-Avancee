import { ProductsCategoryData } from "tp-kit/types";
import { ProductFiltersResult } from "../types";

export function filterProducts(
    categories: ProductsCategoryData[],
    filters?: ProductFiltersResult
) : ProductsCategoryData[] {
    if (!filters) {
        return categories;
    }

    const filteredCategories = categories.filter((category) =>
        filters.categoriesSlug.includes(category.slug)
    );


    return filteredCategories;
};