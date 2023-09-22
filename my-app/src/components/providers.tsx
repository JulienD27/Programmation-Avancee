"use client"
import {MantineCustomThemeProvider} from "tp-kit/components/providers";
import {FC, ReactNode} from "react";
import {NextFont} from "next/dist/compiled/@next/font";


type Props = {
    font: NextFont,
    children: ReactNode
}


export const Providers: FC<Props> = function ({font, children}) {
    return (
        <MantineCustomThemeProvider font={font}>
            {children}
        </MantineCustomThemeProvider>
    )
}