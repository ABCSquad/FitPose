import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Text,
  ModalBody,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import React, { ChangeEvent, FC, useState } from "react";
import { useUpdatePlaylistNameMutation } from "../generated/graphql";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  playlistId?: string;
  playlistName?: string;
};

const InputDialog: FC<Props> = ({
  isOpen,
  onClose,
  playlistId,
  playlistName,
}) => {
  const [, _updatePlaylistName] = useUpdatePlaylistNameMutation();
  const updatePlaylistName = async () => {
    playlistId &&
      newName &&
      (await _updatePlaylistName({ playlistId, name: newName }));
    newName && onClose();
  };

  const [newName, setNewName] = useState(playlistName);
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value);
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
        <ModalHeader>Edit Playlist Name</ModalHeader>
        <ModalBody mt={-4}>
          <Text mb={1}>Enter a new name for your playlist.</Text>
          <Input
            value={newName}
            placeholder="e.g. My Playlist"
            onChange={handleName}
          ></Input>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={updatePlaylistName}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InputDialog;
