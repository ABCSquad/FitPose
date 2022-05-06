import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Text,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useDeletePlaylistMutation } from "../generated/graphql";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  playlistId?: string;
  playlistName?: string;
};

const DeleteDialog: FC<Props> = ({
  isOpen,
  onClose,
  playlistId,
  playlistName,
}) => {
  const router = useRouter();
  const [, _deletePlaylist] = useDeletePlaylistMutation();
  const deletePlaylist = async () => {
    playlistId && (await _deletePlaylist({ playlistId }));
    onClose();
    router.replace("/playlists");
  };
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`Delete ${playlistName}?`}</ModalHeader>
        <ModalBody mt={-4}>
          <Text>This action cannot be undone.</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={deletePlaylist}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteDialog;
