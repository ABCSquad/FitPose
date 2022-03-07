import { Box } from "@chakra-ui/react";
import { FC } from "react";



const Wrapper: FC = ({ children, ...props }) => {
  return (
    <>
      <Box mx="auto" maxW={{ base: 1400, lg: 1600 }} px={6} {...props}>
        {children}
      </Box>
    </>
  );
};

export default Wrapper;
