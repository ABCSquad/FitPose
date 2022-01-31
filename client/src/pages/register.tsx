import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { FC } from "react";
import InputField from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { getErrorMessage } from "../utils/getErrorMessage";

const Register: FC = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <Box mx="auto" maxW="1400px">
      <Box maxW="sm" borderWidth="1px" m="auto" mt={200} px={5} py={10}>
        <Formik
          initialValues={{ email: "", name: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({ input: values });
            if (response.error) {
              setErrors(getErrorMessage(response.error));
            } else if (response.data?.register._id) router.push("/");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box m={3}>
                <InputField
                  name="email"
                  placeholder="e.g. johndoe@example.com"
                  label="Email"
                />
              </Box>
              <Box m={3}>
                <InputField
                  name="name"
                  placeholder="e.g. John Doe"
                  label="Name"
                />
              </Box>
              <Box m={3}>
                <InputField
                  name="password"
                  placeholder="********"
                  label="Password"
                  type="password"
                />
              </Box>
              <Box mx={3} mt={5} mb={3}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  width="100%"
                >
                  Register
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Register;
