import NextLink from "next/link";
import {
  ArrowForwardIcon,
  ChevronDownIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { ChangeEvent, MouseEvent, FC, useState } from "react";
import NavBar from "../components/NavBar";
import Wrapper from "../components/Wrapper";
import createUrqlClient from "../utils/createUrqlClient";

const Exercises: FC = ({}) => {
  const [search, setSearch] = useState("");
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const [group, setGroup] = useState("All groups");
  const handleGroup = (e: MouseEvent<HTMLButtonElement>) => {
    setGroup(e.currentTarget.value);
  };

  const [difficulty, setDifficulty] = useState("All difficulties");
  const handleDifficulty = (e: MouseEvent<HTMLButtonElement>) => {
    setDifficulty(e.currentTarget.value);
  };

  return (
    <>
      <NavBar bg="brand.teal" />
      <Box minH="92vh">
        <Box py={6}>
          <Wrapper>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Search2Icon />}
              />
              <Input
                placeholder="Search for an exercise"
                onChange={handleSearch}
                w={1000}
                mr={4}
              />
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  _hover={{ bg: "inherit" }}
                  _focus={{ bg: "inherit" }}
                  _active={{ bg: "inherit" }}
                  rightIcon={<ChevronDownIcon />}
                >
                  {group}
                </MenuButton>
                <MenuList>
                  <MenuItem value="All groups" onClick={handleGroup}>
                    <b>All groups</b>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem value="Push" onClick={handleGroup}>
                    <b>Push</b>
                  </MenuItem>
                  <MenuItem value="Chest" onClick={handleGroup}>
                    Chest
                  </MenuItem>
                  <MenuItem value="Shoulders" onClick={handleGroup}>
                    Shoulders
                  </MenuItem>
                  <MenuItem value="Triceps" onClick={handleGroup}>
                    Triceps
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem value="Pull" onClick={handleGroup}>
                    <b>Pull</b>
                  </MenuItem>
                  <MenuItem value="Lats" onClick={handleGroup}>
                    Lats
                  </MenuItem>
                  <MenuItem value="Traps" onClick={handleGroup}>
                    Traps
                  </MenuItem>
                  <MenuItem value="Lower back" onClick={handleGroup}>
                    Lower back
                  </MenuItem>
                  <MenuItem value="Biceps" onClick={handleGroup}>
                    Biceps
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem value="Legs" onClick={handleGroup}>
                    <b>Legs</b>
                  </MenuItem>
                  <MenuItem value="Quads" onClick={handleGroup}>
                    Quads
                  </MenuItem>
                  <MenuItem value="Hamstrings" onClick={handleGroup}>
                    Hamstrings
                  </MenuItem>
                  <MenuItem value="Glutes" onClick={handleGroup}>
                    Glutes
                  </MenuItem>
                  <MenuItem value="Calves" onClick={handleGroup}>
                    Calves
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem value="Abdominals" onClick={handleGroup}>
                    <b>Abdominals</b>
                  </MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  _hover={{ bg: "inherit" }}
                  _focus={{ bg: "inherit" }}
                  _active={{ bg: "inherit" }}
                  rightIcon={<ChevronDownIcon />}
                >
                  {difficulty}
                </MenuButton>
                <MenuList>
                  <MenuItem value="All difficulties" onClick={handleDifficulty}>
                    All difficulties
                  </MenuItem>
                  <MenuItem value="Beginner" onClick={handleDifficulty}>
                    Beginner
                  </MenuItem>
                  <MenuItem value="Intermediate" onClick={handleDifficulty}>
                    Intermediate
                  </MenuItem>
                  <MenuItem value="Advanced" onClick={handleDifficulty}>
                    Advanced
                  </MenuItem>
                </MenuList>
              </Menu>
              <NextLink href="/favourites">
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  colorScheme="teal"
                  variant="outline"
                  ml="auto"
                >
                  Go to Favourites
                </Button>
              </NextLink>
            </InputGroup>
          </Wrapper>
        </Box>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Exercises);
