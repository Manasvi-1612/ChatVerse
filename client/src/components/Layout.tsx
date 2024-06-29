import { Box } from '@chakra-ui/react'
import { ToggleColorMode } from './ToggleColorMode'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box p={'2rem'}>
            <ToggleColorMode />
            <Box my={2}>{children}</Box>
        </Box>
    )
}

export default Layout
