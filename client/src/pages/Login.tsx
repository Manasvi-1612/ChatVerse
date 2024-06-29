import { Heading, VStack, ButtonGroup, Button } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import FormField from "../components/FormField"
// import { loginParams } from "../types"
import { useNavigate } from "react-router-dom"
import { LoginValidationSchema } from "../lib/validator"
import { useLoginMutation } from "../redux/slices/actions/authActions"
import useLocalStorage from "../hooks/useLocalStorage"


const Login = () => {


    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()

    const [_, setStorage] = useLocalStorage()

    if (isLoading) return <div>Loading...</div>

    const initialValues = {
        email: "",
        password: ""
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
                try {
                    // With .unwrap(), it will resolve to the value of the fulfilled action, or throw on a rejected action.
                    // The idea here is that you should be able to dispatch an asyncThunk without having to catch it every time, but only if you really want to write more logic based on it.

                    setStorage(true)
                    await login(values).unwrap()

                    actions.resetForm()
                    navigate("/secure")
                } catch (error) {

                }
            }}

            validationSchema={LoginValidationSchema}
        >
            <VStack
                as={Form}
                w={{ base: "90%", md: "500px" }}
                m="auto"
                justify="center"
                h="100vh"
                spacing="1rem"
            >
                <Heading>Login</Heading>
                <FormField
                    label="Email"
                    name="email"
                    type="text"
                    placeholder="Enter email"
                />

                <FormField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                />

                <ButtonGroup pt="1rem">
                    <Button colorScheme="teal" type="submit">
                        Log In
                    </Button>
                    <Button onClick={() => navigate("/signup")}>Create Account</Button>
                </ButtonGroup>
            </VStack>
        </Formik>
    )
}

export default Login
