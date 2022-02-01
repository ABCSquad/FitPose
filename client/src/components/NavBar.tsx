import NextLink from "next/link";
import { Box, Button, Center, Flex, Img, Link } from "@chakra-ui/react";
import { FC } from "react";

const NavBar: FC = ({}) => {
  return (
    <Box bg="brand" h="80px">
      <Flex maxW="1400px" align="center" mx="auto">
        <Center h="80px">
          <NextLink href="/">
            <Link>
              <Img src="logo.svg" alt="Logo" h="40px" />
            </Link>
          </NextLink>
        </Center>
        <Box ml="auto">
          <NextLink href="/login">
            <Link mx={3}>Login</Link>
          </NextLink>
          <NextLink href="/signup">
            <Button colorScheme="teal" mx={3}>
              Sign Up
            </Button>
          </NextLink>
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar;
