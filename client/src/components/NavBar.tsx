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

const NavBar: FC = ({}) => {
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box h={{ base: 8, md: 20 }}>
      <Flex maxW="1400px" align="center" mx="auto" px={6}>
        <Center h={{ base: "60px", md: 20 }}>
          <NextLink href="/">
            <Link>
              <Img src="./svgs/logo.svg" alt="Logo" h={{ base: 6, md: 8 }} />
            </Link>
          </NextLink>
        </Center>
        <HStack ml="auto">
          <NextLink href="/login">
            <Link mx={3} fontSize={{ base: "0.8rem", md: "1rem" }}>
              Login
            </Link>
          </NextLink>
          <NextLink href="/signup">
            <Button colorScheme="teal" mx={3} size={buttonSize}>
              Sign Up
            </Button>
          </NextLink>
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavBar;
