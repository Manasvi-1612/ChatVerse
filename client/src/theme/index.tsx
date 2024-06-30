// theme.ts

import { ThemeConfig, ChakraProvider, extendTheme, StyleFunctionProps } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/color-mode'
import palette from './pallete'

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: true,
}


const ThemeProvider = ({ children }: { children: React.ReactNode }) => {

    const themeOptions = {

        config,
        styles: {
            global: (props: StyleFunctionProps) => {

                const currentPalette = props.colorMode === 'light' ? palette.light : palette.dark;
                return {
                    body: {
                        margin: 0,
                        "fontFamily":
                            "AppleSystem, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif",
                        "WebkitFontSmoothing": "antialiased",
                        "MozOsxFontSmoothing": "grayscale",
                    },

                    code: {
                        "fontFamily":
                            "source-code-pro, Menlo, Monaco, Consolas, 'Courier New',monospace",
                    },

                    palette: currentPalette,

                }

            },
        },
        textStyles: {
            h1: {
                fontSize: ['48px'],
                fontWeight: 'semibold',
                lineHeight: '100%',
                letterSpacing: '4px',
            },
<<<<<<< HEAD
            
=======

>>>>>>> 7f66f1c0d0b0c2f16704c4665a160e585e42d2b1
        },

    }

    const theme = extendTheme(themeOptions)

    return (
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            {children}
        </ChakraProvider>
    )
}


export default ThemeProvider