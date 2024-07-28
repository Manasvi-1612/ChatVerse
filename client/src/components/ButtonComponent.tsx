import { Button, ButtonProps, useColorMode } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

interface ButtonComponentProps extends ButtonProps {
    text: string
    to?: string
}

const ButtonComponent = (props: ButtonComponentProps) => {
    const { colorMode } = useColorMode()


    return (
        <Button variant={'solid'} width={'100%'}
            {...props}
            as={Link} to={props.to}
            py={6}
            background={colorMode === 'light' ? 'gray.800' : 'whiteAlpha.700'}
            color={colorMode === 'light' ? 'white' : 'gray.800'}
            zIndex={1}

            _after={{
                content: '""', background: (theme) => theme.styles.global({ colorMode }).palette.background.gradient,
                rounded: 'lg',
                filter: 'blur(1.5rem)', width: "100%",
                position: "absolute",
                height: "100%",
                left: 0, top: 0,
                zIndex: -1,
                transition: "opacity .3s",
                ...props._after,
            }}

            fontWeight={'bold'}
        >
            {props.text}
        </Button>
    )
}

export default ButtonComponent
