import { IoAdd } from "react-icons/io5";
import { Box, Button, Grid, Heading } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import NavBar from "../../components/NavBar";
import PlaylistCard from "../../components/PlaylistCard";
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

  const [{ data }] = useMyPlaylistsQuery();
  const noOfPlaylists = data?.myPlaylists.length;
  const [, _createPlaylist] = useCreatePlaylistMutation();

  useEffect(() => {
    if (!fetching && !meData?.me) router.replace("/login");
  }, [router, meData, fetching]);

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
      <Box minH="92vh" bg="brand.lightgrey" pb={8}>
        <Wrapper>
          <Box pb={4} pt={10} display="flex">
            <Heading display="inline">My Playlists</Heading>
            <Button
              colorScheme="teal"
              ml="auto"
              rightIcon={<IoAdd />}
              onClick={createPlaylist}
            >
              Create Playlist
            </Button>
          </Box>
          {data && data.myPlaylists.length > 0 ? (
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
              templateRows={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
              mx={-6}
            >
              {data.myPlaylists.map((playlist) => (
                <PlaylistCard {...playlist} />
              ))}
            </Grid>
          ) : (
            <h1>HelloWorld</h1>
          )}
        </Wrapper>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Playlists);
