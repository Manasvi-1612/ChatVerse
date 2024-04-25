import { Heading, VStack, ButtonGroup, Button } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import FormField from "../components/FormField"




const Signup = () => {

    // const initialValues = {
    //     email: "",
    //     username: "",
    //     password: ""
    // }

    // const handleSubmit = async (values: signupParams) => {
    //     try {
    //         const data = await signupUser(values)
    //         console.log(data)
    //     } catch (error) {
    //         handleError(error)
    //     }
    // }

    return (
        // <Formik
        //     initialValues={initialValues}
        //     onSubmit={async (values, actions) => {
        //         await handleSubmit(values)
        //         actions.resetForm()
        //     }}

        //     validationSchema={SignupValidationSchema}
        // >
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
                    placeholder="Enter email"
                />
                <FormField
                    label="Username"
                    name="username"
                    type="text"
                    placeholder="Enter username"
                />

                <FormField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                />

                <ButtonGroup pt="1rem">
                    <Button colorScheme="teal" type="submit">
                        Sing Up
                    </Button>
                </ButtonGroup>
            </VStack>
        // </Formik>
    )
}

export default Signup
