import {ProductsCategoryData} from "tp-kit/types";
import {ProductFiltersResult} from "../types";

export function filterProducts(
    categories: ProductsCategoryData[],
    filters?: ProductFiltersResult
): ProductsCategoryData[] {
    console.log(filters)
    if (!filters) {
        return categories;
    }

    const { checkedCategories, keyword } = filters;

    if (checkedCategories.length === 0 && !keyword) {
        return categories;
    }

    const cloneCategory = (category: ProductsCategoryData): ProductsCategoryData => {
        const clonedCategory = { ...category };
        if (keyword) {
            clonedCategory.products = category.products.filter((product) =>
                product.name.toLowerCase().includes(keyword.toLowerCase())
            );
        }
        return clonedCategory;
    };

    let filteredCategories = categories;
    if (checkedCategories.length > 0) {
        filteredCategories = filteredCategories.filter((category) =>
            checkedCategories.includes(category.slug)
        );
    }

    filteredCategories = filteredCategories.map((category) =>
        cloneCategory(category)
    );

    filteredCategories = filteredCategories.filter((category) => category.products.length > 0);

    return filteredCategories;
};