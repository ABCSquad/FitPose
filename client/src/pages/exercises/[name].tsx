import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { FC } from "react";
import { useExerciseQuery } from "../../generated/graphql";
import createUrqlClient from "../../utils/createUrqlClient";

const Exercise: FC = () => {
  const router = useRouter();

  //Getting exercise from url
  const exerciseName =
    typeof router.query.name === "string"
      ? router.query.name
          //Since exercise name in snake-case in url but in Title Case in database
          .split("-")
          .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
          .join(" ")
      : "";
  const [{ data }] = useExerciseQuery({ variables: { name: exerciseName } });

  return <div>{data?.exercise.name}</div>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Exercise);
