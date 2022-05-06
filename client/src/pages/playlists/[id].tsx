import { DeleteIcon, EditIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { BiPlay } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import DeleteDialog from "../../components/DeleteDialog";
import ExerciseListItem from "../../components/ExerciseListItem";
import InputDialog from "../../components/InputDialog";
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

  const [search, setSearch] = useState("");
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const editModal = useDisclosure();
  const deleteModal = useDisclosure();

  return (
    <>
      <NavBar bg="brand.teal" />
      <Box bg="brand.lightgrey" minH="92vh">
        <Box bg="brand.teal" pt={10} pb={20}>
          <Wrapper>
            <Heading fontSize={20}>
              {userName?.slice(-1) === "s" ? `${userName}'` : `${userName}'s`}
            </Heading>
            <Heading fontSize={80} display="inline">
              {playlistData?.playlist.name}
              <IconButton
                mt={-3}
                ml={10}
                borderRadius="50%"
                pl={2}
                h={20}
                w={20}
                colorScheme="teal"
                aria-label="Start Playlist"
                icon={<BiPlay size={60} />}
                isDisabled={playlistData?.playlist.exercises.length === 0}
              />
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<BsThreeDots size={50} />}
                  variant="ghost"
                  mt={-3}
                  ml={6}
                  _hover={{ bg: "inherit" }}
                  _active={{ bg: "inherit" }}
                  _focus={{ border: "inherit" }}
                />
                <MenuList fontSize={16} >
                  <MenuItem icon={<EditIcon />} onClick={editModal.onOpen}>
                    Edit name
                  </MenuItem>
                  <MenuItem icon={<DeleteIcon />} onClick={deleteModal.onOpen}>
                    Delete playlist
                  </MenuItem>
                </MenuList>
              </Menu>
            </Heading>
            <Heading fontSize={18} mt={1}>
              {`${
                playlistData?.playlist.exercises.length === 1
                  ? `${playlistData?.playlist.exercises.length} exercise`
                  : `${playlistData?.playlist.exercises.length} exercises`
              }`}
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
      {deleteModal.isOpen && (
        <DeleteDialog
          {...deleteModal}
          playlistId={playlistId}
          playlistName={playlistData?.playlist.name}
        />
      )}
      {editModal.isOpen && (
        <InputDialog
          {...editModal}
          playlistId={playlistId}
          playlistName={playlistData?.playlist.name}
        />
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Playlist);
