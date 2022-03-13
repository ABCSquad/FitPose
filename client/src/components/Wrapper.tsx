import { Box, BoxProps } from "@chakra-ui/react";
import { FC } from "react";

const Wrapper: FC<BoxProps> = ({ children, ...boxProps }) => {
  return (
    <>
      <Box mx="auto" maxW={{ base: 1400, lg: 1600 }} px={6} {...boxProps}>
        {children}
      </Box>
    </>
  );
};

export default Wrapper;
