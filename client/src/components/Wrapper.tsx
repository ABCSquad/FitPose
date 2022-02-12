import { Box } from "@chakra-ui/react";
import { FC } from "react";

const Wrapper: FC = ({ children }) => {
  return (
    <>
      <Box mx="auto" maxW={{ base: "1400px", lg: "1600px" }} px={6}>
        {children}
      </Box>
    </>
  );
};

export default Wrapper;
