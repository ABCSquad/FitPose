import NextLink from "next/link";
import {
  Box,
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

const NavBar: FC = ({}) => {
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box h={{ base: 8, md: 20 }}>
      <Wrapper>
        <Flex align="center">
          <Center h={{ base: "60px", md: 20 }}>
            <NextLink href="/">
              <Img
                src="./svgs/logo.svg"
                alt="logo"
                h={{ base: 6, md: 8 }}
                cursor="pointer"
              />
            </NextLink>
          </Center>
          <HStack ml="auto">
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
          </HStack>
        </Flex>
      </Wrapper>
    </Box>
  );
};

export default NavBar;
