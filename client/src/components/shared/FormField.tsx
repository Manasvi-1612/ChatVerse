import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control"

import { Input } from "@chakra-ui/input";
import { Field, useField } from "formik";

interface FormFieldProps {
  label: string
  name: string
  [key: string]: any
}

const FormField = ({ label, ...props }: FormFieldProps) => {

  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={(meta.error != undefined) && meta.touched}>
      <FormLabel>{label}</FormLabel>
      <Input as={Field} {...field} {...props} />
      <FormErrorMessage className="error">{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default FormField
