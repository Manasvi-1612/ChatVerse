import { Box } from '@chakra-ui/react'
import { ToggleColorMode } from './shared/ToggleColorMode'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box overflow={'hidden'} height={'100svh'}>
            <ToggleColorMode />
            <Box flex={'1'} overflow={'hidden'}>{children}</Box>
        </Box>
    )
}

export default Layout
