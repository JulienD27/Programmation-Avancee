"use client";
import Image from 'next/image'
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import React, {useState} from 'react';
import {TextInput} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Checkbox, Group, Box } from '@mantine/core';
import {Button} from "tp-kit/components/button";
import {ProductFiltersResult} from "@/types";
import {ProductsCategoryData} from "tp-kit/types";

import {filterProducts} from "@/utils/filter-products";

type Props = {
    categories: ProductsCategoryData[];
    onChange: (values: ProductFilterResult) => void;
}


function ProductFilters({categories, onChange}: Props){
    const form = useForm({
        initialValues: {
            keyword: '',
            checkedCategories: [],
        },

    });
    return (
        <Box maw={280} >
            <form onSubmit={form.onSubmit((values) => onChange && onChange(values))}>
                <TextInput
                    ml={41}
                    placeholder="Filter par nom"
                    {...form.getInputProps('keyword')}
                />
                <Checkbox.Group
                    defaultValue={['react']}
                    {...form.getInputProps('checkedCategories')}
                >
                    <Group mt="xs">
                        {categories.map(category => (
                            <Checkbox
                                ml={41}
                                label={category.name}
                                value={category.slug}></Checkbox>
                        ))}
                    </Group>
                </Checkbox.Group>
                <Button mt="md" ml={41} variant="ghost" type="submit" on>Submit</Button>
            </form>
        </Box>
    )
}


export default ProductFilters;