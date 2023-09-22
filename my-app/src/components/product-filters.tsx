"use client";

import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {Button} from "tp-kit/components";
import {Checkbox, TextInput, Group, Box} from '@mantine/core';
import {useForm} from '@mantine/form';
import {filterProducts} from "@/utils/filter-products";

export const ProductFilters = function (props) {
    const form = useForm({
        initialValues: {
            keyword: '',
            checkedCategories: [],
        },
    });
    return (
        <Box maw={280} >
            <form onSubmit={form.onSubmit((values) => props.onChange(values))}>
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
                        {props.categories.map(category => (
                            <Checkbox
                                ml={41}
                                label={category.name}
                                value={category.slug}>
                            </Checkbox>
                        ))}
                    </Group>
                </Checkbox.Group>
                <Button mt="md" ml={41} variant="ghost" type="submit" on>Filtrer</Button>
            </form>
        </Box>
    )
}

export default ProductFilters;