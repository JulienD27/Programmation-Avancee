import {ProductsCategoryData} from "tp-kit/types";
import {ProductFiltersResult} from "../types";

export function filterProducts(
    categories: ProductsCategoryData[],
    filters?: ProductFiltersResult
): ProductsCategoryData[] {
    if (!filters) {
        return categories;
    }

    if (filters.checkedCategories.length === 0) {
        if (!filters.keyword) {
            return categories;
        }
        else {
            const filteredCategories = categories.map(category => ({
                ...category,
                products: category.products.filter(products => products.name.includes(filters?.keyword))}));


            return filteredCategories.filter(category => category.products.length>0)
        }
    }

    if (!filters.keyword) {
        return categories.filter((category) => filters?.checkedCategories.includes(category.slug))
    }
    else {
        const filteredCategories = categories.filter((category) => filters?.checkedCategories.includes(category.slug))
            .map(category => ({
                ...category,
                products: category.products.filter(products => products.name.includes(filters?.keyword))}));
        return filteredCategories
    }
};