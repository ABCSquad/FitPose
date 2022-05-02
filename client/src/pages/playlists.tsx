import { Box, Button, Heading } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { FC } from "react";
import NavBar from "../components/NavBar";
import Wrapper from "../components/Wrapper";
import { useMeQuery } from "../generated/graphql";
import createUrqlClient from "../utils/createUrqlClient";

const Playlists: FC = ({}) => {
  const router = useRouter();
  const [{ data }] = useMeQuery();
  if (!data?.me) router.replace("/login");

  return (
    <>
      <NavBar bg="brand.teal" />
      <Box minH="92vh" bg="brand.lightgrey">
        <Wrapper>
          <Box pb={6} pt={10} display="flex">
            {/* <Heading display="inline" fontSize={40}> */}
            <Heading display="inline">My Playlists</Heading>
            {/* <Button size="lg" colorScheme="teal" ml="auto"> */}
            <Button colorScheme="teal" ml="auto">
              Create Playlist +
            </Button>
          </Box>
        </Wrapper>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Playlists);
