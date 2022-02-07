import { Box } from "@chakra-ui/react";
import { FC } from "react";
import NavBar from "./NavBar";

type LayoutProps = {
  nav?: boolean;
};

const Layout: FC<LayoutProps> = ({ children, nav }) => {
  return (
    <>
      {nav && <NavBar />}
      <Box mx="auto" maxW="1500px" px="50px">
        {children}
      </Box>
    </>
  );
};

export default Layout;
