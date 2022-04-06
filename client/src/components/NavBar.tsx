import NextLink from "next/link";
import {
  Box,
  BoxProps,
  Button,
  Center,
  Flex,
  HStack,
  Img,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FC } from "react";
import Wrapper from "./Wrapper";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from "next/router";

const NavBar: FC<BoxProps> = ({ ...boxProps }) => {
  const router = useRouter();
  const [{ data }] = useMeQuery();
  const [{ fetching }, logout] = useLogoutMutation();

  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  let body = (
    <>
      <NextLink href="/login">
        <Link mr={3} fontSize={{ base: "0.8rem", md: "1rem" }}>
          Login
        </Link>
      </NextLink>
      <NextLink href="/signup">
        <Button colorScheme="teal" ml={3} size={buttonSize}>
          Sign Up
        </Button>
      </NextLink>
    </>
  );

  if (data?.me) {
    body = (
      <>
        <NextLink href="/">
          <Link mr={3} fontSize={{ base: "0.8rem", md: "1rem" }}>
            {data.me.name}
          </Link>
        </NextLink>

        <Button
          colorScheme="teal"
          variant="ghost"
          aria-label="Logout"
          rightIcon={<IoLogOutOutline />}
          ml={3}
          isLoading={fetching}
          size={buttonSize}
          onClick={async () => {
            await logout();
            router.push("/");
          }}
        >
          Logout
        </Button>
      </>
    );
  }

  return (
    <Box minH="8vh" {...boxProps}>
      <Wrapper>
        <Flex align="center">
          <Center h={{ base: "70px", md: 20 }}>
            <NextLink href="/">
              <Img
                src="./svgs/logo.svg"
                alt="logo"
                h={{ base: 6, md: 8 }}
                cursor="pointer"
              />
            </NextLink>
          </Center>
          <HStack ml="auto">{body}</HStack>
        </Flex>
      </Wrapper>
    </Box>
  );
};

export default NavBar;
