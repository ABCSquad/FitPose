import { withUrqlClient } from "next-urql";
import { FC } from "react";
import NavBar from "../components/NavBar";
import Wrapper from "../components/Wrapper";
import createUrqlClient from "../utils/createUrqlClient";

const Exercises: FC = ({}) => {
  return (
    <>
      <NavBar />
      <Wrapper>Hello World</Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Exercises);
