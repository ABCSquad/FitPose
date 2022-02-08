import { Box, Center, Divider, Flex, Img, Text } from "@chakra-ui/react";
import { FC } from "react";

const Footer: FC = () => {
  const path = "./svgs/social/";
  const filter =
    "invert(100%) sepia(22%) saturate(1272%) hue-rotate(176deg) brightness(101%) contrast(97%)";

  return (
    <Box py={10} bg="brand.lavender">
      <Flex align="center">
        <Box mx="auto">
          <Center h={10} mb={2}>
            <Img src="./svgs/logo.svg" mx={3} h={6} filter={filter} />
            <Divider orientation="vertical" />
            <a target="_blank" href="https://github.com/ABCSquad/fitpose">
              <Img src={`${path}github.svg`} mx={3} h={6} filter={filter} />
            </a>
            <a target="_blank" href="https://www.linkedin.com/">
              <Img src={`${path}linkedin.svg`} mx={3} h={6} filter={filter} />
            </a>
            <a target="_blank" href="https://www.instagram.com/">
              <Img src={`${path}instagram.svg`} mx={3} h={6} filter={filter} />
            </a>
          </Center>
          <Text color="brand.lightgrey" fontSize="0.9rem">
            Copyright &copy; 2022 ABCSquad Inc. All rights reserved.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
