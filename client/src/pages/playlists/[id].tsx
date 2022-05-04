import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useEffect, useState } from "react";
import ExerciseListItem from "../../components/ExerciseListItem";
import NavBar from "../../components/NavBar";
import Wrapper from "../../components/Wrapper";
import {
  useExercisesQuery,
  useMeQuery,
  usePlaylistQuery,
} from "../../generated/graphql";
import createUrqlClient from "../../utils/createUrqlClient";

const Playlist: FC = () => {
  const router = useRouter();
  const [{ data: meData, fetching: meFetching }] = useMeQuery();
  const userName = meData?.me?.name;

  const playlistId = typeof router.query.id === "string" ? router.query.id : "";
  const [{ data: playlistData, fetching: plFetching }] = usePlaylistQuery({
    variables: { id: playlistId },
  });

  useEffect(() => {
    if (
      !meFetching &&
      !plFetching &&
      meData?.me?._id !== playlistData?.playlist.user._id
    ) {
      router.back();
    }
  }, [router, meData, meFetching, plFetching]);

  const [{ data: exercisesData }] = useExercisesQuery();
  // const [exercises, setExercises] = useState(exercisesData?.exercises);

  const [search, setSearch] = useState("");
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <>
      <NavBar bg="brand.teal" />
      <Box bg="brand.lightgrey" minH="92vh">
        <Box bg="brand.teal" pt={10} pb={20}>
          <Wrapper>
            <Heading fontSize={18}>
              {userName?.slice(-1) === "s" ? `${userName}'` : `${userName}'s`}
            </Heading>
            <Heading fontSize={80} display="inline" cursor="pointer">
              {playlistData?.playlist.name}
            </Heading>
            <Heading fontSize={16} mt={1}>
              {`${
                playlistData?.playlist.exercises.length === 1
                  ? `${playlistData?.playlist.exercises.length} exercise`
                  : `${playlistData?.playlist.exercises.length} exercises`
              }`}
              {/* {userName} */}
            </Heading>
          </Wrapper>
        </Box>
        <Wrapper>
          <Box py={8}>
            <Text fontSize={30} mb={1}>
              <b>Exercise queue</b>
            </Text>
            {playlistData?.playlist.exercises.map((exercise, id) => (
              <ExerciseListItem
                remove
                key={id}
                listId={id + 1}
                playlistId={playlistId}
                {...exercise}
              />
            ))}
          </Box>
          <Divider />
          <Box py={8} minH={600}>
            <Text fontSize={30} mb={1}>
              <b>Add new exercises</b>
            </Text>
            <InputGroup mb={4}>
              <InputLeftElement
                pointerEvents="none"
                children={<Search2Icon />}
              />
              <Input
                placeholder="Search for an exercise"
                onChange={handleSearch}
                mr={4}
              ></Input>
            </InputGroup>
            {exercisesData && search.length > 0
              ? exercisesData.exercises
                  .filter(
                    (exercise) =>
                      exercise.name
                        .toLowerCase()
                        .includes(search.toLowerCase()) &&
                      // To not include exercises already present in playlist
                      !playlistData?.playlist.exercises.some(
                        (x) => x.name === exercise.name
                      )
                  )
                  // Sort in alphabetical order
                  .sort((a, b) =>
                    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                  )
                  .slice(0, 6)
                  .map((exercise, id) => (
                    <ExerciseListItem
                      key={id}
                      playlistId={playlistId}
                      {...exercise}
                    />
                  ))
              : null}
          </Box>
        </Wrapper>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Playlist);
