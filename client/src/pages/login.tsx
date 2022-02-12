import { Box, Button, Center, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { FC } from "react";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import createUrqlClient from "../utils/createUrqlClient";
import { getErrorMessage } from "../utils/getErrorMessage";

const Login: FC = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <AuthLayout>
      <Center h={{ base: "60px", md: 20 }}>
        <Heading>Log In</Heading>
      </Center>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ input: values });
          if (response.error) {
            const errorMessage = getErrorMessage(response.error);
            if (errorMessage) setErrors(errorMessage);
          } else if (response.data?.login._id) router.push("/");
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
                name="password"
                placeholder="********"
                label="Password"
                type="password"
              />
            </Box>
            <Box mx={3} mt={5} mb={3}>
              <Button
                type="submit"
                colorScheme="teal"
                isLoading={isSubmitting}
                width="100%"
              >
                Log In
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Box mx={3}>
        <Text>
          Don't have an account?{" "}
          <NextLink href="/signup">
            <Link color="blue.600">Sign up.</Link>
          </NextLink>
        </Text>
      </Box>
    </AuthLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
