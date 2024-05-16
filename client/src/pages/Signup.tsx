import { Heading, VStack, ButtonGroup, Button } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import FormField from "../components/FormField"
import { SignupValidationSchema } from "../lib/validator"
import { useDispatch } from "react-redux"
import { registerUser } from "../redux/slices/actions/authActions"


const Signup = () => {

    const dispatch = useDispatch()

    const initialValues = {
        email: "",
        name: "",
        password: ""
    }


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
                dispatch(registerUser(values) as any)
            }}
            validationSchema={SignupValidationSchema}
        >
            <VStack
                as={Form}
                w={{ base: "90%", md: "500px" }}
                m="auto"
                justify="center"
                h="100vh"
                spacing="1rem"
            >
                <Heading>Signup</Heading>
                <FormField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                />
                <FormField
                    label="name"
                    name="name"
                    type="text"
                    placeholder="Enter Full Name"
                />

                <FormField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                />

                <ButtonGroup pt="1rem">
                    <Button colorScheme="teal" type="submit">
                        Sing Up
                    </Button>
                </ButtonGroup>
            </VStack>
        </Formik>
    )
}

export default Signup
