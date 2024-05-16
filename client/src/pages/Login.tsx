import { Heading, VStack, ButtonGroup, Button } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import FormField from "../components/FormField"
// import { loginParams } from "../types"
import { useNavigate } from "react-router-dom"
import { LoginValidationSchema } from "../lib/validator"
import { loginUser } from "../lib/actions/auth.actions"
import { loginParams } from "../types"



const Login = () => {

    // const signIn = useSignIn()

    const navigate = useNavigate()

    const initialValues = {
        email: "",
        password: ""
    }

    const handleSubmit = async (values: loginParams) => {
        try {
            const res = await loginUser(values)
            if (res && !res.error) {
                // signIn({
                //     auth:{
                //         token: res.token,
                //         type: "Bearer",
                //     }
                // })
                console.log("Login successful", res)
            }
        } catch (error) {

        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
                await handleSubmit(values)
                actions.resetForm()
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
