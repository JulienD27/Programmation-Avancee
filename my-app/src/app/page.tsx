import Image from 'next/image'
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {BreadCrumbs, SectionContainer} from "tp-kit/components";
import {ProductGridLayout, ProductCardLayout} from "tp-kit/components/products";
import {Button} from "tp-kit/components/button";
import React, { useState } from 'react';
import ProductFilters from '../components/product-filters';
import ProductList from '../components/product-list';

const categories = PRODUCTS_CATEGORY_DATA;

export default function Home() {
    return (
        <ProductList categories={categories} />

    )
}