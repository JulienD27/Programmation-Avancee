import {MantineCustomThemeProvider} from "tp-kit/components/providers";

const Providers = ({ font, children }) => {
    return (
        <MantineCustomThemeProvider>
            {children}
        </MantineCustomThemeProvider>
    )
}

export default Providers;