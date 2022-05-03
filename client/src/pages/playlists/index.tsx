import { Box, Button, Heading } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import NavBar from "../../components/NavBar";
import Wrapper from "../../components/Wrapper";
import {
  useCreatePlaylistMutation,
  useMeQuery,
  useMyPlaylistsQuery,
} from "../../generated/graphql";
import createUrqlClient from "../../utils/createUrqlClient";

const Playlists: FC = ({}) => {
  const router = useRouter();
  const [{ data: meData, fetching }] = useMeQuery();

  useEffect(() => {
    if (!fetching && !meData?.me) router.replace("/login");
  }, [router, meData, fetching]);

  const [{ data }] = useMyPlaylistsQuery();
  const noOfPlaylists = data?.myPlaylists.length;
  const [, _createPlaylist] = useCreatePlaylistMutation();

  const createPlaylist = async () => {
    if (typeof noOfPlaylists === "number") {
      const response = await _createPlaylist({
        name: `Playlist #${noOfPlaylists + 1}`,
      });
      router.push(
        "/playlists/[playlistId]",
        `/playlists/${response.data?.createPlaylist._id}`
      );
    }
  };

  return (
    <>
      <NavBar bg="brand.teal" />
      <Box minH="92vh" bg="brand.lightgrey">
        <Wrapper>
          <Box pb={6} pt={10} display="flex">
            <Heading display="inline">My Playlists</Heading>
            <Button colorScheme="teal" ml="auto" onClick={createPlaylist}>
              Create Playlist +
            </Button>
          </Box>
        </Wrapper>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Playlists);
