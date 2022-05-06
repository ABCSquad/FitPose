import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  GridItem,
  IconButton,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";
import { BiPlay } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteDialog from "./DeleteDialog";
import InputDialog from "./InputDialog";

type Props = {
  _id: string;
  name: string;
  exercises: { name: string }[];
};

const PlaylistCard: FC<Props> = ({ _id, name, exercises }) => {
  const editModal = useDisclosure();
  const deleteModal = useDisclosure();
  return (
    <GridItem colSpan={1} rowSpan={1}>
      <NextLink href={"/playlists/[_id]"} as={`/playlists/${_id}`}>
        <Box
          p={{ base: 6, md: 10 }}
          m={6}
          h="90%"
          bg="white"
          borderWidth={1}
          rounded="xl"
          cursor="pointer"
          _hover={{ boxShadow: "lg" }}
        >
          <Flex>
            <IconButton
              borderRadius="50%"
              pl={2}
              h={16}
              w={16}
              mb={5}
              colorScheme="teal"
              aria-label="Start Playlist"
              icon={<BiPlay size={60} />}
              isDisabled={exercises.length === 0}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<BsThreeDotsVertical size={30} />}
                variant="ghost"
                mt={3}
                ml="auto"
                _hover={{ bg: "inherit" }}
                _active={{ bg: "inherit" }}
                _focus={{ border: "inherit" }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
              <MenuList
                fontSize={16}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <MenuItem icon={<EditIcon />} onClick={editModal.onOpen}>
                  Edit name
                </MenuItem>
                <MenuItem icon={<DeleteIcon />} onClick={deleteModal.onOpen}>
                  Delete playlist
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Text fontSize={30} mb={2}>
            <b>{name}</b>
          </Text>
          <UnorderedList spacing={1} fontSize={18} color="grey">
            {exercises.slice(0, 7).map((x, i) => (
              <ListItem key={i}>{x.name}</ListItem>
            ))}
            {exercises[7] && (
              <ListItem key={7}>
                {exercises[8] ? `${exercises[7].name}...` : exercises[7].name}
              </ListItem>
            )}
          </UnorderedList>
        </Box>
      </NextLink>
      {deleteModal.isOpen && (
        <DeleteDialog {...deleteModal} playlistId={_id} playlistName={name} />
      )}
      {editModal.isOpen && (
        <InputDialog {...editModal} playlistId={_id} playlistName={name} />
      )}
    </GridItem>
  );
};

export default PlaylistCard;
