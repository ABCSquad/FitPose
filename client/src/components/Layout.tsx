import { Box } from "@chakra-ui/react";
import { FC } from "react";
import NavBar from "./NavBar";

const Layout: FC = ({ children }) => {
  return (
    <>
      <NavBar />
      <Box mx="auto" maxW="1500px" px="50px">
        {children}
      </Box>
    </>
  );
};

export default Layout;
