
import { Box, Flex, Stack, useColorMode, Image, Text } from "@chakra-ui/react"
import ButtonComponent from "./ButtonComponent"


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


                    <Flex flexFlow={'column'} gap={6}>
                        <Text textStyle='h1'>Welcome to ChatVerse😇 </Text>
                        <ButtonComponent text={'Join Now To Start Chatting!'} to="/signup" />

                    </Flex>

                    <Image src={'/assets/cute-cat.png'} alt="cat" objectFit={'cover'} maxW={500} />
                </Flex>
            </Stack>

            <Flex justifyContent={'center'} alignItems={'center'} >
                <ButtonComponent text={'Lets Login In!'} roundedBottom={'3xl'} width={'50%'} to="/login" _after={{ background: (theme) => theme.styles.global({ colorMode }).palette.text.primary, filter: '', roundedBottom: '3xl' }}
                    _hover={{
                        _after: {
                            filter: 'blur(0.8rem)',
                            transition: 'filter 0.3s ease'
                        },
                    }}

                />
            </Flex>

        </Box>
    )
}

export default Home
