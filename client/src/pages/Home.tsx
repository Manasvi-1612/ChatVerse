
import { Box, Flex, Stack, useColorMode, Image, Text, Button } from "@chakra-ui/react"

const Home = () => {

    const { colorMode } = useColorMode()

    return (
        <Box width={"100%"}>
            <Stack
                sx={{
                    backgroundColor: (theme) => theme.styles.global({ colorMode }).palette.background.paper,
                    borderRadius: "3xl",
                }}
                px={4}
            >
                <Flex justifyContent={'center'} alignItems={'center'} gap={12}>

                    <Flex flexFlow={'column'} gap={3}>
                        <Text textStyle='h1'>Welcome to ChatVerse😇 </Text>
                        <Button variant={'solid'} width={'100%'} sx={{ bg: (theme) => theme.styles.global({ colorMode }).palette.mode === 'light' ? 'gray.800' : 'whiteAlpha.700', color: (theme) => theme.styles.global({ colorMode }).palette.mode === 'light' ? 'whiteAlpha.700' : 'gray.800' }}>
                            Call us
                        </Button>
                    </Flex>

                    <Image src={'/assets/cute-cat.png'} alt="cat" objectFit={'cover'} maxW={500} />
                </Flex>
            </Stack>

        </Box>
    )
}

export default Home
