"use client"
import { Button, MenuBar } from "tp-kit/components";
import { ShoppingCart } from "@phosphor-icons/react"
import { Popover } from "@headlessui/react";

export default function Menu() {
    return (
        <MenuBar trailing={
            <Popover>
                <Popover.Button>
                    <ShoppingCart size={32} />
                </Popover.Button>

                <Popover.Panel>

                </Popover.Panel>
            </Popover>}/>
    )
}