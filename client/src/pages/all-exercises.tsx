import NextLink from "next/link";
import {
  ArrowForwardIcon,
  ChevronDownIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Grid,
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
import { useExercisesQuery } from "../generated/graphql";
import ExerciseCard from "../components/ExerciseCard";

const Exercises: FC = ({}) => {
  const [{ data }] = useExercisesQuery();

  const [search, setSearch] = useState("");
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const [group, setGroup] = useState("");
  const handleGroup = (e: MouseEvent<HTMLButtonElement>) => {
    setGroup(e.currentTarget.value);
  };

  const [difficulty, setDifficulty] = useState("");
  const handleDifficulty = (e: MouseEvent<HTMLButtonElement>) => {
    setDifficulty(e.currentTarget.value);
  };

  //For menu items
  const pushMuscles = ["Chest", "Shoulders", "Triceps"];
  const pullMuscles = ["Lats", "Traps", "Lower back", "Biceps"];
  const legsMuscles = ["Quads", "Hamstrings", "Glutes"];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  return (
    <>
      <NavBar bg="brand.teal" />
      <Box minH="92vh" bg="brand.lightgrey">
        <Wrapper>
          <Box pb={6} pt={10}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Search2Icon />}
              />
              <Input
                placeholder="Search for an exercise"
                onChange={handleSearch}
                w={800}
                mr={4}
              ></Input>
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  _hover={{ bg: "inherit" }}
                  _focus={{ bg: "inherit" }}
                  _active={{ bg: "inherit" }}
                  rightIcon={<ChevronDownIcon />}
                >
                  {group || "All groups"}
                </MenuButton>
                <MenuList>
                  <MenuItem value="" onClick={handleGroup}>
                    <b>All groups</b>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem value="Push" onClick={handleGroup}>
                    <b>Push</b>
                  </MenuItem>
                  {pushMuscles.map((x) => (
                    <MenuItem value={x} onClick={handleGroup}>
                      {x}
                    </MenuItem>
                  ))}
                  <MenuDivider />
                  <MenuItem value="Pull" onClick={handleGroup}>
                    <b>Pull</b>
                  </MenuItem>
                  {pullMuscles.map((x) => (
                    <MenuItem value={x} onClick={handleGroup}>
                      {x}
                    </MenuItem>
                  ))}
                  <MenuDivider />
                  <MenuItem value="Legs" onClick={handleGroup}>
                    <b>Legs</b>
                  </MenuItem>
                  {legsMuscles.map((x) => (
                    <MenuItem value={x} onClick={handleGroup}>
                      {x}
                    </MenuItem>
                  ))}
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
                  {difficulty || "All difficulties"}
                </MenuButton>
                <MenuList>
                  <MenuItem value="" onClick={handleDifficulty}>
                    <b>All difficulties</b>
                  </MenuItem>
                  <MenuDivider />
                  {difficulties.map((x) => (
                    <MenuItem value={x} onClick={handleDifficulty}>
                      {x}
                    </MenuItem>
                  ))}
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
          </Box>
          <Box>
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
              templateRows={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
              mx={-5}
              pb={5}
            >
              {data
                ? data.exercises
                    // To apply search, group and difficulty filters
                    .filter(
                      (exercise) =>
                        exercise.difficulty.includes(difficulty) &&
                        exercise.tags.some((tag) => tag.includes(group)) &&
                        exercise.name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    )
                    .map((exercise) => <ExerciseCard {...exercise} />)
                : null}
            </Grid>
          </Box>
        </Wrapper>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Exercises);
