
import { Box, Flex, Stack, useColorMode, Image, Text, Spacer } from "@chakra-ui/react"
import ButtonComponent from "../components/shared/ButtonComponent"


const Home = () => {

    const { colorMode } = useColorMode()

    return (
        <Box width={"100%"} p={'2em'}>
            <Stack
                sx={{
                    backgroundColor: (theme) => theme.styles.global({ colorMode }).palette.background.paper,
                    borderRadius: "3xl",
                }}
                px={4}
            >
                <Flex justifyContent={'center'} alignItems={'center'} gap={8} flexFlow={{ base: 'column-reverse', md: 'row' }} >

                    <Flex flexFlow={'column'} gap={6}>
                        <Text sx={{ textStyle: { base: 'h3', lg: 'h1' } }}>Welcome to ChatVerse</Text>
                        <ButtonComponent text={'Join Now To Start Chatting!'} hideBelow='md' to="/signup" />
                    </Flex>

                    <Image src={'/assets/cute-cat.png'} alt="cat" objectFit={'contain'} sx={{ width: { base: 300, md: 400, lg: 500 }, height: "100%" }} />
                </Flex>
            </Stack>

            <Flex justifyContent={'center'} alignItems={'center'} >
                <ButtonComponent text={'Lets Login In!'} roundedBottom={'3xl'} width={{ base: 'full', md: '50%' }} to="/login" _after={{ background: (theme) => theme.styles.global({ colorMode }).palette.text.primary, filter: '', roundedBottom: '3xl' }}
                    _hover={{
                        _after: {
                            filter: 'blur(0.8rem)',
                            transition: 'filter 0.3s ease'
                        },
                    }}

                />
            </Flex>

            <Spacer />

            <Text p={2} position={'fixed'} bottom={0} right={0} color={'GrayText'}
            >
                &copy;Copyright. All rights reserved.
            </Text>

        </Box>
    )
}

export default Home
