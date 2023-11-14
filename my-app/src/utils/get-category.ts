import prisma from "./prisma";
import { cache } from "react";

export const getCategories = cache(async () => {
    console.log('getCategories')
    return await prisma.productCategory.findMany({ include: { products: true } })
})

export const getCategory = cache(async (slug: string) => {
    console.log('getCategory')
    return await prisma.productCategory.findFirst({ where: { slug }, include: { products: true } })
})

export const getProduct = cache(async (slug: string) => {
    console.log('getProduct')
    return await prisma.product.findFirst({ where: { slug } })
})