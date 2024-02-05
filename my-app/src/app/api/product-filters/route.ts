import { NextRequest, NextResponse } from "next/server";
import { ProductFiltersResult } from "../../../types";
import prisma from "../../../utils/prisma";

export async function GET(request:NextRequest) {
  const params : ProductFiltersResult = {
    categoriesSlug: request.nextUrl.searchParams.getAll('cat'),
    search: request.nextUrl.searchParams.get('search') ?? undefined
  };

  const categories = await prisma.productCategory.findMany({
    include: {
      // Filters on product name
      products: params.search ? {
        where: {
          name: {
            contains: params.search,
            // Ignore the case
            mode: "insensitive"
          },
        },
      } : true
    },
    // Filters on categories slugs
    where: params.categoriesSlug ? {
      slug: {
        in: params.categoriesSlug
      }
    } : undefined
  })
  // Remove empty categories from results
  .then(categories => {
    console.log(categories);
    return categories.filter(cat => cat.products.length > 0)
  });

  return NextResponse.json({
    params,
    categories
  });
}